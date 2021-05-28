const Post = require('../models/Post')

//@desc All posts
//@method GET /api/posts
//access Private
const getAllPosts = async (req,res)=>{
    try {
      const posts = await Post.find({})
      if(!posts){
          res.status(404).json({msg:'No Posts Found'})
      }else {
          res.json(posts)
      } 
    } catch (err) {
      console.error({msg: err.message}) 
      res.status(500) 
    }
}

module.exports = {getAllPosts} 