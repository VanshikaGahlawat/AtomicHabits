const express = require('express')
const router = express.Router()
const {getUserDetails, updateUserDetails, deleteUser} = require('../controllers/usercontrollers')

router.route('/:id').get(getUserDetails).put(updateUserDetails).delete(deleteUser)

module.exports = router