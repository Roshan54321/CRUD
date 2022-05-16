import React, { useState, useEffect } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function Header(props) {
  const localMode = JSON.parse(localStorage.getItem("mode"))
  const [mode, setMode] = useState(localMode || {mode: 1, text: "Dark Mode"})
  useEffect(() => {
    props.setDarkMode(!mode.mode)
  }, [])
  
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">Communicate</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link style ={{margin: ".3rem", textDecoration:"none", fontSize:"1.1rem"}} to="/">Home</Link>
            <Link style ={{margin: ".3rem", textDecoration:"none", fontSize:"1.1rem"}} to="/posts">Posts</Link>
            <Link style ={{margin: ".3rem", textDecoration:"none", fontSize:"1.1rem"}} to="/Chats">Chats</Link>
            <Link style ={{margin: ".3rem", textDecoration:"none", fontSize:"1.1rem"}} to="/login" onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("auth")
              localStorage.removeItem("user")
            }}>Log Out</Link>
            <Button id="darkMode" onClick={() => {
              if(mode.mode){
                localStorage.setItem("mode", JSON.stringify({mode: 0, text: "Light Mode"}))
                setMode({mode: 0, text: "Light Mode"})
              }else{
                localStorage.setItem("mode", JSON.stringify({mode: 1, text: "Dark Mode"}))
                setMode({mode: 1, text: "Dark Mode"})
              }
              props.setDarkMode(mode.mode)
            }}>{mode.text}</Button>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}