import React, { useEffect } from 'react'
import Header from '../components/Header'
import Posts from '../components/Posts/Posts'
import Createpost from '../components/Posts/Createpost'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { getPosts } from '../api/postsapi'
import { authUser } from '../api/accountapi'
import { useNavigate } from 'react-router-dom'
import { loadPersistedState } from '../features/postsSlice'
import { store } from '../app/store'
import "./App.css"

export default function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadPersistedState())
    dispatch(authUser())
    dispatch(getPosts())
  }, [dispatch])
  const state = useSelector(state => state, shallowEqual)
  console.log(state)
  return (
    <>
      <Header/>
      <Createpost/>
      <Posts/>
    </>
  )
}

///true vayera false vayo posts pending state ma huda