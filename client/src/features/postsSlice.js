import { createSlice } from '@reduxjs/toolkit'
import * as postsapi from '../api/postsapi'
import * as accountapi from '../api/accountapi'

const initialState = {
    data : [],
    auth : false,
    user : {username:"", avatar:"", message:""},
    status : ""
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
        changeAuth: async (state, action) => {
            try{
                state.auth = action.payload.auth   
            }catch(e){
                console.error(e)
            }
        },
        loadPersistedState: (state, action) => {
            try{
                const loaded = JSON.parse(localStorage.getItem("state"))   
                if(loaded)
                    return loaded 
            }catch(e){
                console.error(e)
            }
        }
    },
    extraReducers: (builder) => {
        builder
           .addCase(postsapi.getPosts.fulfilled, (state, action) => {
                localStorage.setItem("state", JSON.stringify({...state, data: action.payload, status: "success"}))
                return({...state, data: action.payload, status: "success"})  
            })
            
            .addCase(postsapi.getPosts.pending, (state, action) => {
                return({...state, data: action.payload, status: "loading"})  
            })
            
            .addCase(postsapi.getPosts.rejected, (state, action) => {
                state.data = null;
                state.status = "failed"
            })
            
            .addCase(postsapi.createPost.fulfilled, (state, action) => {
                localStorage.setItem("state", JSON.stringify({...state, data:[...state.data, action.payload], status: "success"}))
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
                
            .addCase(accountapi.authUser.fulfilled, (state, action) => {
                if(action.payload.auth){
                    return {...state, auth: true,
                        user: {...state.user, username:action.payload.result.username, avatar:action.payload.result.avatar}}
                }else{
                    localStorage.removeItem("state")
                    localStorage.removeItem("token")
                    return {...state, auth: false,
                        user: {...state.user, message:action.payload.message}}
                }
           })
     }
})

export const { createPost, changeAuth, loadPersistedState } = postsSlice.actions
export default postsSlice.reducer