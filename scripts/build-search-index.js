// Node script: scans HTML files in repo root and builds search-index.json
// Run: node scripts/build-search-index.js
const fs = require('fs');
const path = require('path');

const root = process.cwd();

// Recursively scan for .html files, ignoring common folders
function walkDir(dir, out){
  const ignore = new Set(['node_modules', '.git', '.github', 'assets', 'scripts']);
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for(const entry of list){
    if(ignore.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if(entry.isDirectory()){
      walkDir(full, out);
    } else if(entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'search.html'){
      out.push(path.relative(root, full).replace(/\\/g, '/'));
    }
  }
}

function extract(file){
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  let title = '';
  const h1 = text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if(h1) title = h1[1].replace(/<[^>]+>/g,'').trim();
  if(!title){
    const ti = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if(ti) title = ti[1].trim();
  }
  let snippet = '';
  const secP = text.match(/<section[\s\S]*?>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
  if(secP) snippet = secP[1].replace(/<[^>]+>/g,'').trim();
  if(!snippet){
    const p = text.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if(p) snippet = p[1].replace(/<[^>]+>/g,'').trim();
  }
  return { id: file.replace(/\W/g,'_'), title: title || file, content: snippet || '', url: file };
}

const files = [];
walkDir(root, files);
const pages = [];
for(const f of files){
  try{ pages.push(extract(f)); } catch(e){ console.error('failed to parse', f, e); }
}

fs.writeFileSync(path.join(root,'search-index.json'), JSON.stringify(pages, null, 2), 'utf8');
console.log('Wrote search-index.json with', pages.length, 'entries');
