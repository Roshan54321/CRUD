import React, { useEffect, useState } from 'react'
import { Form, Button, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../api/accountapi'
import { useDispatch } from 'react-redux'
import { Avatar } from '@material-ui/core'

export default function App() {
    const [avatar, setAvatar] = useState("")
    const [warning, setWarning] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth"))
        console.log(auth)
        if(auth !== null){
            if(auth.auth){
                navigate('/')
            }
        }
    }, [dispatch, navigate])


    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = e => reject(e)
    })

    const loadAvatar = async () => {
        const avatarElement = document.getElementById('avatar')
        let avatarImage = avatarElement.files[0]
        if(avatarImage)
        {
            setAvatar(await toBase64(avatarImage))
        }
    }
    
    const Register = async (e) => {
        e.preventDefault()
        const user = { id: (Date.now() + '' + Math.random()), username: document.getElementById('Username').value, password: document.getElementById('Password').value, avatar: avatar }
        const data = registerUser(user)
        data.then((res) => {
            if (res.status === "success") {
                navigate('/')
            }
            setWarning(res.message)
        })
        document.getElementById('register').reset()
        document.getElementById('registerButton').disabled = true
    }

    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Communicate</h1>
            <div style={{ width: "60%", margin: "auto", marginTop: "1rem", border: "2px solid purple", padding: "15px", borderRadius: "5px", backgroundColor: "pink" }}>
                <Form id="register" onSubmit={(e) => Register(e)}>
                    <Carousel controls={false} variant="dark">
                        <Carousel.Item style={{ marginBottom: "3rem"}} >
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
                                        document.getElementById('registerButton').disabled = false
                                    else
                                        document.getElementById('registerButton').disabled = true

                                }} />
                                <Form.Text className="text-danger fs-6" id="warning">
                                    {warning}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit" id="registerButton" disabled>
                                Register
                            </Button>
                        </Carousel.Item>


                        <Carousel.Item style={{ marginBottom: "4rem"}}>
                        <Avatar style={{margin:"auto"}} alt='' src = {avatar}>A</Avatar>
                            <Form.Text className="fs-6">Add an avatar</Form.Text>
                            <Form.Group controlId="avatar" className="mt-1 mb-2">
                                <Form.Control onChange={loadAvatar} type="file" size='sm' accept=".png, .jpeg, .jpg" />
                            </Form.Group>
                        </Carousel.Item>
                    </Carousel>
                </Form>

                <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
