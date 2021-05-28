const User = require('../models/User')
const gravatar = require('gravatar')
const generateToken = require('../utils/getToken')

//@desc Login user
//@method POST /api/users/login
//@access Public
const loginUser = async (req,res) =>{
  const {email , password} = req.body;
  try {
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
      res.json({
        _id: user._id,
        name: user.name,
        email:user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })
    } else{
      res.status(401).json({msg:'Invalid email or password'})
    } 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
}

//@desc Register user
//@method POST /api/users/register
//@access Public
const registerUser = async (req,res)=>{
  const {name , email , password} = req.body;
  try{
    //SEE IF USER EXISTS
    let userExists = await User.findOne({email});
    if(userExists){
      return res.status(400).json({ errors : [{ msg : "user already exists" }]});
    }

    const avatar= gravatar.url(email,{
      s:"200",
      r: 'pg',
      d:'mm'
    });

    //CREATE NEW USER
    const user= await User.create({
      name,
      email,
      password,
      avatar
    })

    if(user){
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email:user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })
    }

  }catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
}

//@desc Get user Details
//@method GET /api/users/:id
//access Private
const getUserDetails = async (req,res)=>{

    try {
      const user = await User.findById(req.user.id).select('-password')
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
      const user = await User.findById(req.user.id).select('-password')
      if(!user){
          res.status(404).json({msg:'User Not found'})
      }else {
          user.name = req.body.name || user.name
          user.email = req.body.email || user.email
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
      const user = await User.findById(req.user.id).select('-password')
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

module.exports = {getUserDetails, updateUserDetails, deleteUser, loginUser, registerUser}