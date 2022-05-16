import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Accordion, Button } from 'react-bootstrap'
import Header from '../components/Header'

export default function InvalidPage() {
    const [style, setStyle] = useState({})
    const navigate = useNavigate()
    const handleMode = (mode) => {
        if(mode){
          setStyle({backgroundColor:"#002221"})
        }else{
          setStyle({backgroundColor:"white"})
        }
      }
    return (
        <div>
            <Header setDarkMode={handleMode}/>
            <Accordion >
                <Accordion.Item>
                    <Accordion.Header>This site can't be reached</Accordion.Header>
                    <Accordion.Body>
                        {window.location.href}’s DNS address could not be found. Diagnosing the problem.
                        DNS_PROBE_POSSIBLE
                    </Accordion.Body>
                    <Button style={{margin:"1rem", float: "right"}} variant="secondary" onClick={() => {
                        navigate(-1)
                    }}>Go Back</Button>
                    <Button style={{margin:"1rem", float: "right"}} variant="secondary" onClick={() => {
                        navigate(0)
                    }}>Reload</Button>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
