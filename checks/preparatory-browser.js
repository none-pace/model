async (page) => {
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/assets/**',route=>route.continue());
  await page.goto('http://127.0.0.1:8000/calculus.html?scope=two#algebra-bridge');
  await page.reload();
  await page.waitForSelector('#lab-graph svg');
  const ids=await page.evaluate(()=>[...window.PREPARATORY_UNITS.flatMap(u=>u.ids),'limit','mvt']);
  for(const width of [1440,390,320]){
    await page.setViewportSize({width,height:900});
    for(const id of ids){
      await page.evaluate(id=>{location.hash=id;},id);
      await page.waitForFunction(id=>document.querySelector('.lesson-link[aria-current="page"]')?.hash==='#'+id&&document.querySelector('#reading').getAttribute('aria-busy')==='false',id);
      if(await page.locator('#reading .katex-error').count())throw Error(`Formula: ${id}`);
      if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error(`Overflow: ${id} / ${width}: `+JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll('.prose li,.prose p,.prose .example')].filter(e=>e.scrollWidth>e.clientWidth+5).map(e=>({text:e.textContent,wrap:getComputedStyle(e).overflowWrap,white:getComputedStyle(e).whiteSpace,scroll:e.scrollWidth,client:e.clientWidth})))));
      if(await page.locator('.teaching-plan').count()){
        await page.locator('.teaching-plan > summary').click();
        if(await page.locator('.teaching-plan li').count()!==11)throw Error('Incomplete teaching sequence');
        await page.locator('.teaching-plan > summary').click();
      }
      await page.locator('.independent-practice details').evaluateAll(nodes=>nodes.forEach(n=>{n.open=true;}));
      if(await page.locator('.theorem-sequence .example,.theorem-sequence .independent-practice').count())throw Error('Examples or practice interrupted theorem sequence');
      const choices=await page.locator('.lab-controls select').count();
      for(let i=0;i<choices;i++){const sel=page.locator('.lab-controls select').nth(i),count=await sel.locator('option').count();for(let v=0;v<count;v++){await sel.selectOption(String(v));if(await page.locator('#reading .katex-error').count())throw Error(`Control formula: ${id}`);}}
      await page.locator('.lab-controls input').evaluateAll(nodes=>nodes.forEach(n=>{n.value=n.max;n.dispatchEvent(new Event('input',{bubbles:true}));}));
      if(await page.locator('#lab-graph').evaluate(e=>/NaN|Infinity/.test(e.innerHTML)))throw Error(`Coordinates: ${id}`);
      await page.locator('#reset-lab').click();
    }
  }
  await page.goto('http://127.0.0.1:8000/calculus.html?scope=two#inverse-trig/review');
  await page.waitForSelector('#unit-review');
  if(await page.locator('#unit-review .exercise').count()!==7)throw Error('Missing unit assessment');
  await page.locator('#unit-review details').first().locator('summary').click();
  await page.locator('#unit-review a').first().click();
  await page.waitForSelector('#param-r');
  if(!page.url().endsWith('#algebra-bridge'))throw Error('Review return link');
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('http://127.0.0.1:8000/calculus.html?scope=two#trig-identities');await page.waitForSelector('#param-coordinate');
  await page.screenshot({path:'output/playwright/prep-identities-desktop.png'});
  await page.goto('http://127.0.0.1:8000/calculus.html?scope=two#mvt');await page.waitForSelector('#param-mode');
  if(await page.locator('.theorem-sequence .theorem').count()!==5)throw Error('Theorems missing');
  await page.locator('.lesson-header .section-index > summary').click();
  await page.locator('.lesson-header a[href="#mvt/theorem-2"]').click();
  await page.waitForFunction(()=>location.hash==='#mvt/theorem-2'&&Math.abs(document.querySelector('#theorem-2').getBoundingClientRect().top-90)<5);
  await page.locator('#theorem-2').scrollIntoViewIfNeeded();await page.screenshot({path:'output/playwright/theorem-proof-desktop.png'});
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://127.0.0.1:8000/calculus.html?scope=two#trig-circle');await page.waitForSelector('#param-deg');
  await page.locator('#param-deg').fill('90');await page.locator('#experiment').scrollIntoViewIfNeeded();
  if(!(await page.locator('#lab-readout').innerText()).includes('未定义'))throw Error('Tangent pole presentation');
  await page.screenshot({path:'output/playwright/prep-circle-mobile.png'});
  if(errors.length)throw Error(JSON.stringify(errors));
  await page.unroute('**/assets/**');
  console.log('11 preparatory lessons + 2 theorem units: 1440/390/320 layouts, formulas, teaching sequence, controls and assessment links passed.');
}
