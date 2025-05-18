// ./backend/scripts/seeder-utils/cropRandomSquare.ts

// Imports
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'


export async function cropRandomSquare(inputPath: string, outputDir: string, minPercent: number, maxPercent: number): Promise<string> {
  const image = sharp(inputPath)
  const metadata = await image.metadata()

  if (!metadata.width || !metadata.height) {
    throw new Error(`[error] Could not read image dimensions for: ${inputPath}`)
  }

  const baseSize = Math.min(metadata.width, metadata.height)
  const cropPercent = Math.random() * (maxPercent - minPercent) + minPercent
  const cropSize = Math.floor(baseSize * cropPercent)

  const maxX = metadata.width - cropSize
  const maxY = metadata.height - cropSize

  const left = Math.floor(Math.random() * (maxX + 1))
  const top = Math.floor(Math.random() * (maxY + 1))

  const buffer = await image.extract({ left, top, width: cropSize, height: cropSize }).toBuffer()

  fs.mkdirSync(outputDir, { recursive: true })

  const outName = `cropped-${crypto.randomUUID()}.jpg`
  const outPath = path.join(outputDir, outName)

  fs.writeFileSync(outPath, buffer)
  return outPath
}
