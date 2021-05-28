const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')
const {uploadAPost, addComment, addLike, getPostById} = require('../controllers/postControllers')

router.route('/').post(protect, uploadAPost)
router.route('/like/:id').put(protect, addLike)
router.route('/comment/:id').put(protect, addComment)
router.route('/:id').get(protect, getPostById)

module.exports = router