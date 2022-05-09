import React, { useEffect, useState } from 'react'
import Post from './Post'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { store } from '../../app/store'
import { getPosts } from '../../api/postsapi'

export default function Posts() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPosts())
  }, [])
  const posts = useSelector(state => state.posts.data, shallowEqual)
  return (
    <>
        {posts? posts.map(post => (
        <React.Fragment  key={Math.random(Date.now())}>
          <Post post = {post}/>
        </React.Fragment>
        )):null}
    </>
  )
}
