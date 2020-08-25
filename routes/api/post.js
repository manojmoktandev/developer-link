const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Posts = require('../../models/Post');
const Users = require('../../models/Users');
const { check, validationResult } = require('express-validator');


// @route       POST api/post
//@desc         Create Post
//@access       Private
router.post('/', auth, [
    check('text', 'Text is required').not().isEmpty()
], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ msg: errors.array() });
            }
            const user = await Users.findById(req.user.id).select('-password');
            const newPost = new Posts({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            });
            const post = await newPost.save();
            res.json(post);
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }      
);
// @route       POST api/post
//@desc         Create Post
//@access       Private
router.get('/', auth, async (req, res)=>{
    try {
        const posts = await Posts.find().sort({ date: -1 });
        res.json(posts);
       
   } catch (error) {
       console.error(error.message);
       res.status(500).send('Server Error');
   } 
});

// @route       GET api/post/:id
//@desc         Get POST By ID
//@access       Private
router.get('/:id', auth, async (req, res)=>{
    try {
        const posts = await Posts.findById(req.params.id);
        if (!posts) {
            res.status(404).json({ msg: 'Post not found' });
        }
        res.json(posts);
       
   } catch (error) {
        console.error(error.message);
        if (error.kind==='ObjectId') {
            res.status(404).json({ msg: 'Post not found' });
        }
       res.status(500).send('Server Error');
   } 
});

// @route       DELETE api/post/:id
//@desc         DELETE POST By ID
//@access       Private
router.delete('/:id', auth, async (req, res)=>{
    try {
        const post = await Posts.findById(req.params.id);
        //checked  own post user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json('user not authorized');
        }
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        await post.remove();
        res.json({msg:'Post removed'});
       
   } catch (error) {
        console.error(error.message);
        if (error.kind==='ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
       res.status(500).send('Server Error');
   } 
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
      // Check if the post has already been liked
      if (post.likes.some(like => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post already liked' });
      }
  
      post.likes.unshift({ user: req.user.id });
  
      await post.save();
  
      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // @route    PUT api/posts/unlike/:id
  // @desc     Unlike a post
  // @access   Private
  router.put('/unlike/:id', auth, async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      // Check if the post has not yet been liked
      if (!post.likes.some(like => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
      }
  
      // remove the like
      post.likes = post.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      );
  
      await post.save();
  
      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    POST api/posts/comment
// @desc     ADD COMMENT on post
// @access   Private
router.post('/comment/:id', [auth, [check('text', 'Comment text is required').not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  try {
    const user = await Users.findById(req.user.id).select('-password');
    const post = await Posts.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }
    
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    post.comment.unshift(newComment);
    
    await post.save();
    return res.json(post.comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/comment
// @desc     DELETE COMMENT OF post
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }
    //pull out  comment from post
    const comment = post.comment.find(comment =>comment.id===req.params.comment_id);
    
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user un authorized" });
    }

    // remove  comment index
    const removeIndex = post.comment.map(comment => comment.user.toString()).indexOf(req.user.id);

    post.comment.splice(removeIndex, 1);

    await post.save();
    return res.json(post.comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;