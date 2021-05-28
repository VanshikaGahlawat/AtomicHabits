const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')
const {getOneActivity, addActivity} = require('../controllers/activityControllers')

router.route('/').post(addActivity).get(protect, getOneActivity)


module.exports = router