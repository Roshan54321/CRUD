import axios from 'axios'
const url = 'http://localhost:8000'

export const registerUser = async (post) => {
    try{
        const {data} = await axios.post(url+"/register", post)
        return data
    }catch(e){
        console.error(e)
    }
}

export const loginUser = async (post) => {
    try{
        const { data } = await axios.post(url+"/login", post)
        return data
    }catch(e){
        console.error(e)
    }
}