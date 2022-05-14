const postModel = require('../DataModel/posts')

const getPosts = async (req, res) => {
    try{
        const post =  await postModel.find()
        res.status(200).json(post)
    } catch(err){
        res.status(404).json({ message: err.message })
    }
}

const createPost = async (req, res) => {
    const newPost = new postModel(req.body)
    try{
        await newPost.save()
        res.status(201).json(newPost)
    } catch(err){
        res.status(409).json({ message: err.message })
    }
}

const deletePost = async (req, res) => {
    try{
        await postModel.deleteOne({ id: req.params.id})
        res.status(200).json()
    } catch(err){
        res.status(404).json({ message: err.message })
    }
}

const updatePost = async (req, res) => {   
    try{
        const post = await postModel.findOneAndReplace({ username: req.body.username }, req.body)
        res.status(204).json(post)
    } catch(err){
        res.status(409).json({ message: err.message })
    }
}

module.exports = { getPosts, createPost, updatePost, deletePost }