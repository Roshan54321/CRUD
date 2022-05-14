import React from 'react'
import Post from './Post'
import Loading from './Loading'
import { useSelector, shallowEqual } from 'react-redux'

export default function Posts() {
  const { data : posts, status : state, user } = useSelector(state => state.posts, shallowEqual)
  let username, avatar
  if(typeof user !== typeof undefined){
    username = user.username
    avatar = user.avatar
  }
  return (
    <>
        {posts? posts.map(post => (
        <React.Fragment  key={Math.random(Date.now())}>
          <Post post = {post} username = {username} avatar = {avatar}/>
        </React.Fragment>
        )):null}

        {(posts && state==="loading")? 
        <React.Fragment  key={Math.random(Date.now())}>
          <Loading/>
        </React.Fragment>
        :null}

        {(!posts && state==="loading")?
        <React.Fragment  key={Math.random(Date.now())}>
          <Loading/>
          <Loading/>
          <Loading/>
        </React.Fragment>
        :null}
    </>
  )
}
