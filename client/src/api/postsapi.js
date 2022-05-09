import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
const url = 'http://localhost:8000/posts'

export const getPosts = createAsyncThunk('getPosts', async (thunkAPI) => {
    try {
        const { data } =  await axios.get(url)
        return data
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
 })
 
 export const createPost = createAsyncThunk('createPost', async (post, thunkAPI) => {
    try {
        await axios.post(url, post)
        return post
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
})
    
export const updatePost = async (post) => {
    await axios.put(url+"/", post)
}
    
export const deletePost = createAsyncThunk('deletePost', async (post, thunkAPI) => {
    try {
        console.log(url + `/${post.id}`)
        await axios.delete(url+ "/"+ post.id)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})