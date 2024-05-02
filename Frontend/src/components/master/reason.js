import { Add, Close } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import DataTable from "../common/dataTable";
import Swal from "sweetalert2";
import { createReason, fetchAllReason, updateReason } from "../../api/apiRegister";

const Reason = () => {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [allReason, setAllReason] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [deposit, setDeposit] = useState('');

    const onSubmit = async (values) => {
        const data = {
            ...values,
            depositTrf: deposit === "Yes" ? 'Y' : 'N',
        }
        const response = isEdit ? await updateReason(data) : await createReason(data);
        if (response) {
            handleCancel();
        }
        console.log(values)
    }

    const fetchReason = async () => {
        const response = await fetchAllReason();
        setAllReason(response?.Items);
    }

    useEffect(() => {
        fetchReason();
    }, [isAdd])

    useEffect(() => {
        if (isEdit) {
            Object.keys(isEdit).forEach((key) => (setValue(key, isEdit[key])));
            setDeposit(isEdit.depositTrf === 'Y' ? "Yes" : "No")
        }
    }, [isEdit, setValue])


    const handleRadioChange = (event) => {
        setDeposit(event.target.value);
    };

    const handleEdit = (data) => {
        setIsEdit(data);
        setIsAdd(!isAdd);
    }

    const handleDelete = async (data) => {
        setIsEdit(data);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // const response = await deleteAgent({ heada_code: data.heada_code });
                // if (response) {
                //     Swal.fire({
                //         title: "Deleted!",
                //         text: "Agent has been deleted.",
                //         icon: "success"
                //     });
                // }
            }
            handleCancel();
        });
    }

    const columns = [
        { field: 'id', headerName: 'S.No.', width: 100 },
        { field: 'reasonId', headerName: 'Reason ID', width: 120 },
        { field: 'reasonName', headerName: 'Reason Name', width: 250 },
        { field: 'depositTrf', headerName: 'Deposited', width: 100 },
        // { field: 'pinCode', headerName: 'Pin Code', width: 100 },
        {
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <Button variant="info" className="mx-2" size="sm" onClick={() => handleEdit(params.row)}>Edit</Button>{'  '}
                    {/* <Button variant="danger" size="sm" onClick={() => handleDelete(params.row)}>Delete</Button> */}
                </div>
            ),
        },
    ];

    const rowsWithIds = allReason.map((row, index) => ({
        ...row,
        id: index + 1,
        depositTrf: row.depositTrf === 'Y' ? "Yes" : "No"
    }));

    const handleCancel = () => {
        setIsAdd(false);
        reset();
        setIsEdit(false);
        setDeposit('')
    }


    return (
        <Container className="p-3">
            <Row className="mb-1 px-2">
                <Col>
                    <h3>Reason Entry</h3>
                </Col>
                <Col align='right'>{
                    !isAdd ? (<Button variant="primary" size="md" onClick={() => setIsAdd(!isAdd)}>
                        Add Reason <Add style={{ marginLeft: '0.1em' }} />
                    </Button>) : (<Button variant="primary" size="md" onClick={() => handleCancel()}>
                        close<Close style={{ marginLeft: '0.1em' }} />
                    </Button>)
                }</Col>
            </Row>
            {!isAdd ? <DataTable column={columns} row={rowsWithIds} /> : (
                <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col lg={12} xl={12}>
                            <Form.Group controlId='reasonId' >
                                <Form.Label>Reason Code</Form.Label>
                                <Form.Control className='login_form_group' disabled={isEdit} type='text' placeholder='Enter Reason Code' {...register('reasonId', { required: 'Reason Code is required' })} />
                                {errors.reasonId && <Form.Text className="text-danger">{errors.reasonId.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={12} xl={12} className="mt-3">
                            <Form.Group controlId='reasonName' >
                                <Form.Label>Reason Name</Form.Label>
                                <Form.Control className='login_form_group' type='text' placeholder='Enter Reason Name' {...register('reasonName', { required: 'Reason Name is required' })} />
                                {errors.reasonName && <Form.Text className="text-danger">{errors.reasonName.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col lg={4} xl={4}>
                            <Form.Label>Deposit Transfer :</Form.Label>
                        </Col>
                        <Col lg={8} xl={8}>
                            <Form.Check
                                inline
                                type='radio'
                                id='yes'
                                name='deposit'
                                value='Yes'
                                label='Yes'
                                checked={deposit === 'Yes'}
                                onChange={handleRadioChange}
                                className='mr-4'
                            />

                            <Form.Check
                                inline
                                type='radio'
                                id='no'
                                name='deposit'
                                value='No'
                                label='No'
                                checked={deposit === 'No'}
                                onChange={handleRadioChange}
                            />
                        </Col>
                    </Row>

                    <Row align='right' className="mt-4">
                        <Col >
                            <Button variant='primary' disabled={isLoading} type='submit' className='login_form_button mx-3'>
                                Save
                            </Button>

                            <Button variant='secondary' disabled={isLoading} type='button' onClick={handleCancel} className='login_form_button '>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )}

        </Container>
    );
};

export default Reason;
