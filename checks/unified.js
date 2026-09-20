async (page) => {
  const errors=[],issues=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8000/calculus.html?scope=one#functions');
  await page.waitForSelector('#lab-graph svg');
  const units=await page.evaluate(()=>window.CALCULUS.lessons.map(l=>({id:l.id,kind:l.kind})));
  for(const size of [{width:1440,height:1000},{width:390,height:844}]){
    await page.setViewportSize(size);
    for(const unit of units){
      await page.evaluate(id=>{location.hash=id;},unit.id);
      await page.waitForFunction(id=>document.querySelector('#reading')?.dataset.lesson===id&&document.querySelector('#reading')?.getAttribute('aria-busy')==='false',unit.id);
      const state=await page.evaluate(()=>({mathErrors:[...document.querySelectorAll('#reading .katex-error')].map(e=>e.textContent),overflow:document.documentElement.scrollWidth>innerWidth+1,overflowing:document.documentElement.scrollWidth>innerWidth+1?[...document.querySelectorAll('#reading *')].filter(e=>e.getBoundingClientRect().right>innerWidth).slice(0,8).map(e=>({tag:e.tagName,cl:e.className,text:e.textContent.slice(0,75)})):[],failed:!!document.querySelector('#retry-chapter'),versions:/原版|新版/.test(document.querySelector('#reading').innerText)}));
      if(state.mathErrors.length||state.overflow||state.failed||state.versions)issues.push({id:unit.id,width:size.width,...state});
      if(unit.kind==='chapter'&&size.width===1440){
        const count=await page.locator('.chapter-content canvas').count();
        for(let i=0;i<count;i++){const painted=await page.locator('.chapter-content canvas').nth(i).evaluate(c=>c.getContext('2d').getImageData(0,0,c.width,c.height).data.some(v=>v!==0));if(!painted)issues.push({id:unit.id,blankCanvas:i});}
        await page.locator('.chapter-content input[type="range"]').evaluateAll(inputs=>inputs.forEach(input=>{input.value=input.max;input.dispatchEvent(new Event('input',{bubbles:true}));}));
      }
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('http://127.0.0.1:8000/calculus.html#elementary');await page.waitForSelector('#param-family');
  for(let i=0;i<12;i++)for(const view of ['0','1']){await page.locator('#param-family').selectOption(String(i));await page.locator('#param-view').selectOption(view);if(await page.locator('.katex-error').count())issues.push({formula:i,view});}
  await page.locator('.reading-tools > summary').click();await page.locator('#atlas-toggle').click();if(await page.locator('#atlas .katex-error').count())issues.push({atlas:'math errors'});await page.locator('#atlas-close').click();
  await page.screenshot({path:'output/playwright/unified-formulas.png'});
  await page.goto('http://127.0.0.1:8000/math_ch12.html#mul');await page.waitForSelector('.chapter-content canvas');
  if(!page.url().includes('#chapter-12/mul'))issues.push({redirect:'old anchor not preserved'});
  await page.screenshot({path:'output/playwright/unified-matrix.png'});
  await page.goto('http://127.0.0.1:8000/math_index.html');
  if(/原版|新版/.test(await page.locator('body').innerText()))issues.push({home:'version split'});
  if(await page.locator('#curriculum-list a').count()!==15)issues.push({home:'missing math-two chapters'});
  await page.screenshot({path:'output/playwright/unified-home.png'});
  console.log(JSON.stringify({units:units.length,issues,errors}));
  if(issues.length||errors.length)throw Error(JSON.stringify({issues,errors}));
}
