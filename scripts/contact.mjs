import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const RAW = 'raw'
const OUT = 'preview'
fs.mkdirSync(OUT, { recursive: true })

const files = fs.readdirSync(RAW).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()
let cards = ''
let i = 0
for (const f of files) {
  const thumb = `t${String(++i).padStart(3, '0')}.jpg`
  await sharp(path.join(RAW, f)).rotate().resize({ width: 360 }).jpeg({ quality: 70 }).toFile(path.join(OUT, thumb))
  cards += `<figure><img src="${thumb}"><figcaption>${f}</figcaption></figure>`
}

fs.writeFileSync(
  path.join(OUT, 'index.html'),
  `<!doctype html><meta charset="utf-8"><title>Photos</title><style>body{font-family:sans-serif;margin:16px;background:#faf6f0}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px}figure{margin:0;background:#fff;padding:8px;border-radius:8px}img{width:100%;display:block;border-radius:4px}figcaption{font-size:12px;margin-top:6px;word-break:break-all}</style><main>${cards}</main>`
)
console.log(`${files.length} photos`)
