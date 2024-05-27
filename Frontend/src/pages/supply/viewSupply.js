import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import { is, isEmptyArray } from '../../utils';
import { dateFormatWithYYYYMMDD } from '../../utils/utils';
import { Close } from '@mui/icons-material';
import { getLastDayOfMonth } from '../../utils/utils';
import Loader from '../../components/common/Loader';
import DataTable from '../../components/common/dataTable';
import { viewSupply } from '../../api/apiRegister';


const SupplyView = () => {
    const [allIssues, setAllIssues] = useState([])
    const [click, setClicked] = useState(false);
    const [date, setDate] = useState('');
    const [issue, setIssue] = useState(false);
    const [loading, setLoading] = useState(false);
    const [columnKey, setColumnKey] = useState([]);

    const handleClick = async () => {
        setLoading(true);
        const response = await viewSupply({ date: date });
        if (response) {
            setAllIssues(response?.Items[0]);
            const key = Object.keys(response.Items[0][0]);
            setColumnKey(key);
            setClicked(true);
        }
        setLoading(false);

    }

    useEffect(() => {
        if (issue) {
            handleClick();
        }
        setDate(dateFormatWithYYYYMMDD(getLastDayOfMonth(new Date())));
    }, [issue]);

    const columns =
        [...columnKey?.map((key, index) => {
            if (key === 'id') {
                return {
                    field: key,
                    headerName: 'S.No',
                    width: 80,
                }
            }
            return {
                field: key,
                headerName: key,
                width: 80,
            }
        }
        )
        ]


    return (
        <Container className='d-flex justify-content-center align-items-center h-100' style={{ background: !click ? '#DBDBDB' : 'none', borderRadius: 10, position: 'relative' }} >
            {
                isEmptyArray(allIssues) ? (
                    <Card title='Process the Issue' style={{ height: '30vh', width: '30vw' }}>
                        <div className='d-flex justify-content-center p-3' style={{ fontSize: 25, fontWeight: 'bold' }} >
                            View Supply
                        </div>
                        <Row className='px-4' align="center">
                            <Col xl={3} className='mt-1'>
                                <label>Date :</label>
                            </Col>
                            <Col xl={9}>
                                <input
                                    type='date'
                                    onChange={(e) => {
                                        // const selectedDate = e.target.value;
                                        // const parts = selectedDate.split('-');
                                        // const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                                        setClicked(false);
                                        setDate(e.target.value);
                                    }}
                                    value={date}
                                    style={{ width: 200, height: 35, borderRadius: 8 }}
                                    className='px-2'
                                />
                            </Col>
                            <Row align='center'>
                                <Col>
                                    <Button className='mt-4 py-2' onClick={handleClick} disabled={click}>
                                        View Supply for this Date
                                    </Button>
                                </Col>
                            </Row>
                        </Row>
                    </Card>
                ) : (
                    <div className='w-100'>
                        <Row className="mb-1 px-2">
                            <Col>
                                <h3>View Supply</h3>
                            </Col>
                            <Col align='right'><Button variant="primary" size="md" onClick={() => { setClicked(false); setAllIssues([]) }}>
                                close<Close style={{ marginLeft: '0.1em' }} />
                            </Button>
                            </Col>
                        </Row>
                        <DataTable column={columns} row={allIssues} />
                    </div>
                )

            }
            {loading && (<Loader loading={loading} />)}
        </Container>
    )
}

export default SupplyView