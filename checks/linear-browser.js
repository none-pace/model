async (page) => {
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8000/calculus.html?scope=two#linear-span');
  await page.reload();
  await page.waitForSelector('#lab-graph svg');
  for(const width of [1440,390,320]){
    await page.setViewportSize({width,height:900});
    for(const id of ['linear-span','linear-map','linear-projection','linear-systems']){
      await page.evaluate(id=>{location.hash=id;},id);
      await page.waitForFunction(id=>document.querySelector('.lesson-link[aria-current]')?.hash==='#'+id&&document.querySelector('#reading').getAttribute('aria-busy')==='false',id);
      if(await page.locator('.katex-error').count())throw Error('KaTeX '+id);
      if(!['linear-span','linear-systems'].includes(id)&&await page.locator('.independent-practice .exercise').count()!==2)throw Error('Exercises '+id);
      if(['linear-span','linear-systems'].includes(id)&&await page.locator('.book-prose .example').count()<1)throw Error('Missing worked applications');
      await page.locator('[data-param]').evaluateAll(inputs=>inputs.forEach(i=>{i.value=i.tagName==='SELECT'?String(i.options.length-1):i.max;i.dispatchEvent(new Event('input',{bubbles:true}));}));
      if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Overflow '+width+' '+id);
      if(id==='linear-systems'&&await page.locator('#lab-graph svg').count()!==2)throw Error('Separate spaces missing');
      await page.locator('#reset-lab').click();
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.locator('#param-h').fill('0');await page.locator('#param-d').fill('1');
  if(!(await page.locator('#lab-readout').innerText()).includes('无解'))throw Error('Inconsistent system');
  await page.locator('#param-d').fill('0');
  if(!(await page.locator('#lab-readout').innerText()).includes('无穷多解'))throw Error('Infinite solutions');
  await page.locator('#param-h').fill('1');
  if(!(await page.locator('#lab-readout').innerText()).includes('唯一解'))throw Error('Unique solution');
  await page.screenshot({path:'output/playwright/linear-systems.png'});
  await page.evaluate(()=>{location.hash='chapter-16';});await page.waitForSelector('.chapter-content canvas');
  const paintCount=()=>page.locator('.chapter-content canvas').evaluate(c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let n=0;for(let i=0;i<d.length;i+=4)if(d[i]===20&&d[i+1]===117&&d[i+2]===87)n++;return n;});
  if(await paintCount()===0)throw Error('Positive ellipse not drawn');
  await page.locator('#sa').fill('-10');await page.locator('#sb').fill('0');await page.locator('#sc').fill('-10');
  if(!(await page.locator('#v1b').innerText()).includes('为空'))throw Error('Negative definite label');
  if(await paintCount()!==0)throw Error('Phantom ellipse on negative definite form');
  await page.locator('#sa').fill('10');
  if(!(await page.locator('#v1b').innerText()).includes('双曲线'))throw Error('Hyperbola label');
  await page.locator('#sc').fill('0');
  if(!(await page.locator('#v1b').innerText()).includes('平行直线'))throw Error('Degenerate positive form');
  if(errors.length)throw Error(JSON.stringify(errors));
  await page.goto('http://127.0.0.1:8000/calculus.html#linear-projection');await page.waitForSelector('#lab-graph svg');
  await page.setViewportSize({width:390,height:844});await page.screenshot({path:'output/playwright/linear-projection-mobile.png'});
}
