// Browser smoke check, invoked by playwright-cli run-code --filename checks/browser.js.
async (page) => {
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8000/calculus.html#derivative');
  await page.reload();
  await page.waitForSelector('#lab-graph svg');
  await page.setViewportSize({width:1440,height:1000});
  const ids=await page.evaluate(()=>window.CALCULUS.lessons.filter(l=>l.kind!=='chapter').map(l=>l.id));
  const issues=[];
  for(const id of ids){
    await page.evaluate(id=>{location.hash=id;},id);
    await page.waitForFunction(id=>document.querySelector('#reading')?.dataset.lesson===id&&document.querySelector('#reading')?.getAttribute('aria-busy')==='false',id);
    const state=await page.evaluate(()=>({errors:document.querySelectorAll('.katex-error').length,svg:!!document.querySelector('#lab-graph svg'),overflow:document.documentElement.scrollWidth>innerWidth+1}));
    if(state.errors||!state.svg||state.overflow)issues.push({id,...state});
  }
  await page.evaluate(()=>{location.hash='derivative';});
  await page.waitForSelector('#param-h');
  await page.locator('#param-h').fill('0');
  if(!(await page.locator('#lab-readout').innerText()).includes('未定义'))throw Error('h=0 must not be shown as a defined difference quotient');
  await page.locator('#reset-lab').click();
  if(await page.locator('#param-h').inputValue()!=='0.6')throw Error('reset failed');
  await page.locator('.book-selfcheck > summary').click();
  await page.locator('[data-answer="0"]').click();
  if((await page.locator('#quiz-feedback').getAttribute('class')).includes('correct'))throw Error('wrong answer accepted');
  await page.locator('[data-answer="1"]').click();
  if(!(await page.locator('#quiz-feedback').getAttribute('class')).includes('correct'))throw Error('correct answer rejected');
  await page.locator('#mark-done').click();
  const marked=await page.locator('#mark-done').getAttribute('aria-pressed');
  await page.reload();
  if(await page.locator('#mark-done').getAttribute('aria-pressed')!==marked)throw Error('progress did not survive reload');
  if(await page.locator('#exam-scope').count())throw Error('scope selector returned');
  if(await page.locator('.lesson-link .scope-tag').count())throw Error('math one extensions visible in math two navigation');
  const common=await page.evaluate(()=>window.CALCULUS.lessons.filter(l=>l.scope!=='one').length);
  if(await page.locator('.lesson-link').count()!==common)throw Error('math two count mismatch');
  await page.locator('.reading-tools > summary').click();
  await page.locator('#search').fill('链式');
  if(!(await page.locator('#chapters').innerText()).includes('链式'))throw Error('search failed');
  await page.locator('#search').fill('');
  await page.locator('#atlas-toggle').click();
  const formulaCount=await page.evaluate(()=>window.CALCULUS.lessons.filter(l=>l.scope!=='one'&&l.kind!=='chapter').length+window.ELEMENTARY_FUNCTIONS.length);
  if(await page.locator('.atlas-item').count()!==formulaCount)throw Error('atlas scope mismatch');
  await page.locator('#atlas-close').click();
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:'output/playwright/desktop-derivative.png'});
  await page.setViewportSize({width:390,height:844});
  await page.locator('#menu-toggle').click();
  if(!await page.locator('#sidebar').isVisible())throw Error('mobile navigation does not open');
  for(const id of ids){
    await page.evaluate(id=>{location.hash=id;},id);
    await page.waitForFunction(id=>document.querySelector('#reading')?.dataset.lesson===id&&document.querySelector('#reading')?.getAttribute('aria-busy')==='false',id);
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))issues.push({id,mobileOverflow:true});
  }
  await page.evaluate(()=>{location.hash='derivative';});
  await page.waitForSelector('#param-h');
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:'output/playwright/mobile-derivative.png'});
  await page.goto('http://127.0.0.1:8000/math_index.html');
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))issues.push({homeOverflow:true});
  const links=await page.locator('a[href$=".html"]').evaluateAll(es=>es.filter(e=>new URL(e.href).origin===location.origin).map(e=>e.href));
  for(const link of links){const res=await page.request.get(link);if(!res.ok())issues.push({brokenLink:link});}
  await page.setViewportSize({width:1440,height:1000});
  await page.screenshot({path:'output/playwright/home.png'});
  if(errors.length||issues.length)throw Error(JSON.stringify({errors,issues}));
  console.log(JSON.stringify({lessons:ids.length,viewports:['1440×1000','390×844'],mathErrors:0,pageErrors:0,checks:'sliders, reset, quiz, persistence, scope, search, atlas, navigation, links',screenshots:3}));
}
