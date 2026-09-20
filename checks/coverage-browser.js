async (page) => {
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/assets/**',route=>route.continue());
  await page.goto('http://127.0.0.1:8000/coverage.html');
  await page.reload();
  await page.waitForSelector('#coverage-list .coverage-group');
  if(await page.locator('#coverage-list [data-coverage-scope="one"]').count())throw Error('Reference topics entered math-two coverage');
  if(!await page.locator('#coverage-list a[href*="inverse-functions"]').count())throw Error('Foundation reading link missing');
  await page.locator('#additional-material > summary').click();
  if(!(await page.locator('#additional-list').innerText()).includes('概率'))throw Error('Probability gap omitted');
  for(const width of [1440,390,320]){
    await page.setViewportSize({width,height:900});
    await page.locator('.coverage-group').evaluateAll(nodes=>nodes.forEach(n=>{n.open=true;}));
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Coverage overflow '+width);
  }
  await page.goto('http://127.0.0.1:8000/calculus.html#inverse-functions');await page.waitForSelector('#lab-graph svg');
  await page.locator('#menu-toggle').click();await page.locator('.reading-tools > summary').click();
  await page.locator('#search').fill('克拉默');
  if(!await page.locator('.lesson-link[href="#chapter-11"]').count())throw Error('Topic search requires preloading');
  if(errors.length)throw Error(JSON.stringify(errors));
  await page.unroute('**/assets/**');
  return {coverage:'separate editorial page',widths:[1440,390,320],search:'available on demand',errors};
}
