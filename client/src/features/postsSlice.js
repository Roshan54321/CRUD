import { createSlice } from '@reduxjs/toolkit'
import * as api from '../api/postsapi'

const initialState = {
    data : [],
    status : "",
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        updatePost: async (state, action) => {
            try{
                return state.data.map(post => post._id===action.payload._id? post=action.payload:post)
            }catch(e){
                console.error(e)
            }       
        },
    },
    extraReducers: (builder) => {
        builder
           .addCase(api.getPosts.fulfilled, (state, action) => {
              return({...state, data: action.payload, status: "success"})  
            })
            
            .addCase(api.getPosts.pending, (state, action) => {
                state.status = "loading"  
            })
            
            .addCase(api.getPosts.rejected, (state, action) => {
                state.data = null;
                state.status = "failed"
            })
            
            .addCase(api.createPost.fulfilled, (state, action) => {
                return({...state, data: [...state.data, action.payload], status: "success"})  
            })
            
            .addCase(api.createPost.rejected, (state, action) => {
                state.status = "failed"
           })

            .addCase(api.deletePost.fulfilled, (state, action) => {
                return {...state, data: state.data.filter(id => id !== action.payload.id) }
            })
            
            .addCase(api.deletePost.rejected, (state, action) => {
                state.status = "failed"
           })
     }
})

export const { createPost } = postsSlice.actions
export default postsSlice.reducer