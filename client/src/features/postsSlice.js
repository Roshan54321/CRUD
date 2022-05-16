import { createSlice } from '@reduxjs/toolkit'
import * as postsapi from '../api/postsapi'

const initialState = {
    data : [],
    auth: false, 
    status : ""
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        changeAuth: async (state, action) => {
            try{
                return {...state, auth: action.payload.auth}
            }catch(e){
                console.error(e)
            }
        },
        loadPersistedState: (state, action) => {
            try{
                const loaded = JSON.parse(localStorage.getItem("auth"))   
                if(loaded)
                    return {...state, auth: loaded.auth} 
            }catch(e){
                console.error(e)
            }
        }
    },
    extraReducers: (builder) => {
        builder
           .addCase(postsapi.getPosts.fulfilled, (state, action) => {
               if(typeof action.payload !== typeof undefined){
                if (typeof action.payload.auth !== typeof undefined) {
                    if (!action.payload.auth) {
                        localStorage.setItem("auth", JSON.stringify({ auth: false }))
                        return({...state, auth: action.payload.auth, status: "success"})  
                    } 
                } else {
                    return({...state, data: action.payload, status: "success"})  
                }}
            })
            
            .addCase(postsapi.getPosts.pending, (state, action) => {
                return({...state, data: action.payload, status: "loading"})  
            })
            
            .addCase(postsapi.getPosts.rejected, (state, action) => {
                state.data = null;
                state.status = "failed"
            })
            
            .addCase(postsapi.createPost.fulfilled, (state, action) => {
                return({...state, data: [...state.data, action.payload], status: "success"})  
            })
            
            .addCase(postsapi.createPost.pending, (state, action) => {
                state.status = "loading"
           })

            .addCase(postsapi.deletePost.fulfilled, (state, action) => {
                return {...state, data: state.data.filter(data => data.id !== action.payload.id) }
            })
            
            .addCase(postsapi.deletePost.rejected, (state, action) => {
                state.status = "failed"
           })

            .addCase(postsapi.updatePost.fulfilled, (state, action) => {
                if(typeof action.payload !== typeof undefined){
                    state.data = state.data.map(post => {
                        if(post.id===action.payload.id){
                            post = {...action.payload, id: post.id}
                        }
                    })
                }
           })
     }
})

export const { createPost, changeAuth, loadPersistedState } = postsSlice.actions
export default postsSlice.reducer