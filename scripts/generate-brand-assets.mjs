/**
 * Generates PNG favicons / PWA icons from the Tracker SVG mark (requires sharp).
 * Run: node scripts/generate-brand-assets.mjs
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")

const SVG_MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#4f46e5"/>
  <path fill="white" fill-opacity="0.95" d="M8 22h3v6H8zm5-4h3v10h-3zm5-6h3v16h-3zm5-8h3v24h-3z"/>
</svg>`

async function writePng(relPath, size) {
  const buf = await sharp(Buffer.from(SVG_MARK)).resize(size, size).png().toBuffer()
  const out = path.join(root, relPath)
  await fs.writeFile(out, buf)
  console.log("wrote", relPath)
}

async function main() {
  await writePng("public/favicon-16x16.png", 16)
  await writePng("public/favicon-32x32.png", 32)
  await writePng("public/android-chrome-192x192.png", 192)
  await writePng("public/android-chrome-512x512.png", 512)
  await writePng("public/apple-touch-icon.png", 180)
  await writePng("public/macos-dock-icon.png", 512)
  await fs.writeFile(path.join(root, "public/logo/tracker.svg"), SVG_MARK.replace(/\n\s*/g, ""))
  console.log("wrote public/logo/tracker.svg")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
