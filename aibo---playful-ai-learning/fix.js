import fs from 'fs';

function truncateDuplicate(file) {
  const content = fs.readFileSync(file, 'utf8');
  let doubleIndex = content.indexOf('];\nimport');
  if (doubleIndex === -1) {
     doubleIndex = content.indexOf('\nimport { Module }', 10);
  }
  if (doubleIndex !== -1) {
     fs.writeFileSync(file, content.substring(0, doubleIndex));
     console.log('Fixed', file);
  }
}
truncateDuplicate('src/lib/mathContent.ts');
truncateDuplicate('src/lib/scienceContent.ts');
