const express = require('express')
const router = express.Router()
const {getAllPosts} = require('../controllers/feedControllers')

router.route('/').get(getAllPosts)

module.exports = router