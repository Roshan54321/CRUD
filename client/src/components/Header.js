import React, { useState } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'

export default function Header(props) {
  const [mode, setMode] = useState({mode: 1, text: "Dark Mode"})
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
                setMode({mode: 0, text: "Light Mode"})
              }else{
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