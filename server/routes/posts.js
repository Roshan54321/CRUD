const router = require('express').Router()
const { getPosts, createPosts } = require('../controllers/posts')

router.get('/', getPosts)

module.exports = router