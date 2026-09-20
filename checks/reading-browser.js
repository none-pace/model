// Regression of the actual sequential reading journey, including older saved settings.
async (page) => {
  const base='http://127.0.0.1:8000/',errors=[];
  await page.route('**/assets/**',route=>route.continue());
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'math_index.html');await page.reload();
  await page.evaluate(()=>localStorage.setItem('calculus-study-v1',JSON.stringify({done:['functions'],scope:'one',last:'derivative/definition'})));
  await page.reload();
  if(await page.locator('#continue-reading').getAttribute('href')!=='calculus.html#derivative/definition')throw Error('Home does not resume reading');
  if(await page.locator('select,input').count())throw Error('Home still asks readers to filter or pick a scope');
  if(await page.locator('#curriculum-list a').count()!==15)throw Error('Math-two chapter count');
  await page.locator('#continue-reading').click();
  await page.waitForSelector('[data-book-section="definition"]');
  if(await page.locator('.chapter-group[open]').count()!==1)throw Error('Only the current chapter should open initially');
  if(await page.locator('.reading-tools').getAttribute('open')!==null)throw Error('Reference tools should start closed');
  const ids=await page.evaluate(()=>window.CALCULUS.lessons.filter(l=>l.scope!=='one').map(l=>l.id));
  // Every footer follows exactly the same path as the catalog.
  for(let i=0;i<ids.length;i++){
    await page.evaluate(id=>{location.hash=id;},ids[i]);
    await page.waitForFunction(id=>document.querySelector('#reading').dataset.lesson===id&&document.querySelector('#reading').getAttribute('aria-busy')==='false',ids[i]);
    const next=page.locator('a[rel="next"]'),prev=page.locator('a[rel="prev"]');
    if(i<ids.length-1&&await next.getAttribute('href')!=='#'+ids[i+1])throw Error('Broken next: '+ids[i]);
    if(i>0&&await prev.getAttribute('href')!=='#'+ids[i-1])throw Error('Broken previous: '+ids[i]);
    if(await page.locator('.chapter-group[open]').count()!==1)throw Error('Expanded unrelated chapter: '+ids[i]);
  }
  await page.evaluate(()=>{location.hash='linear-span';});
  await page.waitForSelector('.book-prose');
  const section=page.locator('[data-book-section]').nth(4),anchor=await section.getAttribute('data-book-section');
  await section.evaluate(el=>el.scrollIntoView({block:'start'}));
  await page.waitForFunction(route=>JSON.parse(localStorage.getItem('calculus-study-v1')).last===route,'linear-span/'+anchor);
  await page.goto(base+'math_index.html');
  if(await page.locator('#continue-reading').getAttribute('href')!=='calculus.html#linear-span/'+anchor)throw Error('Scrolled position was not saved');
  await page.locator('#continue-reading').click();
  await page.waitForFunction(anchor=>{const el=document.querySelector('[data-book-section="'+anchor+'"]');return el&&Math.abs(el.getBoundingClientRect().top-95)<6;},anchor);
  for(const width of [1440,390,320]){
    await page.setViewportSize({width,height:900});
    await page.goto(base+'math_index.html');
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Home overflow '+width);
    await page.screenshot({path:'output/playwright/reading-home-'+width+'.png'});
    await page.goto(base+'calculus.html#linear-span');await page.waitForSelector('.book-prose');
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Reader overflow '+width);
    await page.screenshot({path:'output/playwright/reading-page-'+width+'.png'});
    if(width<720){await page.locator('#menu-toggle').click();if(!await page.locator('#sidebar').isVisible())throw Error('Mobile menu');await page.keyboard.press('Escape');if(await page.locator('#sidebar').isVisible())throw Error('Escape menu');}
  }
  await page.goto(base+'calculus.html#chapter-11/three');await page.waitForSelector('.chapter-content canvas');
  await page.setViewportSize({width:1440,height:1000});
  await page.locator('[data-section="three"]').screenshot({path:'output/playwright/reading-sarrus.png'});
  await page.goto(base+'calculus.html#chapter-15/solve');await page.waitForSelector('.chapter-content canvas');
  await page.locator('.chapter-content canvas').first().screenshot({path:'output/playwright/reading-eigendirection.png'});
  if(errors.length)throw Error(JSON.stringify(errors));
  await page.unroute('**/assets/**');
  return {sequentialLessons:ids.length,resume:'lesson and scrolled section',widths:[1440,390,320],errors};
}
