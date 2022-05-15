import React, { useCallback, useEffect, useState } from 'react'
import Header from '../components/Header'
import Posts from '../components/Posts/Posts'
import Createpost from '../components/Posts/Createpost'
import { useDispatch } from 'react-redux'
import { getPosts } from '../api/postsapi'
// import { authUser } from '../api/accountapi'
import { useNavigate } from 'react-router-dom'
// import { loadPersistedState } from '../features/postsSlice'
// import { store } from '../app/store'

export default function App() {
  const [style, setStyle] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    // dispatch(loadPersistedState())
    // const info = store.getState().posts
    // console.log(info)
    dispatch(getPosts())
    const auth = JSON.parse(localStorage.getItem("auth"))
    if(auth){
      if(!auth.auth){
        localStorage.removeItem("token")
        localStorage.removeItem("auth")
        localStorage.removeItem("user")
        navigate("/login")
      }
    }
  }, [dispatch, navigate])
  const handleMode = (mode) => {
    if(mode){
      setStyle({backgroundColor:"#002221"})
    }else{
      setStyle({backgroundColor:"white"})
    }
  }
  return (
    <div style={style}>
      <Header setDarkMode={handleMode}/>
      <Createpost/>
      <Posts/>
    </div>
  )
}