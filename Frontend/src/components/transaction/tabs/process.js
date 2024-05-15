import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { fetchIssuesBasedOnDate, insertIssues } from '../../../api/apiRegister';
import { toast } from 'react-toastify';
import { dateFormatWithYYYYMMDD, subtractDays } from '../../../utils/utils';

const Process = () => {
    const [click, setClicked] = useState(true);
    const [date, setDate] = useState('');

    const handleClick = async () => {

        console.log(date);
        const response = await insertIssues({ dbName: 'murm2425', issDate: date });
        if (response) {
            toast.success("Process Successfully");
            setClicked(true);
        }
    }

    useEffect(() => {
        setDate(subtractDays(dateFormatWithYYYYMMDD(new Date()), 1))
        setClicked(false);
    }, [])

    // const fetchIssuesByDate = async () => {
    //     const response = await fetchIssuesBasedOnDate()
    // }

    // useEffect(() => {
    //     fetchIssuesByDate();
    // }, [])

    return (
        <Container className='d-flex justify-content-center align-items-center h-100' style={{ background: '#DBDBDB', borderRadius: 10 }} >
            <Card title='Process the Issue' style={{ height: '30vh', width: '30vw' }}>
                <div className='d-flex justify-content-center p-3' style={{ fontSize: 25, fontWeight: 'bold' }} >
                    Process the Issues
                </div>
                <Row className='px-4' align="center">
                    <Col xl={3} className='mt-1'>
                        <label>Date :</label>
                    </Col>
                    <Col xl={9}>
                        <input
                            type='date'
                            value={date}
                            onChange={(e) => {
                                // const selectedDate = e.target.value;
                                // const parts = selectedDate.split('-');
                                // const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                                setClicked(false);
                                setDate(e.target.value);
                            }}
                            style={{ width: 200, height: 35, borderRadius: 8 }}
                            className='px-2'
                        />
                    </Col>

                    <Row align='center'>
                        <Col>
                            <Button className='mt-4 py-2' onClick={handleClick} disabled={click}>
                                Process the Issues for this Date
                            </Button>
                        </Col>
                    </Row>

                </Row>
            </Card>
        </Container>
    )
}

export default Process