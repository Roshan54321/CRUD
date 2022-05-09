const router = require('express').Router()
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/posts')

router.get('/', getPosts)
router.post('/', createPost)
router.put('/', updatePost)
router.delete("/:id", deletePost)

module.exports = router