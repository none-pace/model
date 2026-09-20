// Confirm that unifying navigation did not drop source examples, exercises or diagrams.
const assert=require('node:assert/strict');
const {chapters:specs}=require('./chapter-baseline.json');
global.window={};
let totals={sections:0,canvases:0,solutions:0};
for(const baseline of specs){
  const {source:file,id}=baseline;
  require('../assets/chapters/'+id+'.js');const after=window.COURSE_CHAPTERS[id].html;
  for(const [name,regex] of [['sections',/<h2\b/g],['canvases',/<canvas\b/g],['solutions',/<details\b/g]]){
    const count=(after.match(regex)||[]).length;assert(count>=baseline[name],`${file}: missing ${name} from original chapter`);totals[name]+=count;
  }
}
console.log(`Preserved ${specs.length} chapter packs: ${JSON.stringify(totals)}`);
