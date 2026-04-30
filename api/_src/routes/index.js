const express = require('express')
const router = express.Router()

router.use('/maker', require('./customer/maker'))

module.exports = router
