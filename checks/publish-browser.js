// Validate the exact static directory shipped to hosting, not the source root.
async(page)=>{
  const base='http://127.0.0.1:8001/',errors=[],missing=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)missing.push({url:r.url(),status:r.status()});});
  await page.goto(base);
  if(!page.url().endsWith('/math_index.html'))throw Error('Root entry did not reach the notebook');
  if(!await page.title().then(t=>t.startsWith('数学笔记')))throw Error('Home title');
  if(await page.locator('select,input').count())throw Error('Reading entrance regained filters');
  await page.locator('#continue-reading').click();
  await page.waitForSelector('#lab-graph svg');
  const ids=await page.evaluate(()=>window.CALCULUS.lessons.map(l=>l.id));
  for(const id of ids){
    await page.evaluate(id=>{location.hash=id;},id);
    await page.waitForFunction(id=>document.querySelector('#reading')?.dataset.lesson===id&&document.querySelector('#reading').getAttribute('aria-busy')==='false',id);
    const state=await page.evaluate(()=>({title:document.title,text:document.querySelector('#reading').textContent,math:document.querySelectorAll('.katex-error').length,failed:!!document.querySelector('#retry-chapter')}));
    if(!state.title.endsWith('数学笔记')||/考研|备考|数学一|数学二|数一扩展|数二主线/.test(state.text))throw Error('Old branding: '+id);
    if(state.math||state.failed)throw Error('Broken chapter: '+id);
  }
  await page.goto(base+'math_ch02.html#def');
  await page.waitForSelector('[data-book-section="definition"]');
  if(!page.url().endsWith('#derivative/definition'))throw Error('Old reading link');
  for(const width of [1440,390,320]){
    await page.setViewportSize({width,height:900});
    await page.goto(base+'math_index.html');
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Home overflow '+width);
    if(/考研|备考|数学一|数学二/.test(await page.locator('body').innerText()))throw Error('Home copy');
    await page.screenshot({path:'output/playwright/notebook-home-'+width+'.png'});
    await page.goto(base+'calculus.html#linear-span');await page.waitForSelector('.book-prose');
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Reader overflow '+width);
  }
  await page.goto(base+'coverage.html');
  await page.waitForSelector('#coverage-list .coverage-group');
  if(/考研|备考|数学一|数学二/.test(await page.locator('body').textContent()))throw Error('Coverage branding');
  if(errors.length||missing.length)throw Error(JSON.stringify({errors,missing}));
  return {packagedLessons:ids.length,widths:[1440,390,320],branding:'数学笔记',rootEntry:'ok',oldLinks:'ok',errors,missing};
}
