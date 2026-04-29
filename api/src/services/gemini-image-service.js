const { GoogleGenAI } = require('@google/genai')
const fs = require('node:fs')
const path = require('node:path')

class GeminiImageService {
  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    })
    this.imagesDir = path.resolve(
      __dirname,
      '../../../client/customer/front-customer/images/camisetas'
    )
    this.baseImagePath = path.join(this.imagesDir, 'camiseta-base.jpg')
  }

  async generateTshirt({ text, customImage, useDefaultBaseImage = true }) {

    if (useDefaultBaseImage && !fs.existsSync(this.baseImagePath)) {
      throw new Error(`No se encontró la imagen base en: ${this.baseImagePath}`)
    }

    const contents = [
      { text: `Solo puedes crear ropa, nada de dibujos animados ni cosas inapropiadas ${text}` }
    ]

    if (useDefaultBaseImage) {
      const imageData = fs.readFileSync(this.baseImagePath)
      const base64Image = imageData.toString('base64')

      contents.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image
        }
      })
    }

    if (customImage) {
      let mimeType = 'image/jpeg'
      let base64CustomImage = customImage

      if (customImage.includes(',')) {
        mimeType = customImage.split(';')[0].split(':')[1] || 'image/jpeg'
        base64CustomImage = customImage.split(',')[1]
      }

      const supportedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
      if (!supportedMimeTypes.includes(mimeType)) {
        throw new Error(`El formato de imagen ${mimeType} no está soportado. Sube un JPG, PNG o WEBP.`)
      }

      contents.push({
        inlineData: {
          mimeType,
          data: base64CustomImage
        }
      })
    }

    let response
    try {
      response = await this.ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents,
        config: {
          imageConfig: {
            aspectRatio: '4:3',
            imageSize: '1K',
            imageQuality: 'high'
          }
        }
      })
    } catch (e) {
      console.error('Gemini API Error details:', JSON.stringify(e, null, 2))
      throw e
    }

    const parts = response.candidates?.[0]?.content?.parts || []

    for (const part of parts) {
      if (part.inlineData) {
        return {
          imageBase64: part.inlineData.data,
          mimeType: part.inlineData.mimeType || 'image/jpeg'
        }
      }
    }

    throw new Error('Gemini no devolvió ninguna imagen')
  }
}

module.exports = GeminiImageService