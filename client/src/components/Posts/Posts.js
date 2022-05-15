import React from 'react'
import Post from './Post'
import Loading from './Loading'
import { useSelector, shallowEqual } from 'react-redux'

export default function Posts() {
  const { data : posts, status : state } = useSelector(state => state.posts, shallowEqual)
  const user = JSON.parse(localStorage.getItem("user"))
  let username
  let avatar
  if(user){
    username = user.username
    avatar = user.avatar
  }
  return (
    <>
        {posts?  React.Children.toArray(posts.map(post => (
          <div>
            <Post post = {post} username = {username} avatar = {avatar}/>
          </div>
        ))):null}

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
