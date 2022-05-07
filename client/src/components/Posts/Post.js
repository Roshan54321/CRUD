import React from 'react'
import { Avatar } from '@material-ui/core'
import img from '../../assets/logo192.png'
import { Card } from 'react-bootstrap'

export default function Post(){
    let creator = "roshan"
    creator = creator.charAt(0).toUpperCase() + creator.slice(1)
    const creatorAvatar = creator.slice(0, 1)
  return (
    <div>
        <Card style={{ margin: '1rem', width: '18rem' }}>
            <Card.Header style = {{ display: 'flex', alignItems : 'center' }}>
                <Avatar alt='' src = {img}>{creatorAvatar}</Avatar>
                <span style = {{marginLeft: '0.5rem'}}>{creator}</span>
            </Card.Header>
            <Card.Body>
                <img src = {img}></img>
            </Card.Body>
            <Card.Footer>

            </Card.Footer>


        </Card>
    </div>
  )
}
