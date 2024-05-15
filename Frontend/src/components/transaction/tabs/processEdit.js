import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { fetchEditIssuesByDate, fetchIssuesBasedOnDate, fetchMaxIssDate, updateIssueCopy } from '../../../api/apiRegister';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import { is, isEmptyArray } from '../../../utils';
import DataTable from '../../common/dataTable';
import { dateFormatWithYYYYMMDD } from '../../../utils/utils';

const ProcessEdit = () => {
    const [allIssues, setAllIssues] = useState([])
    const [click, setClicked] = useState(true);
    const [date, setDate] = useState('');
    const [issue, setIssue] = useState(false);
    const [columnKey, setColumnKey] = useState([]);

    const handleClick = async () => {
        const response = await fetchEditIssuesByDate({ dbName: 'MURM2425', issDate: date });
        if (response) {
            setAllIssues(response?.Items[0]);
            const key = Object.keys(response.Items[0][0]);
            setColumnKey(key);
            setClicked(true);
        }
    }

    const handleEdit = (data) => {
        setIssue(false)
        Swal.fire({
            title: "Are you sure?",
            text: "Please enter the copies count for the current date!",
            icon: "warning",
            input: 'text',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
            preConfirm: async (inputValue) => {
                if (inputValue.trim() === '') {
                    Swal.showValidationMessage('Copies cannot be empty');
                }
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const inputValue = result.value;
                setAllIssues((issues) => issues.map((is) => is.partyCode === data.partyCode ? { ...is, today: inputValue } : is));
                const response = await updateIssueCopy({ dbName: 'MURM2425', copies: inputValue, today: date, partyCode: data.partyCode });
                if (response) {
                    Swal.fire({
                        title: "Changed!",
                        text: "Issues has been updated.",
                        icon: "success"
                    });
                }
                setIssue(true)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                setIssue(false);
            }
        });

    }

    useEffect(() => {
        if (issue) {
            handleClick();
        }
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
                width: 120,
            }
        }
        ), {
            headerName: 'Edit',
            width: 150,
            renderCell: (params) => (
                <div>
                    <Button variant="info" className="mx-2" size="sm" onClick={() => handleEdit(params.row)}>Edit</Button>{'  '}
                    {/* <Button variant="danger" size="sm" onClick={() => handleDelete(params.row)}>Delete</Button> */}
                </div>
            ),
        }
        ]


    const fetchMaxDate = async () => {
        const response = await fetchMaxIssDate({ dbName: 'murm2425' });
        if (response) {
            if (response?.Items[0]) {
                setClicked(false);
                setDate(dateFormatWithYYYYMMDD(response?.Items[0][0].maxDate));
            }
        }
    }

    useEffect(() => {
        fetchMaxDate()
    }, [])

    return (
        <Container className='d-flex justify-content-center align-items-center h-100' style={{ background: !click ? '#DBDBDB' : 'none', borderRadius: 10 }} >
            {
                isEmptyArray(allIssues) ? (
                    <Card title='Process the Issue' style={{ height: '30vh', width: '30vw' }}>
                        <div className='d-flex justify-content-center p-3' style={{ fontSize: 25, fontWeight: 'bold' }} >
                            Edit the Issues
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
                                        Edit the Issues for this Date
                                    </Button>
                                </Col>
                            </Row>
                        </Row>
                    </Card>
                ) : (
                    <div className='w-100'>
                        <DataTable column={columns} row={allIssues} />
                    </div>
                )

            }
        </Container>
    )
}

export default ProcessEdit