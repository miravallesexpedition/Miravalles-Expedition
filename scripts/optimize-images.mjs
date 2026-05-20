import fs from 'node:fs/promises'
import sharp from 'sharp'

const sourceRoot = 'C:/Users/Acer/Videos/Videos Miravalles'
const imageJobs = [
  ['C:/Users/Acer/Downloads/miravalles expedition.jpg', 'public/images/miravalles-expedition-logo.jpg', 700, 82],
  [`${sourceRoot}/CATARATA MORPHO BLANCA/GO PTO/GOPR2010.JPG`, 'public/images/hero-waterfall.jpg', 2200, 78],
  [`${sourceRoot}/CATARATA MORPHO BLANCA/153NIKON/DSCN1376.JPG`, 'public/images/waterfall-river.jpg', 1600, 78],
  [`${sourceRoot}/WhatsApp Image 2026-05-14 at 9.38.02 PM.jpeg`, 'public/images/tall-waterfall.jpeg', 1600, 78],
  [`${sourceRoot}/CATARATA MORPHO BLANCA/153NIKON/DSCN1250.JPG`, 'public/images/bromelia.jpg', 1400, 78],
  [`${sourceRoot}/CATARATA MORPHO BLANCA/153NIKON/DSCN1270.JPG`, 'public/images/red-rock-waterfall.jpg', 1400, 78],
  [`${sourceRoot}/CATARATA MORPHO BLANCA/153NIKON/DSCN1289.JPG`, 'public/images/butterfly.jpg', 1400, 78],
  [`${sourceRoot}/CATARATA MORPHO BLANCA/153NIKON/DSCN1526.JPG`, 'public/images/volcano.jpg', 1800, 78],
  [`${sourceRoot}/CATARATA MORPHO BLANCA/153NIKON/DSCN1423.JPG`, 'public/images/bird.jpg', 1400, 78],
  [`${sourceRoot}/CATARATA MORPHO BLANCA/153NIKON/DSCN1465.JPG`, 'public/images/duck.jpg', 1400, 78],
  [`${sourceRoot}/CATARATA MORPHO BLANCA/153NIKON/DSCN1301.JPG`, 'public/images/orchids.jpg', 1400, 78],
  [`${sourceRoot}/CATARATA MORPHO BLANCA/153NIKON/DSCN1257.JPG`, 'public/images/trail-sign.jpg', 1400, 78],
  [`${sourceRoot}/CATARATA MORPHO BLANCA/153NIKON/DSCN1311.JPG`, 'public/images/forest-trail.jpg', 1400, 78],
  [`${sourceRoot}/CATARATA MORPHO BLANCA/153NIKON/DSCN1332.JPG`, 'public/images/cabro-muco-waterfall-clean.jpg', 1400, 78]
]

const videoJobs = [
  [`${sourceRoot}/CATARATA MORPHO BLANCA/GO PTO/GX012025.MP4`, 'public/videos/miravalles-hero.mp4']
]

await fs.mkdir('public/images', { recursive: true })
await fs.mkdir('public/videos', { recursive: true })

for (const [input, output, width, quality] of imageJobs) {
  const tmp = `${output}.tmp`
  await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(tmp)
  await fs.rename(tmp, output)
  const stat = await fs.stat(output)
  console.log(`${output} ${(stat.size / 1024).toFixed(1)} KB`)
}

for (const [input, output] of videoJobs) {
  await fs.copyFile(input, output)
  const stat = await fs.stat(output)
  console.log(`${output} ${(stat.size / 1024 / 1024).toFixed(2)} MB`)
}
