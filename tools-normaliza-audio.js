const fs = require('fs');
const path = require('path');

const root = 'audio';

function slugify(name) {
  // quita espacios extremos
  let s = name.trim();

  // separa nombre y extensión
  const ext = path.extname(s);
  let base = path.basename(s, ext);

  // pasa a NFD y elimina acentos, convierte a minúsculas
  base = base.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  // reemplaza espacios y no-alfanum por guiones
  base = base.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const clean = `${base}${ext.toLowerCase()}`;
  return clean || `audio-${Date.now()}${ext.toLowerCase()}`;
}

for (const dir of fs.readdirSync(root, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const dirPath = path.join(root, dir.name);
  for (const f of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (!f.isFile()) continue;
    if (!/\.mp3$/i.test(f.name)) continue;

    const oldPath = path.join(dirPath, f.name);
    const newName = slugify(f.name);
    const newPath = path.join(dirPath, newName);

    if (oldPath !== newPath) {
      if (fs.existsSync(newPath)) {
        console.log(`⚠️ Ya existe: ${newPath} (omito renombrar ${f.name})`);
      } else {
        fs.renameSync(oldPath, newPath);
        console.log(`✅ ${f.name}  ->  ${newName}`);
      }
    }
  }
}
console.log('✔ Renombrado completado');
