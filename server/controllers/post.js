import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log("The request has reach here");
    return res.status(200).json(postMessages);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "No Post found " });
  try {
    let updatedPost = await PostMessage.findOne({ _id });
    if (!updatedPost)
      return res.status(404).json({ message: "No Post found " });
    updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(500).json({ message: err.mesage });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "No Post found " });
  try {
    let post = await PostMessage.findOne({ _id });
    if (!post) {
      return res.status(404).json({ message: "No Post found " });
    }
    await PostMessage.findByIdAndRemove(_id);
    return res.status(200).json({ message: "Post deleted succesfully" });
  } catch (err) {
    return res.status(500).json({ message: err.mesage });
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    // Check if the user is login
    if (!req.userId)
      return res.status(400).json({ message: "Unauthenticated" });

    // Check whether the id is valid
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).json({ message: "No Post found " });
    // Find Post
    let post = await PostMessage.findById(_id);
    if (!post) {
      return res.status(404).json({ message: "No Post found " });
    }
    // Verify if to implement likes OR dislikes

    // Verify if the user Id already exist in the likes array
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      // User is yet to like a post
      post.likes.push(req.userId);
    } else {
      // User want to dislike Post
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    // Update Post Like
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    /*const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      {
        likeCount: post.likeCount + 1,
      },
      { new: true }
    );*/
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: err.mesage });
  }
};
