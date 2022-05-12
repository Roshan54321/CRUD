import React from 'react'
import { Card, CloseButton } from 'react-bootstrap'

export default function Loading() {
    return (
        <div>
            <Card style={{ margin: '1rem', width: '30rem' }}>
                <Card.Header style={{display:"flex", gap:"3rem", alignItems:"center"}}>
                    <div className='skeleton skeleton-circle'></div>
                    <div className='skeleton skeleton-text'></div>
                    <CloseButton style={{float:"right"}} disabled/>
                </Card.Header>

                <Card.Body>
                    <div className='skeleton' style={{width:"100%", height:"10rem"}}></div>
                </Card.Body>
                <Card.Body className="border">
                    <div className='skeleton skeleton-text'></div>
                    <div className='skeleton skeleton-text'></div>
                </Card.Body>

                <Card.Footer>
                    <div className='skeleton skeleton-text'></div>
                    <div className='skeleton skeleton-text'></div>
                    <div className='skeleton skeleton-text'></div>
                </Card.Footer>
            </Card>

        </div>
    )
}



