import React, { useEffect } from 'react'
import Header from './components/Header'
import Posts from './components/Posts/Posts'
import Createpost from './components/Posts/Createpost'
import { useDispatch } from 'react-redux'
import { getPosts } from './api/postsapi'
import "./App.css"



export default function App() {
  const dispatch = useDispatch()
  dispatch(getPosts())
  return (
    <>
      <Header/>
      <Createpost/>
      <Posts/>
    </>
  )
}
