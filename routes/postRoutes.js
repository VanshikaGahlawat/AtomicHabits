const express = require('express')
const router = express.Router()
const {uploadAPost, addComment, addLike, getPostById} = require('../controllers/postControllers')

router.route('/').post(uploadAPost)
router.route('/like/:id').put(addLike)
router.route('/comment/:id').put(addComment)
router.route('/:id').get(getPostById)

module.exports = router