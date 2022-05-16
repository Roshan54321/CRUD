import React, { useState, useEffect, useRef } from 'react'
import { Avatar, IconButton } from '@mui/material'
import like from '../../assets/like.png'
import love from '../../assets/love.png'
import { Badge, Tooltip, OverlayTrigger, Card, InputGroup, FormControl, Form, Button, CloseButton, Collapse, Stack } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deletePost, updatePost } from '../../api/postsapi'
import moment from 'moment'

export default function Post(props) {
    const likeButtonElement = useRef(null)
    const loveButtonElement = useRef(null)
    const comment = useRef(null)
    const commentButton = useRef(null)
    const image = useRef(null)
    const form = useRef(null)
    const [open, setOpen] = useState(false)
    const [post, setPost] = useState(props.post)

    let diff = ""
    if (typeof props.post !== typeof undefined) {
        diff = moment(props.post.createdAt).fromNow()
    }
    const [time, setTime] = useState(diff)
    const dispatch = useDispatch()
    const likeButton = () => {
        if (!likeButtonElement.current.disabled) {
            likeButtonElement.current.disabled = true
            likeButtonElement.current.disabledRipple = true
            dispatch(updatePost({ ...post, likes: post.likes + 1 }))
            setPost({ ...post, likes: post.likes + 1 })
        } else {
            likeButtonElement.current.disabled = false
            likeButtonElement.current.disabledRipple = false
            dispatch(updatePost({ ...post, likes: post.likes - 1 }))
            setPost({ ...post, likes: post.likes - 1 })
        }
    }

    const loveButton = () => {
        if (!loveButtonElement.current.disabled) {
            loveButtonElement.current.disabled = true
            loveButtonElement.current.disabledRipple = true
            dispatch(updatePost({ ...post, loves: post.loves + 1 }))
            setPost({ ...post, loves: post.loves + 1 })
        }
        else {
            loveButtonElement.current.disabled = false
            loveButtonElement.current.disabledRipple = false
            dispatch(updatePost({ ...post, loves: post.loves - 1 }))
            setPost({ ...post, loves: post.loves - 1 })
        }
    }

    const hidePost = () => {
        dispatch(deletePost(post))
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Hide Post
        </Tooltip>
    )
    let creatorAvatar = ""
    let creator = ""
    if (typeof post!==typeof undefined) {
        creator = post.creator
        creatorAvatar = creator.slice(0, 1)
    }

    
    useEffect(() => {
    image.current.addEventListener("mouseover", e => {
            console.log("...")
            e.target.style.cursor = "pointer"
            e.target.style.transform = "translate(5%, -15%)"
            e.target.style.height = "110%"
            e.target.style.width = "110%"
        })
    image.current.addEventListener("mouseout", e => {
            e.target.style.transform = ""
            e.target.style.height = "100%"
            e.target.style.width = "100%"
        })
        form.current.addEventListener('submit', event => {
            event.preventDefault()
            dispatch(updatePost({ ...post, replies: [...post.replies, { creator: props.username, avatar: props.avatar, reply: comment.current.value }] }))
            setPost({ ...post, replies: [...post.replies, { creator: props.username, avatar: props.avatar, reply: comment.current.value }] })
            form.current.reset()
        })
    }, [])
    
    return (
        <div>
                <Card style={{ margin: '1rem', width: '30rem' }}>
                    <Card.Header>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}>
                            <CloseButton style={{ float: "right" }} onClick={hidePost} className='fo' />
                        </OverlayTrigger>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar alt='' src={post.avatar}>{creatorAvatar}</Avatar>
                            <span style={{ marginLeft: '0.5rem' }}>{creator}</span>
                        </div>
                        {post.title ? <Card.Title className="text-center mt-1 fs-6">{post.title}</Card.Title> : null}
                    </Card.Header>
                    {post.file ?
                        <Card.Body style={{ maxWidth: "100%", height: "100%" }}>
                            <img style={{ width: "100%", height: "100%" }} ref={image} alt='' src={post.file}></img>
                        </Card.Body>
                        : null
                    }
                    {post.message ?
                        <Card.Body className="border">
                            <Card.Subtitle className="text-danger fs-6">{post.message}</Card.Subtitle>
                        </Card.Body>
                        : null
                    }
                    <Card.Footer>
                        <div style={{ display: 'flex' }}>
                            <div><IconButton ref={likeButtonElement} onClick={likeButton}><img alt='' style={{ height: '2rem' }} src={like}></img></IconButton>{post.likes}</div>
                            <div><IconButton ref={loveButtonElement} onClick={loveButton}><img alt='' style={{ height: '2rem' }} src={love}></img></IconButton>{post.loves}</div>
                        </div>

                        <Button onClick={() => setOpen(!open)} aria-controls="text" aria-expanded={open} className='w-100 mb-2 btn-sm' variant="secondary">
                            Comments <Badge bg="secondary">{post.replies.length}</Badge>
                            <span className="visually-hidden">unread messages</span>
                        </Button>

                        <Collapse in={open}>
                            <Stack gap={2} id="text" className='border mb-2'>
                                {post.replies ? post.replies.map((reply) => {
                                    return (
                                        <div key={Math.random(Date.now())} style={{ backgroundColor: "white", padding: "0.5rem" }}>
                                            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                                <Avatar alt='' src={reply.avatar}>A</Avatar>
                                                <span style={{ fontWeight: "500" }}>{reply.creator}</span>
                                            </div>
                                            <div style={{ marginLeft: "3rem", color: "blue" }}>{reply.reply}</div>
                                        </div>
                                    )
                                }) : null}
                            </Stack>
                        </Collapse>

                        <Form ref={form}>
                            <InputGroup>
                                <InputGroup.Text>Comment</InputGroup.Text>
                                <FormControl ref={comment} as="textarea" aria-label="Comment" onChange={() => {
                                    if (comment.current.value) {
                                        commentButton.current.disabled = false
                                    } else {
                                        commentButton.current.disabled = true
                                    }
                                }
                                } />
                                <Button type='submit' ref={commentButton} disabled>Send</Button>
                            </InputGroup>
                        </Form>

                        <div style={{ textAlign: "center", marginTop: '0.5rem', color: "green", opacity: "0.5" }}>
                            Posted {time}
                        </div>
                    </Card.Footer>
                </Card>
        </div>
    )
}