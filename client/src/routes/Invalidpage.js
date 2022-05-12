import React from 'react'
import { Accordion, Button } from 'react-bootstrap'

export default function InvalidPage() {
    return (
        <div >
            <Accordion >
                <Accordion.Item>
                    <Accordion.Header>This site can't be reached</Accordion.Header>
                    <Accordion.Body>
                        {window.location.href}’s DNS address could not be found. Diagnosing the problem.
                        DNS_PROBE_POSSIBLE
                    </Accordion.Body>
                    <Button style={{margin:"1rem", float: "right"}} variant="secondary" onClick={() => {
                        window.location.reload()
                    }}>Reload</Button>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
