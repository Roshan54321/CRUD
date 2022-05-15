const router = require('express').Router()
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/posts')
const { authUser } = require('../controllers/users')

router.get('/', authUser, getPosts)
router.post('/', authUser, createPost)
router.put('/', authUser, updatePost)
router.delete("/:id", authUser, deletePost)

module.exports = router