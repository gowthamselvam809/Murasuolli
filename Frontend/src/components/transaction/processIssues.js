import React from 'react'
import { Container, Tab, Tabs } from 'react-bootstrap'
import Process from './tabs/process'
import ProcessEdit from './tabs/processEdit'

const ProcessIssues = () => {
    return (
        <Container>
            <h3 className='p-3'>Transaction</h3>
            <Tabs
                defaultActiveKey="process"
                id="fill-tab"
                className=""
                fill
            >
                <Tab eventKey="process" className='process_tabs  p-3' title="Process Issues">
                    <Process />
                </Tab>
                <Tab eventKey="editProcess" className='process_tabs p-3' title="Edit Issues">
                    <ProcessEdit />
                </Tab>
            </Tabs>
        </Container>
    )
}

export default ProcessIssues