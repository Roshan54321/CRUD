import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function App() {
    return (
        <>
        <h1 style={{textAlign:"center", marginTop:"1rem"}}>Communicate</h1>
        <div style={{width:"60%", margin: "auto", marginTop:"1rem", border:"2px solid purple", padding:"15px", borderRadius:"5px", backgroundColor:"pink"}}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Username" required/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="I am Ready" onChange={() => {
                        if(document.getElementById('formBasicCheckbox').checked)
                            document.getElementById('loginButton').disabled = false
                        else
                            document.getElementById('loginButton').disabled = true

                    }}/>
                </Form.Group>
                <Button variant="primary" type="submit" id="loginButton" onClick={() => {
                    
                }} disabled>
                    Login
                </Button>
            </Form>
                <div style={{marginTop:"1rem", display:"flex", alignItems:"center", gap:"1rem"}}>
                    <div>Create an account</div>
                    <Link to="/register"><Button variant="primary" id="registerButton" >
                            Register
                        </Button>
                    </Link>
                </div>
        </div>
        </>
    )
}
