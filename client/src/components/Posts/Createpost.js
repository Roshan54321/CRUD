import React, { useEffect, useRef } from 'react'
import { Avatar } from '@material-ui/core'
import postImage from '../../assets/logo192.png'
import { Nav, Navbar, Container, Card, InputGroup, FormControl, Form, Button } from 'react-bootstrap'
// import fileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { store } from '../../app/store'
import { createPost } from '../../api/postsapi'

export default function Post(){
    const dispatch = useDispatch(store.dispatch)
    let creator = "roshan"
    const post = useRef({
        id: "",
        title: "",
        avatar: "",
        file: "", 
        message: "",
        creator: creator,
        likes: 0,
        loves: 0,
        createdAt: new Date().toISOString().slice(0,10)
    })
    creator = creator.charAt(0).toUpperCase() + creator.slice(1)
    const creatorAvatar = creator.slice(0, 1)

    useEffect(() => {
        const postSubmit = document.getElementById('postSubmit')
        const createPostForm = document.getElementById('createPost')
        const titleElement = document.getElementById('title')
        const messageElement = document.getElementById('message')
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = e => reject(e)
        })
        
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
                createdAt: new Date().toISOString().slice(0,10),
                message: messageElement.value, 
                file: postImage,
                id: Date.now() + '' + Math.random()
            }
            createPostForm.reset()
            dispatch(createPost(post.current))
        })
    })
  return (
    <div>
        <form id = "createPost">
            <Card className="" style={{ margin: '1rem', width: '30rem', marginBottom: '2rem', border: "1px solid green"}}>
                <Card.Header style = {{ display: 'flex', alignItems : 'center' }}>
                    <Avatar alt='' src = {postImage}>{creatorAvatar}</Avatar>
                    <span style = {{marginLeft: '0.5rem'}}>You</span>
                </Card.Header>
                <Card.Body>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Control type="text" placeholder="Title"/>
                    </Form.Group>
                    
                    <Navbar variant="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="#home" className="text-secondary fs-6">Add Image</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbar-dark-example" />
                        <Navbar.Collapse id="navbar-dark-example">
                            <Form.Group controlId="postImage" className="mt-1 mb-2">
                                <Form.Control type="file" size = 'sm' accept = ".png, .jpeg, .jpg" />
                            </Form.Group>
                        </Navbar.Collapse>
                    </Container>
                    </Navbar>
                   
                </Card.Body>
                <Card.Footer>
                <InputGroup>
                        <FormControl id="message" as="textarea" aria-label="Comment" required/>
                        <Button id="postSubmit">Post</Button>
                </InputGroup>
                </Card.Footer>
            </Card>
        </form>
    </div>
  )
}