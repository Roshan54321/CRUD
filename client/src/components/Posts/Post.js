import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import like from '../../assets/like.png'
import love from '../../assets/love.png'
import { Tooltip, OverlayTrigger, Card, InputGroup, FormControl, Form, Button, CloseButton } from 'react-bootstrap'
import { IconButton } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../api/postsapi'

export default function Post(props){
    const [post, setPost] = useState(props.post)
    const dispatch = useDispatch()
    useEffect(() => {
    })
    const likeButton = () => {
        const likeButtonElement = document.getElementById('likeButtonElement')
        if(!likeButtonElement.disabled)
        {
            likeButtonElement.disabled = true
            likeButtonElement.disabledRipple = true
            setPost({...post, likes: post.likes+1})
        }
        else{
            likeButtonElement.disabled = false
            likeButtonElement.disabledRipple = false
            setPost({...post, likes: post.likes-1})
            
        }
    }
    
    const loveButton = () => {
        const loveButtonElement = document.getElementById('loveButtonElement')
        if(!loveButtonElement.disabled)
        {
            loveButtonElement.disabled = true
            loveButtonElement.disabledRipple = true
            setPost({...post, loves: post.loves+1})
        }
        else{
            loveButtonElement.disabled = false
            loveButtonElement.disabledRipple = false
            setPost({...post, loves: post.loves-1})
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
    const creator = post.creator.toUpperCase().slice(0,1)+ post.creator.slice(1)
    const creatorAvatar = creator.slice(0, 1)
  return (
    <div>
        <Card style={{ margin: '1rem', width: '30rem' }}>
            <Card.Header>
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}>
                    <CloseButton style={{float:"right"}}  onClick={hidePost} className='fo'/>
                </OverlayTrigger>
                <div  style = {{ display: 'flex', alignItems : 'center' }}>
                    <Avatar alt='' src = {post.avatar}>{creatorAvatar}</Avatar>
                    <span style = {{marginLeft: '0.5rem'}}>{creator}</span>
                </div>
                {post.title?<Card.Title className = "text-center mt-1 fs-6">{post.title}</Card.Title>:null}
            </Card.Header>
            {post.file?
            <Card.Body>
                <img alt = '' style = {{width:"100%", height:"100%"}} src = {post.file}></img>
            </Card.Body>
            : null
            }
            {post.message?
                <Card.Body className = "border">
                    <Card.Subtitle className="text-danger fs-6">{post.message}</Card.Subtitle>
                </Card.Body>
            : null
            }
            <Card.Footer>
                <div style = {{ display: 'flex' }}>
                    <div><IconButton id = 'likeButtonElement' onClick={likeButton}><img alt = '' style = {{ height: '2rem'}} src = {like}></img></IconButton>{post.likes}</div>
                    <div><IconButton id = 'loveButtonElement' onClick={loveButton}><img alt = '' style = {{ height: '2rem'}} src = {love}></img></IconButton>{post.loves}</div>
                </div>
                <Form action = 'postComment'>
                    <InputGroup>
                        <InputGroup.Text>Comment</InputGroup.Text>
                        <FormControl id="comment" as="textarea" aria-label="Comment" onChange={()=>{
                            if(document.getElementById('comment').value)
                            {
                                document.getElementById('post').disabled = false
                            }else{
                                document.getElementById('post').disabled = true
                            }}
                        }/>
                        <Button type='submit' id="post" disabled>Send</Button>
                    </InputGroup>
                </Form>
                <div style = {{ margin: '0.5rem' }}>
                    Posted at: {post.createdAt}
                </div>
            </Card.Footer>


        </Card>
    </div>
  )
}
