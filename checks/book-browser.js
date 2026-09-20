// Run with playwright-cli -s=bookcheck run-code --filename checks/book-browser.js.
async (page) => {
  const root='http://127.0.0.1:8000/',issues=[],errors=[];
  await page.route('**/assets/**',route=>route.continue());
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(root+'calculus.html?scope=two#derivative');
  await page.reload();
  await page.waitForFunction(()=>window.katex&&document.querySelector('.book-prose .katex'));
  const bookIds=await page.evaluate(()=>window.CALCULUS.lessons.filter(l=>l.book).map(l=>l.id));
  const record=(condition,issue)=>{if(!condition)issues.push(issue);};
  const waitLesson=async id=>page.waitForFunction(id=>document.querySelector('.lesson-link[aria-current="page"]')?.getAttribute('href')==='#'+id&&document.querySelector('#reading')?.getAttribute('aria-busy')==='false'&&document.querySelector('.book-prose'),id);
  const navigate=async id=>{await page.evaluate(id=>{location.hash=id;},id);await waitLesson(id.split('/')[0]);};
  const values=async()=>page.locator('[data-book-figure]').evaluateAll(figures=>figures.map(f=>Object.fromEntries([...f.querySelectorAll('[data-book-param]')].map(c=>[c.dataset.bookParam,Number(c.value)]))));
  const set=async(index,key,value)=>page.locator(`[data-book-figure="${index}"] [data-book-param="${key}"]`).evaluate((input,value)=>{input.value=String(value);input.dispatchEvent(new Event('input',{bubbles:true}));},value);
  const inspect=async context=>{
    const state=await page.evaluate(()=>{
      const graph=document.querySelector('#reading');
      const mathErrors=[...graph.querySelectorAll('.katex-error')].map(e=>e.textContent);
      const duplicateIds=[...new Set([...graph.querySelectorAll('[id]')].map(e=>e.id).filter((id,i,all)=>all.indexOf(id)!==i))];
      const missingClips=[];
      const formulaFailures=[];
      const lessonId=document.querySelector('.lesson-link[aria-current="page"]').getAttribute('href').slice(1);
      const figures=window.CALCULUS.lessons.find(l=>l.id===lessonId).book.sections.flatMap(s=>s.blocks).filter(b=>b.type==='figure');
      // KaTeX with throwOnError:false can render unknown commands red without
      // assigning .katex-error, so validate the original dynamic formula too.
      for(const [index,figure] of figures.entries()){
        const node=graph.querySelector(`[data-book-figure="${index}"]`);
        const params=Object.fromEntries([...node.querySelectorAll('[data-book-param]')].map(c=>[c.dataset.bookParam,Number(c.value)]));
        const formula=window.CALCULUS_LABS.labs[figure.lab].render(params).formula;
        if(formula)try{window.katex.renderToString(formula,{throwOnError:true,strict:false});}catch(error){formulaFailures.push({lab:figure.lab,formula,error:error.message});}
      }
      for(const svg of graph.querySelectorAll('[data-book-graph] svg')){
        for(const node of svg.querySelectorAll('*'))for(const attribute of node.attributes){
          for(const match of attribute.value.matchAll(/url\(#([^\)]+)\)/g))if(!svg.querySelector('[id="'+match[1]+'"]'))missingClips.push(match[1]);
        }
      }
      return {mathErrors,formulaFailures,duplicateIds,missingClips,overflow:document.documentElement.scrollWidth>innerWidth+1,invalidSvg:/NaN|Infinity/.test([...graph.querySelectorAll('[data-book-graph] svg')].map(e=>e.outerHTML).join('')),overflowElements:document.documentElement.scrollWidth>innerWidth+1?[...graph.querySelectorAll('*')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,6).map(e=>({tag:e.tagName,cls:e.className?.baseVal||e.className,text:e.textContent.slice(0,80)})):[]};
    });
    if(state.mathErrors.length||state.formulaFailures.length||state.duplicateIds.length||state.missingClips.length||state.overflow||state.invalidSvg)issues.push({context,...state});
  };
  let states=0;
  for(const width of [1440,390,320]){
    await page.setViewportSize({width,height:1000});
    for(const id of bookIds){
      await navigate(id);
      const sourceMath=await page.evaluate(id=>{
        const failures=[];let count=0;
        const scan=(value,key)=>{
          if(typeof value==='string'){
            const formulas=key==='tex'?[value]:[...value.matchAll(/\$([^$]+)\$/g)].map(m=>m[1]);
            for(const formula of formulas){count++;try{window.katex.renderToString(formula,{throwOnError:true,strict:false});}catch(error){failures.push({formula,error:error.message});}}
          }else if(Array.isArray(value))value.forEach(item=>scan(item));
          else if(value&&typeof value==='object')for(const [name,item]of Object.entries(value))scan(item,name);
        };
        scan(window.CALCULUS.lessons.find(l=>l.id===id).book);return {count,failures};
      },id);
      record(sourceMath.failures.length===0,{id,width,reason:'strict-source-formulas',...sourceMath});
      const figures=await page.evaluate(id=>window.CALCULUS.lessons.find(l=>l.id===id).book.sections.flatMap(s=>s.blocks).filter(b=>b.type==='figure').map(b=>({lab:b.lab,controls:window.CALCULUS_LABS.labs[b.lab].controls})),id);
      record(await page.locator('[data-book-figure]').count()===figures.length,{id,width,reason:'figure-count'});
      await inspect({id,width,stage:'default'});
      for(let index=0;index<figures.length;index++){
        const figure=figures[index],defaults=Object.fromEntries(figure.controls.map(c=>[c.key,c.value]));
        const otherBefore=await page.locator('[data-book-figure]').evaluateAll((nodes,index)=>nodes.map((node,i)=>i===index?null:node.querySelector('[data-book-graph]').innerHTML),index);
        const families=figure.controls.find(c=>c.options);
        const familyValues=families?families.options.map((_,i)=>i):[null];
        for(const family of familyValues){
          if(families)await set(index,families.key,family);
          const ranges=figure.controls.filter(c=>!c.options);
          for(const control of ranges){
            for(const value of [...new Set([control.min,control.max,...(control.min<=0&&control.max>=0?[0]:[])])]){
              await set(index,control.key,value);states++;
              await inspect({id,width,lab:figure.lab,index,family,control:control.key,value});
            }
            await set(index,control.key,control.value);
          }
          // Corner combinations matter for geometry and scaled plots.
          for(const endpoint of ['min','max']){
            for(const control of ranges)await set(index,control.key,control[endpoint]);
            states++;await inspect({id,width,lab:figure.lab,index,family,endpoint});
          }
          for(const control of ranges)await set(index,control.key,control.value);
        }
        const otherAfter=await page.locator('[data-book-figure]').evaluateAll((nodes,index)=>nodes.map((node,i)=>i===index?null:node.querySelector('[data-book-graph]').innerHTML),index);
        record(JSON.stringify(otherBefore)===JSON.stringify(otherAfter),{id,width,index,reason:'changing-one-figure-changed-another'});
        await page.locator(`[data-book-figure="${index}"] .book-reset`).click();
        record(JSON.stringify((await values())[index])===JSON.stringify(defaults),{id,width,index,reason:'reset-default-values'});
        const afterReset=await page.locator('[data-book-figure]').evaluateAll((nodes,index)=>nodes.map((node,i)=>i===index?null:node.querySelector('[data-book-graph]').innerHTML),index);
        record(JSON.stringify(otherBefore)===JSON.stringify(afterReset),{id,width,index,reason:'reset-changed-another-figure'});
      }
      // Give every figure distinct nondefault state, then follow a real TOC link.
      for(let index=0;index<figures.length;index++){
        const control=figures[index].controls[0],value=control.options?control.options.length-1:(control.value===control.max?control.min:control.max);
        await set(index,control.key,value);
      }
      const beforeAnchor=await values();
      await page.locator('.book-prerequisites > summary').click();
      const anchor=await page.locator('.book-toc a').nth(3).getAttribute('href');
      await page.locator(`.book-toc a[href="${anchor}"]`).click();
      await page.waitForFunction(anchor=>location.hash===anchor&&document.querySelector('#reading').getAttribute('aria-busy')==='false',anchor);
      record(JSON.stringify(beforeAnchor)===JSON.stringify(await values()),{id,width,reason:'anchor-navigation-lost-figure-state'});
      await inspect({id,width,stage:'after-anchor'});
      for(let index=0;index<figures.length;index++)await page.locator(`[data-book-figure="${index}"] .book-reset`).click();
      console.log(JSON.stringify({completed:id,width,figures:figures.length,issues:issues.length}));
    }
  }
  const aliases=await page.evaluate(()=>window.COURSE_READING_ALIASES);
  for(const [oldRoute,newRoute] of Object.entries(aliases)){
    await page.evaluate(route=>{location.hash=route;},oldRoute);
    await page.waitForFunction(route=>location.hash==='#'+route&&document.querySelector('#reading').getAttribute('aria-busy')==='false',newRoute);
    const [id,section]=newRoute.split('/');
    record(await page.locator(`[data-book-section="${section}"]`).count()===1,{oldRoute,newRoute,reason:'old-anchor-target-missing'});
    record(await page.locator('.lesson-link[aria-current="page"]').getAttribute('href')==='#'+id,{oldRoute,newRoute,reason:'old-anchor-lesson-mismatch'});
  }
  for(const [oldPage,newRoute] of [['math_ch02.html#def','derivative/definition'],['math_ch14.html#solve','linear-systems/elimination']]){
    await page.goto(root+oldPage);
    await page.waitForFunction(route=>location.hash==='#'+route&&document.querySelector('#reading')?.getAttribute('aria-busy')==='false',newRoute);
    record(await page.locator('.book-prose').count()===1,{oldPage,reason:'old-page-not-book'});
  }
  await page.goto(root+'calculus.html?scope=two#chapter-13/space');
  await page.waitForFunction(()=>document.querySelector('#reading')?.getAttribute('aria-busy')==='false'&&document.querySelector('.chapter-content'));
  record(await page.locator('[data-section="space"]').isVisible(),{reason:'math-two-space-section-hidden'});
  record(await page.locator('#exam-scope').count()===0,{reason:'scope-selector-returned'});
  // A brief geometric introduction must never hide the full exam chapters.
  for(const [chapter,section] of [['chapter-11','ndef'],['chapter-12','mul'],['chapter-13','space'],['chapter-15','diag'],['chapter-16','pos']]){
    await page.goto(root+`calculus.html?scope=two#${chapter}/${section}`);
    await page.waitForFunction(chapter=>document.querySelector('.lesson-link[aria-current="page"]')?.hash==='#'+chapter&&document.querySelector('#reading').getAttribute('aria-busy')==='false',chapter);
    record(await page.locator(`[data-section="${section}"]`).isVisible(),{chapter,section,reason:'full-chapter-hidden-by-introduction'});
  }

  const shot=async(id,index,width,name,parameters={})=>{
    await page.setViewportSize({width,height:1000});await navigate(id);
    for(const [key,value]of Object.entries(parameters))await set(index,key,value);
    const target=page.locator(`[data-book-figure="${index}"]`);
    await target.screenshot({path:`output/playwright/book-${name}.png`,style:'.topbar,.skip{visibility:hidden!important}'});
  };
  await shot('derivative',4,1440,'ring-desktop',{r:2,h:.2});
  await shot('derivative',2,390,'derivative-function-mobile',{family:1,a:0});
  await shot('derivative',3,390,'microscope-mobile',{family:0,a:0,zoom:2});
  await shot('linear-systems',1,1440,'planes-desktop',{mode:1,yaw:-40,pitch:25,t:.4});
  await shot('linear-systems',1,390,'planes-mobile',{mode:5,yaw:-40,pitch:25});
  await shot('linear-systems',2,1440,'elimination-desktop',{step:4,t:.4,yaw:-40});
  await navigate('linear-span');
  const geometryFigures=await page.evaluate(()=>window.CALCULUS.lessons.find(l=>l.id==='linear-span').book.sections.flatMap(s=>s.blocks).filter(b=>b.type==='figure').map(b=>b.lab));
  await shot('linear-span',geometryFigures.indexOf('linearSpan3d'),1440,'span-three-desktop',{mode:2,s:.5,t:.5,r:.5,yaw:-40,pitch:25});
  await shot('linear-span',geometryFigures.indexOf('linearSpan3d'),390,'span-three-mobile',{mode:3,s:.5,t:.5,r:.5,yaw:-40,pitch:25});
  await shot('linear-span',geometryFigures.indexOf('linearBasisCoordinates'),1440,'basis-desktop',{k:1,h:1,x:2,y:1});
  await shot('linear-span',geometryFigures.indexOf('linearBasisCoordinates'),390,'basis-mobile',{k:1,h:0,x:2,y:1});
  await page.setViewportSize({width:1440,height:1000});await navigate('derivative');await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:'output/playwright/book-reading-desktop.png'});
  if(errors.length||issues.length)throw Error(JSON.stringify({errors,issues}));
  await page.unroute('**/assets/**');
  return {books:bookIds.length,widths:[1440,390,320],states,aliases:Object.keys(aliases).length,mathErrors:0,pageErrors:0,clipReferences:'unique and resolved inside each SVG',scope:'math-two space and complete linear chapters visible',screenshots:11};
}
