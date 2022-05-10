import React, { useEffect } from 'react'
import Post from './Post'
import Loading from './Loading'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

export default function Posts() {
  const { data : posts, status : state } = useSelector(state => state.posts, shallowEqual)
  return (
    <>
        {posts? posts.map(post => (
        <React.Fragment  key={Math.random(Date.now())}>
          <Post post = {post}/>
        </React.Fragment>
        )):null}

        {posts && state==="loading"? 
        <React.Fragment  key={Math.random(Date.now())}>
          <Loading/>
        </React.Fragment>
        :null}

        {!posts && state==="loading"?
        <React.Fragment  key={Math.random(Date.now())}>
          <Loading/>
          <Loading/>
          <Loading/>
        </React.Fragment>
        :null}
    </>
  )
}
