import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const RAW = 'raw'
const HOLD = 'hold/duplicates'
const MOVE = process.argv.includes('--move')
const maxArg = process.argv.find((a) => a.startsWith('--max='))
const LIMIT = maxArg ? Number(maxArg.split('=')[1]) : 10
const KEEP = new Set(['hero', 'story', 'journey-assessment', 'journey-bed', 'journey-shopping', 'journey-care', 'founder', 'slide-1', 'slide-2'])

const files = fs.readdirSync(RAW).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()
const hashes = []

for (const f of files) {
  const buf = await sharp(path.join(RAW, f)).rotate().grayscale().resize(9, 8, { fit: 'fill' }).raw().toBuffer()
  const bits = []
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) bits.push(buf[y * 9 + x] > buf[y * 9 + x + 1] ? 1 : 0)
  }
  hashes.push(bits)
}

const dist = (a, b) => a.reduce((n, v, i) => n + (v !== b[i] ? 1 : 0), 0)
const parent = files.map((_, i) => i)
const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])))

for (let i = 0; i < files.length; i++) {
  for (let j = i + 1; j < files.length; j++) {
    if (dist(hashes[i], hashes[j]) <= LIMIT) parent[find(j)] = find(i)
  }
}

const groups = {}
files.forEach((f, i) => {
  const r = find(i)
  ;(groups[r] ||= []).push(f)
})

const isKey = (f) => KEEP.has(path.parse(f).name.toLowerCase())
const size = (f) => fs.statSync(path.join(RAW, f)).size
let moved = 0
let found = 0

for (const g of Object.values(groups)) {
  if (g.length < 2) continue
  found++
  const ranked = [...g].sort((a, b) => Number(isKey(b)) - Number(isKey(a)) || size(b) - size(a))
  const keepers = ranked.filter(isKey)
  const keep = keepers.length ? keepers : [ranked[0]]
  const drop = ranked.filter((f) => !keep.includes(f))
  console.log(`\nGroup ${found}`)
  keep.forEach((f) => console.log(`  keep    ${f}`))
  drop.forEach((f) => console.log(`  remove  ${f}`))
  if (MOVE) {
    fs.mkdirSync(HOLD, { recursive: true })
    for (const f of drop) {
      fs.renameSync(path.join(RAW, f), path.join(HOLD, f))
      moved++
    }
  }
}

console.log(`\n${found} groups of look-alikes among ${files.length} photos`)
console.log(MOVE ? `${moved} moved to ${HOLD}` : 'Nothing moved. Run with --move to move the removals.')
