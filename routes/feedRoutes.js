const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')
const {getAllPosts} = require('../controllers/feedControllers')

router.route('/').get(protect, getAllPosts)

module.exports = router