const express = require('express')

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const result = await req.geminiGeneratorService.generateTshirt({
      text: req.body.design,
      customImage: req.body.customImage,
      useDefaultBaseImage: req.body.useDefaultBaseImage
    })
    res.status(201).json({
      image: `data:${result.mimeType};base64,${result.imageBase64}`
    })
  } catch (error) {
    console.error('[Maker] Error:', error)
    next(error)
  }
})

module.exports = router