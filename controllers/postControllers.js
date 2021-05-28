const Post = require('../models/Post')

//@desc upload new post
//@method POST /api/posts
//@access Private
const uploadAPost = async (req,res)=> {
    try {
        const user = await User.findById(req.user.id).select('-password');

        let newPost = new Post({
            image: req.body.image,
            user: req.user.id
        });

        const post= await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

//@desc Get a post by ID
//@method GET /api/posts/:id
//@access Private
const getPostById = async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:'Post not found'});
        }

        res.json(post); 

    } catch (err) {
        if(err.kind=== 'ObjectId'){
            return res.status(404).json({msg:'Post not found'});
        }
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


//@desc Add a like
//@method PUT /api/posts/like/:postId
//@access Private
const addLike = async (req,res)=> {
    try {
        const post = await Post.findById(req.params.postId);

        //Check if already liked
        if(post.likes.filter(like => like.user.toString === req.user.id).length > 0){
            return res.status(400).json({msg: 'Post already liked'});
        }

        post.likes.unshift({user: req.user.id});
        await post.save();
        res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
}

//@desc Add comment
//@method PUT /api/posts/comment/:id
//@access Private
const addComment = async (req,res)=> {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        //Check if post available
        if(!post){
            return res.status(404).json({msg:'Post not found'});
        }

        let newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };
        post.comments.unshift(newComment);

        await post.save();
        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = {uploadAPost, addComment, addLike, getPostById}