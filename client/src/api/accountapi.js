import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
const url = 'http://localhost:8000'

// export const authUser = createAsyncThunk('authUser', async (thunkAPI) => {
//     try {
//         const token = localStorage.getItem("token")
//         const { data } = await axios.get(url+"/auth", {
//             headers: {
//                 "x-access-token": token
//             }
//         })
//         return data
//     } catch (error) {
//        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//        return thunkAPI.rejectWithValue(message);
//     }
//  })

 export const registerUser = async (post) => {
    try {
        const {data} = await axios.post(url+"/register", post)
        return data
    } catch (error) {
       console.error(error)
    }
 }

export const loginUser = async (post) => {
    try {
        const { data } = await axios.post(url+"/login", post)
        return data
    } catch (error) {
       console.error(error)
    }
 }