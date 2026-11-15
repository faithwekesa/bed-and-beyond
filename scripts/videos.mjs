import { spawnSync } from 'node:child_process'
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import path from 'node:path'
import ffmpegPath from 'ffmpeg-static'
import ffprobeStatic from 'ffprobe-static'

const FFMPEG = ffmpegPath || 'ffmpeg'
const FFPROBE = ffprobeStatic.path || 'ffprobe'

const prefix = process.argv[2] || 'VID-20261112'
const src = path.join(homedir(), 'Downloads')
const out = path.join(process.cwd(), 'public', 'videos')
mkdirSync(out, { recursive: true })

const files = readdirSync(src)
  .filter((f) => f.startsWith(prefix) && f.toLowerCase().endsWith('.mp4') && !/\(\d+\)\.mp4$/i.test(f))
  .sort()

if (!files.length) {
  console.log('No videos found in ~/Downloads starting with ' + prefix)
  process.exit(1)
}

const fmt = (sec) => {
  const s = Math.round(sec)
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0')
}

const list = []

files.forEach((f, k) => {
  const n = k + 1
  const video = 'video-' + n + '.mp4'
  const poster = 'video-' + n + '.jpg'
  const outVideo = path.join(out, video)
  const outPoster = path.join(out, poster)

  console.log('Compressing ' + f + ' ...')
  spawnSync(
    FFMPEG,
    [
      '-v', 'error', '-y', '-i', path.join(src, f),
      '-vf', "scale='min(1280,iw)':-2",
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '28',
      '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart',
      outVideo,
    ],
    { stdio: 'inherit' }
  )

  spawnSync(FFMPEG, ['-v', 'error', '-y', '-ss', '3', '-i', outVideo, '-frames:v', '1', '-q:v', '4', outPoster], {
    stdio: 'inherit',
  })

  const info = spawnSync(
    FFPROBE,
    ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height:format=duration', '-of', 'json', outVideo],
    { encoding: 'utf8' }
  )
  const j = JSON.parse(info.stdout)

  list.push({
    src: '/videos/' + video,
    poster: '/videos/' + poster,
    title: 'A visit with Bed & Beyond',
    duration: fmt(Number(j.format.duration)),
    width: j.streams[0].width,
    height: j.streams[0].height,
  })
  console.log('done ' + f + ' -> ' + video)
})

const body =
  'export type Video = {\n  src: string\n  poster: string\n  title: string\n  duration: string\n  width: number\n  height: number\n}\n\nexport const VIDEOS: Video[] = ' +
  JSON.stringify(list, null, 2) +
  '\n'

writeFileSync(path.join(process.cwd(), 'lib', 'videos.ts'), body)
console.log('Wrote lib/videos.ts with ' + list.length + ' videos')
