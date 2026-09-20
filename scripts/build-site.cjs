// Assemble only public website files; source checks and local artifacts stay out.
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..'),destination=path.join(root,'_site');
fs.mkdirSync(destination,{recursive:true});
for(const name of fs.readdirSync(root)){
  if(name.endsWith('.html')&&fs.statSync(path.join(root,name)).isFile()){
    const html=fs.readFileSync(path.join(root,name),'utf8');
    if(!/<head\b[^>]*>/i.test(html))throw new Error(`Missing HTML head: ${name}`);
    // Apply to every published entry, including redirects and future pages.
    // Crawlers must be able to fetch the page to see the noindex directive.
    const published=html.replace(/<head\b[^>]*>/i,'$&\n<meta name="robots" content="noindex, nofollow">');
    fs.writeFileSync(path.join(destination,name),published);
  }
}
fs.cpSync(path.join(root,'assets'),path.join(destination,'assets'),{recursive:true});
fs.writeFileSync(path.join(destination,'.nojekyll'),'');
console.log('Static site assembled in _site/');
