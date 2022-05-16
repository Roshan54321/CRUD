import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../api/accountapi'
import { changeAuth } from '../features/postsSlice'

export default function App() {
    const [warning, setWarning] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth"))
        if(auth){
            if(auth.auth){
                navigate('/')
            }
        }
    }, [dispatch, navigate])
    const Login = (e) => {
        e.preventDefault()
        const user = { username: document.getElementById('Username').value, password: document.getElementById('Password').value, avatar: "" }
        const data = loginUser(user)
        data.then((res) => {
            if(res.auth){
                localStorage.setItem("auth", JSON.stringify({auth: true}))
                localStorage.setItem("token", res.token)
                localStorage.setItem("user", JSON.stringify({username: res.result.username, avatar: res.result.avatar}))
                dispatch(changeAuth({auth: true}))
                navigate('/')
            }else{
                localStorage.setItem("auth", JSON.stringify({auth: false}))
                setWarning(res.message)
            }
        })
        document.getElementById('login').reset()
        document.getElementById('loginButton').disabled = true
    }

    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Communicate</h1>
            <div style={{ width: "60%", margin: "auto", marginTop: "1rem", border: "2px solid purple", padding: "15px", borderRadius: "5px", backgroundColor: "pink" }}>
                <Form id="login" onSubmit={(e) => Login(e)}>
                    <Form.Group className="mb-3" controlId="Username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Username" required />
                        <Form.Text className="text-muted">
                            We'll never share your username with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I am Ready" onChange={() => {
                            if (document.getElementById('formBasicCheckbox').checked)
                                document.getElementById('loginButton').disabled = false
                            else
                                document.getElementById('loginButton').disabled = true

                        }} />
                        <Form.Text className="text-danger fs-6" id="warning">
                            {warning}
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" id="loginButton" onClick={() => {

                    }} disabled>
                        Login
                    </Button>
                </Form>
                <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
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
