import sharp from 'sharp';
import { readdirSync, statSync, copyFileSync, unlinkSync, existsSync } from 'fs';
import { join, extname } from 'path';

const IMG_DIR = './src/assets/img';
const QUALITY = 80; // 80% calidad — buen balance calidad/tamaño
const MAX_WIDTH = 1920; // ancho máximo para pantallas Full HD

const files = readdirSync(IMG_DIR).filter(f =>
  ['.webp', '.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase())
);

console.log(`\n🖼️  Optimizando ${files.length} imágenes (calidad: ${QUALITY}%, máx. ancho: ${MAX_WIDTH}px)\n`);

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const inputPath = join(IMG_DIR, file);
  const outputPath = join(IMG_DIR, '__tmp__' + file);
  const sizeBefore = statSync(inputPath).size;
  totalBefore += sizeBefore;

  try {
    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true }) // no agranda si ya es más pequeña
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const sizeAfter = statSync(outputPath).size;
    totalAfter += sizeAfter;
    const reduction = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(1);

    // Sobrescribir el original con la versión optimizada
    copyFileSync(outputPath, inputPath);
    unlinkSync(outputPath);

    console.log(`  ✅ ${file}`);
    console.log(`     ${(sizeBefore / 1024 / 1024).toFixed(2)} MB → ${(sizeAfter / 1024 / 1024).toFixed(2)} MB  (-${reduction}%)\n`);
  } catch (err) {
    console.error(`  ❌ Error en ${file}: ${err.message}`);
  }
}

console.log('─'.repeat(60));
console.log(`📦 Total antes:  ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
console.log(`📦 Total después: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
console.log(`💾 Ahorro total:  ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB (-${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`);
console.log('\n✨ ¡Imágenes optimizadas exitosamente!\n');
