const postModel = require('../DataModel/posts')

const getPosts = async (req, res) => {
    try{
        const post =  await postModel.find()
        res.status(200).json(post)
    } catch(err){
        res.status(404).json({ message: err.message })
    }
}

const createPosts = async (req, res) => {
    const newPost = new postModel(req.body)
    
    try{
        await newPost.save()
        res.status(201).json(newPost)
    } catch(err){
        res.status(409).json({ message: err.message })
    }
}

module.exports = { getPosts, createPosts }