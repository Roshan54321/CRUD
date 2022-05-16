import React, { useEffect, useRef, useState } from 'react'
import { Avatar } from '@mui/material'
import { Navbar, Container, Card, InputGroup, FormControl, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createPost } from '../../api/postsapi'
import moment from 'moment'

export default function Post(){
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user"))
    const [image, setImage] = useState("")
    let creator = ""
    const post = useRef({
        id: "",
        title: "",
        avatar: "",
        file: "", 
        message: "",
        creator: "",
        replies: [],
        likes: 0,
        loves: 0,
        createdAt: moment().format()
    })
    if(user){
        post.current = {...post.current, creator: user.username, avatar: user.avatar}
    }
    let creatorAvatar
    if(creator){
        creator = user.username
        creatorAvatar = creator.slice(0, 1)
    }

    
    useEffect(() => {
        const postSubmit = document.getElementById('postSubmit')
        const createPostForm = document.getElementById('createPost')
        const titleElement = document.getElementById('title')
        const messageElement = document.getElementById('message')
        
        postSubmit.addEventListener('click', async (e) => {
            e.preventDefault()
            const postImageElement = document.getElementById('postImage')
            let postImage = postImageElement.files[0]
            if(postImage)
            {
                postImage = await toBase64(postImage)
            }else{
                postImage = ""
            }
            
            post.current = {...post.current,
                title: titleElement.value,
                createdAt: moment().format(),
                message: messageElement.value, 
                file: postImage,
                id: Math.random(Date.now()),
            }
            dispatch(createPost(post.current))
            setImage("")
            createPostForm.reset()
        })
    }, [dispatch])

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = e => reject(e)
    })

    const loadImage = async () => {
        const imageElement = document.getElementById('postImage')
        let Image = imageElement.files[0]
        if(Image)
        {
            setImage(await toBase64(Image))
        }
    }
  return (
    <div>
        <form id = "createPost">
            <Card className="" style={{ margin: '1rem', width: '30rem', marginBottom: '2rem', border: "1px solid green"}}>
                <Card.Header style = {{ display: 'flex', alignItems : 'center' }}>
                    <Avatar alt='' src = {post.current.avatar}>{creatorAvatar}</Avatar>
                    <span style = {{marginLeft: '0.5rem'}}>You</span>
                </Card.Header>
                <Navbar variant="light" expand="lg">
                    <Container fluid>
                        <span className="text-primary fs-6">What kind of post you want to add?</span>
                        <Navbar.Toggle aria-controls="navbar-dark-example" />
                        <Navbar.Collapse id="navbar-dark-example">
                            <Card.Body>
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Control type="text" placeholder="Title" style={{width:"100%"}}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    {image?<img style={{width:"100%", height:"100%"}} alt = "" src = {image}></img>:null}
                                </Form.Group>
                                
                                <Navbar variant="light" expand="lg">
                                <Container fluid>
                                    <Navbar.Brand className="text-secondary fs-6">Add Image</Navbar.Brand>
                                    <Navbar.Toggle aria-controls="navbar-dark-example" />
                                    <Navbar.Collapse id="navbar-dark-example">
                                        <Form.Group controlId="postImage"  onChange={loadImage} className="mt-1 mb-2">
                                            <Form.Control type="file" size = 'sm' accept = ".png, .jpeg, .jpg" />
                                        </Form.Group>
                                    </Navbar.Collapse>
                                </Container>
                                </Navbar>
                            
                            </Card.Body>
                        </Navbar.Collapse>
                    </Container>
                    </Navbar>
                <Card.Footer>
                <InputGroup>
                        <FormControl id="message" as="textarea" aria-label="Comment" onChange={()=>{
                            if(document.getElementById('message').value)
                            {
                                document.getElementById('postSubmit').disabled = false
                            }else{
                                document.getElementById('postSubmit').disabled = true
                            }
                        }}/>
                        <Button id="postSubmit" type="submit" disabled>Post</Button>
                </InputGroup>
                </Card.Footer>
            </Card>
        </form>
    </div>
  )
}
