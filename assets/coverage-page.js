(() => {
  const {groups,note,sources}=window.COURSE_COVERAGE;
  const $=id=>document.getElementById(id),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  $('coverage-note').textContent=note;
  $('catalog-sources').innerHTML=sources.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a>：${esc(s.note)}</li>`).join('');
  function content(one){return groups.map(group=>{
    const items=group.items.filter(item=>(item.scope==='one')===one);if(!items.length)return '';
    return `<details class="coverage-group"><summary>${esc(group.title)}</summary><div class="coverage-table" tabindex="0" role="region" aria-label="${esc(group.title)}内容核对"><table><thead><tr><th scope="col">主题与阅读入口</th><th scope="col">当前状态</th><th scope="col">待补 / 复核</th></tr></thead><tbody>${items.map(item=>`<tr data-coverage-scope="${esc(item.scope)}" data-coverage-target="${esc(item.target||'')}"><th scope="row">${item.target?`<a href="calculus.html#${esc(item.target)}">${esc(item.title)}</a>`:esc(item.title)}</th><td>${item.target?'已定位正文，深度仍需核对':'尚未成节'}</td><td>${esc(item.gap)}</td></tr>`).join('')}</tbody></table></div></details>`;
  }).join('');}
  $('coverage-list').innerHTML=content(false);$('additional-list').innerHTML=content(true);
})();
