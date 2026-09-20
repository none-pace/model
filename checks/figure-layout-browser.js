async(page)=>{
  await page.route('**/assets/**',r=>r.continue());
  await page.goto('http://127.0.0.1:8000/calculus.html#linear-span');await page.reload();
  await page.waitForFunction(()=>window.katex&&document.querySelector('[data-book-figure="1"] .katex'));
  const counts=await page.evaluate(()=>{const b=window.CALCULUS.lessons.find(l=>l.id==='linear-span').book;return {sections:b.sections.length,examples:b.sections.flatMap(s=>s.blocks).filter(b=>b.type==='example').length};});
  for(const width of [390,320]){
    await page.setViewportSize({width,height:900});
    for(const mode of [0,1,2,3]){
      await page.locator('[data-book-figure="1"] [data-book-param="mode"]').selectOption(String(mode));
      const state=await page.locator('[data-book-figure="1"]').evaluate(el=>{
        const controls=Object.fromEntries([...el.querySelectorAll('[data-book-param]')].map(i=>[i.dataset.bookParam,Number(i.value)]));
        const r=window.CALCULUS_LABS.labs.linearSpan3d.render(controls);window.katex.renderToString(r.formula,{throwOnError:true});
        const formula=el.querySelector('[data-book-formula] .katex-display');
        return {scroll:formula.scrollWidth,client:formula.clientWidth};
      });
      if(state.scroll>state.client+1)throw Error('Figure formula needs sideways scrolling '+JSON.stringify({width,mode,...state}));
    }
    await page.locator('[data-book-figure="1"]').screenshot({path:'output/playwright/figure-span-final-'+width+'.png',style:'.topbar,.skip{visibility:hidden!important}'});
  }
  await page.unroute('**/assets/**');
  return {...counts,formula:'four span modes fit 320 and 390 px without horizontal scrolling'};
}
