import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { registerUser, authUser } from '../api/accountapi'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

export default function App() {
    const [warning, setWarning] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(authUser())
    }, [dispatch])
    
    const info = useSelector(state => state.posts, shallowEqual)
    if(info){
        if(info.auth){
            navigate('/')
        }
    }

    const Register = (e) => {
        e.preventDefault()
        const user = { username: document.getElementById('Username').value, password: document.getElementById('Password').value, avatar: "" }
        const data = registerUser(user)
        data.then((res) => {
            if(res.status === "success"){
                navigate('/')
            }
            setWarning(res.message)
        })
        document.getElementById('register').reset()
        document.getElementById('registerButton').disabled = true
    }

    return (
        <>
        <h1 style={{textAlign:"center", marginTop:"1rem"}}>Communicate</h1>
        <div  style={{width:"60%", margin: "auto", marginTop:"1rem", border:"2px solid purple", padding:"15px", borderRadius:"5px", backgroundColor:"pink"}}>
            <Form id="register" onSubmit={(e)=> Register(e)}>
                <Form.Group className="mb-3" controlId="Username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Username" required/>
                    <Form.Text className="text-muted">
                        We'll never share your username with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="I am Ready" onChange={() => {
                        if(document.getElementById('formBasicCheckbox').checked)
                            document.getElementById('registerButton').disabled = false
                         else
                            document.getElementById('registerButton').disabled = true

                    }}/>
                    <Form.Text className="text-danger fs-6" id="warning">
                        {warning}
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" id="registerButton" disabled>
                    Register
                </Button>
                </Form>
                <div style={{marginTop:"1rem", display:"flex", alignItems:"center", gap:"0.5rem"}}>
                    <div>Already have an account?</div>
                    <Link to="/login"><Button variant="primary" id="registerButton" >
                        Login
                        </Button>
                    </Link>
                </div>
            </div>    
        </>
    )
}
