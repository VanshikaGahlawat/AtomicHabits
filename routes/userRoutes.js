const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')
const {getUserDetails, updateUserDetails, deleteUser, loginUser, registerUser} = require('../controllers/usercontrollers')

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/:id').get(protect, getUserDetails).put(protect, updateUserDetails).delete(protect, deleteUser)

module.exports = router