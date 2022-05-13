import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Posts from '../components/Posts/Posts'
import Createpost from '../components/Posts/Createpost'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { getPosts } from '../api/postsapi'
import { authUser } from '../api/accountapi'
import { useNavigate } from 'react-router-dom'
import { loadPersistedState } from '../features/postsSlice'
import { store } from '../app/store'

export default function App() {
  const [style, setStyle] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadPersistedState())
    dispatch(authUser())
    const info = store.getState().posts
    if(info){
      if(!info.auth){
        navigate('/login')
      }}
    dispatch(getPosts())
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