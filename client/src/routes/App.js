import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Posts from '../components/Posts/Posts'
import Createpost from '../components/Posts/Createpost'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { getPosts } from '../api/postsapi'
import { useNavigate } from 'react-router-dom'
import { loadPersistedState } from '../features/postsSlice'

export default function App() {
  const [style, setStyle] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const auth = useSelector(state => state.posts.auth, shallowEqual)
  useEffect(() => {
    const localAuth = JSON.parse(localStorage.getItem("auth"))
    dispatch(getPosts())
    dispatch(loadPersistedState())
    if( auth === localAuth.auth && !auth ){
        localStorage.removeItem("token")
        localStorage.removeItem("auth")
        localStorage.removeItem("user")
        navigate("/login")
    }
  }, [dispatch, navigate, auth])
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