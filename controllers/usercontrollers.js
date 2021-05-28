const User = require('../models/User')

//@desc Get user Details
//@method GET /api/users/:id
//access Private
const getUserDetails = async (req,res)=>{
    try {
      const user = await User.findById(req.params.id)
      if(!user){
          res.status(404).json({msg:'User Not found'})
      }else {
          res.json(user)
      } 
    } catch (err) {
      console.error({msg: err.message}) 
      res.status(500) 
    }
}

//@desc update user Details
//@method PUT /api/users/:id
//access Private
const updateUserDetails = async (req,res)=>{
    try {
      const user = await User.findById(req.params.id)
      if(!user){
          res.status(404).json({msg:'User Not found'})
      }else {
          user.name = req.body.name
          user.email = req.body.email
          if(req.body.password){
              user.password = req.body.password
          }
          const updatedUser = await user.save()
          res.json(updatedUser)
      } 
    } catch (err) {
      console.error({msg: err.message}) 
      res.status(500) 
    }
}

//@desc delete user
//@method Delete /api/users/:id
//access Private
const deleteUser = async (req,res)=>{
    try {
      const user = await User.findById(req.params.id)
      if(!user){
          res.status(404).json({msg:'User Not found'})
      }else {
         await user.remove()
          res.json({msg: 'User Deleted'})
      } 
    } catch (err) {
      console.error({msg: err.message}) 
      res.status(500) 
    }
}

module.exports = {getUserDetails, updateUserDetails, deleteUser}