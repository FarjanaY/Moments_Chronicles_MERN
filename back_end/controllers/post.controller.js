//internal imports
const Post = require("../models/post.model");

/*==================================================================
desc: Create Post
route: http://localhost:8000/api/post/add
method: POST 
====================================================================*/
const addPost = async (req, res) => {
  try {
    //Checking if the post title exists or not
    const existingPostTitle = await Post.findOne({ title: req.body.title });
    if (existingPostTitle) {
      return res.status(400).json({
        result: "unsuccessful",
        message: "Already exists! Try another One.",
      });
    } else {
      const newPost = new Post(req.body);

      const savePost = await newPost.save();
      if (savePost) {
        return res.status(200).json({
          result: "successful",
          message: "Post added successfully.",
          savePost,
        });
      } else {
        return res.status(404).json({
          rssult: "unsuccessful",
          message: "Error! Post can't be added. ",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      rssult: "unsuccessful",
      message: "Error! Server error.... ",
      error: error.message,
    });
  }
};

/*==================================================================
 desc : Get all Post with query 
 route: http://localhost:8000/api/post/
 methos : GET  
====================================================================*/
const getAllPosts = async (req, res) => {
  const username = req.query.username;
  const catName = req.query.catagories;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (catName) {
      posts = await Post.find({
        catagories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    if (posts) {
      return res.status(200).json({
        result: "successful",
        message: "Posts are found.",
        total: posts.length,
        posts,
      });
    } else {
      return res.status(404).json({
        result: "unsuccessful",
        message: "Error! Posts can't be found.... ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      result: "unsuccessful",
      message: "Error! Server error.... ",
      error: error.message,
    });
  }
};

/*==================================================================
desc : Get One post 
route : http://loaclhost:8000/api/post/:id
method : GET   
====================================================================*/
const getOnePost = async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (post) {
      return res.status(200).json({
        result: "successful",
        message: "Post found.",
        post,
      });
    } else {
      return res.status(400).json({
        result: "unsuccessful",
        message: "Error! Can't be found. ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      result: "unsuccessful",
      message: "Error! Server error.... ",
      error: error.message,
    });
  }
};
/*==================================================================
desc : Edit/update post
route : http://localhost:8000/api/post/update/:id
method: PUT  
====================================================================*/
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (post) {
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
          );
          if (updatedPost) {
            res.status(200).json({
              result: "successful",
              message: "Post updated successfully.... ",
              updatedPost,
            });
          } else {
            res.status(404).json({
              result: "unsuccesful",
              message: "Error!!! Post can't be added.",
            });
          }
        } catch (error) {}
      } else {
        return res.status(401).json({
          rssult: "unsuccessful",
          message: "Unauhtorised Access!!! You can only update your post. ",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      rssult: "unsuccessful",
      message: "Error! Server error.... ",
      error: error.message,
    });
  }
};

/*==================================================================
desc : Delete Post 
route : http://localhost:8000/api/delete/:id
method : DELETE  
====================================================================*/
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (post) {
      if (post.username === req.body.username) {
        try {
          const deletePost = await post.deleteOne(post);
          if (deletePost) {
            return res.status(200).json({
              rssult: "successful",
              message: "Post deleted successfully.... ",
              deletePost,
            });
          } else {
            return res.status(404).json({
              rssult: "unsuccessful",
              message: "Post can't ne deleted.",
            });
          }
        } catch (error) {
          return res.status(500).json({
            rssult: "unsuccessful",
            message: "Error! Server error.... ",
            error: error.message,
          });
        }
      } else {
        return res.status(401).json({
          rssult: "unsuccessful",
          message: "Unauthorised Access ! You can only delete your post.",
        });
      }
    } else {
      return res.status(404).json({
        rssult: "unsuccessful",
        message: "Error! Cann't found the post.... ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      rssult: "unsuccessful",
      message: "Error! Server error.... ",
      error: error.message,
    });
  }
};

module.exports = { addPost, getAllPosts, getOnePost, updatePost, deletePost };
