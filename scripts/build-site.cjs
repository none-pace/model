// Assemble only public website files; source checks and local artifacts stay out.
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..'),destination=path.join(root,'_site');
fs.mkdirSync(destination,{recursive:true});
for(const name of fs.readdirSync(root)){
  if(name.endsWith('.html')&&fs.statSync(path.join(root,name)).isFile())fs.copyFileSync(path.join(root,name),path.join(destination,name));
}
fs.cpSync(path.join(root,'assets'),path.join(destination,'assets'),{recursive:true});
fs.writeFileSync(path.join(destination,'.nojekyll'),'');
console.log('Static site assembled in _site/');
