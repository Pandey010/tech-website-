const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    excerpt: req.body.excerpt,
    content: req.body.content,
    author: req.body.author,
    category: req.body.category,
    readTime: req.body.readTime,
    imageUrl: req.body.imageUrl,
    date: req.body.date,
    tags: req.body.tags
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = req.body.title || post.title;
    post.excerpt = req.body.excerpt || post.excerpt;
    post.content = req.body.content || post.content;
    post.author = req.body.author || post.author;
    post.category = req.body.category || post.category;
    post.readTime = req.body.readTime || post.readTime;
    post.imageUrl = req.body.imageUrl || post.imageUrl;
    post.date = req.body.date || post.date;
    post.tags = req.body.tags || post.tags;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;