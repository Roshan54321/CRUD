import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'

export default function Header() {
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">Communicate</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Posts">Posts</Nav.Link>
            <Nav.Link href="/Chats">Chats</Nav.Link>
            <Nav.Link href="/login">Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}