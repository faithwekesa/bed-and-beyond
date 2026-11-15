import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const RAW = 'raw'
const OUT = 'public/images'
const KEEP = new Set(['hero', 'story', 'journey-assessment', 'journey-bed', 'journey-shopping', 'journey-care', 'founder', 'slide-1', 'slide-2', 'celebration', 'awareness'])

fs.mkdirSync(OUT, { recursive: true })
for (const f of fs.readdirSync(OUT)) {
  if (f.startsWith('gallery-')) fs.unlinkSync(path.join(OUT, f))
}

const files = fs.readdirSync(RAW).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()
const gallery = []
let n = 0

for (const f of files) {
  const base = path.parse(f).name.toLowerCase().replace(/\s+/g, '-')
  const keep = KEEP.has(base) || /^(before|after|pair|journey)-/.test(base)
  const name = keep ? base : `gallery-${String(++n).padStart(2, '0')}`
  const info = await sharp(path.join(RAW, f))
    .rotate()
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(OUT, `${name}.webp`))
  if (!keep) gallery.push({ src: `/images/${name}.webp`, width: info.width, height: info.height })
  console.log(`${f} -> ${name}.webp`)
}

const body = gallery
  .map((g) => `  { src: '${g.src}', width: ${g.width}, height: ${g.height} },`)
  .join('\n')
fs.writeFileSync('lib/gallery.ts', `export const GALLERY = [\n${body}\n]\n`)
console.log(`${gallery.length} gallery photos`)
