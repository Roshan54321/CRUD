import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
const url = 'http://localhost:8000/posts'

export const getPosts = createAsyncThunk('getPosts', async (thunkAPI) => {
    try {
        const token = localStorage.getItem("token")
        const { data } = await axios.get(url, {
            headers: {
                "x-access-token": token
            }
        })
        return data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const createPost = createAsyncThunk('createPost', async (post, thunkAPI) => {
    try {
        const token = localStorage.getItem("token")
        const { data } = await axios.post(url, post, {
            headers: {
                "x-access-token": token
            }
        })
        if (typeof data !== typeof undefined) {
            if (typeof data.auth !== typeof undefined) {
                if (!data.auth) {
                    localStorage.setItem("auth", JSON.stringify({ auth: false }))
                    return
                } else {
                    return post
                }
            } else {
                return post
            }
        }
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const updatePost = createAsyncThunk('updatePost', async (post, thunkAPI) => {
    try {
        const token = localStorage.getItem("token")
        const { data } = await axios.put(url, post, {
            headers: {
                "x-access-token": token
            }
        })
        if (typeof data.auth !== typeof undefined) {
            if (!data.auth) {
                localStorage.setItem("auth", JSON.stringify({ auth: false }))
                return
            }else{
                return post
            }
        }else{
            return post
        }
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
    
export const deletePost = createAsyncThunk('deletePost', async (post, thunkAPI) => {
    try {
        const token = localStorage.getItem("token")
        const { data } = await axios.delete(url + '/' + post.id, {
            headers: {
                "x-access-token": token
            }
        })
        if (typeof data !== typeof undefined) {
            if (typeof data.auth !== typeof undefined) {
                if (!data.auth) {
                    localStorage.setItem("auth", JSON.stringify({ auth: false }))
                    return
                } else {
                    return post
                }
            } else {
                return post
            }
        }
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})