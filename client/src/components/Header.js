import React, { useState, useEffect } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'

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
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/posts">Posts</Nav.Link>
            <Nav.Link href="/Chats">Chats</Nav.Link>
            <Nav.Link href="/login" onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("auth")
              localStorage.removeItem("user")
            }}>Log Out</Nav.Link>
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