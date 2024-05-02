import { Add, Close } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import DataTable from "../common/dataTable";
import Swal from "sweetalert2";
import { createState, fetchAllState, updateState } from "../../api/apiRegister";

const States = () => {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [allStates, setAllStates] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    const onSubmit = async (data) => {
        const response = isEdit ? await updateState(data) : await createState(data);
        if (response) {
            handleCancel();
        }
    }

    const fetchState = async () => {
        const response = await fetchAllState();
        setAllStates(response?.Items);
    }

    useEffect(() => {
        fetchState();
    }, [isAdd])

    useEffect(() => {
        if (isEdit) {
            Object.keys(isEdit).forEach((key) => (setValue(key, isEdit[key])));
        }
    }, [isEdit, setValue])


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
        { field: 'stateCode', headerName: 'State Code', width: 120 },
        { field: 'stateName', headerName: 'State Name', width: 250 },
        { field: 'country', headerName: 'Country', width: 100 },
        // { field: 'pinCode', headerName: 'Pin Code', width: 100 },
        {
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <Button variant="info" className="mx-2" size="sm" onClick={() => handleEdit(params.row)}>Edit</Button>{'  '}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(params.row)}>Delete</Button>
                </div>
            ),
        },
    ];

    const handleCancel = () => {
        setIsAdd(false);
        reset();
        setIsEdit(false);
    }
    const rowsWithIds = allStates.map((row, index) => ({
        ...row,
        id: index + 1,
    }));

    return (
        <Container className="p-3">
            <Row className="mb-1 px-2">
                <Col>
                    <h3>State</h3>
                </Col>
                <Col align='right'>{
                    !isAdd ? (<Button variant="primary" size="md" onClick={() => setIsAdd(!isAdd)}>
                        Add State <Add style={{ marginLeft: '0.1em' }} />
                    </Button>) : (<Button variant="primary" size="md" onClick={() => handleCancel()}>
                        close<Close style={{ marginLeft: '0.1em' }} />
                    </Button>)
                }</Col>
            </Row>
            {!isAdd ? <DataTable column={columns} row={rowsWithIds} /> : (
                <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col lg={6} xl={6}>
                            <Form.Group controlId='stateCode' >
                                <Form.Label>State Code</Form.Label>
                                <Form.Control className='login_form_group' disabled={isEdit} type='text' placeholder='Enter State Code' {...register('stateCode', { required: 'State Code is required' })} />
                                {errors.stateCode && <Form.Text className="text-danger">{errors.stateCode.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={6} xl={6} className="">
                            <Form.Group controlId='stateName' >
                                <Form.Label>State Name</Form.Label>
                                <Form.Control className='login_form_group' type='text' placeholder='Enter State Name' {...register('stateName', { required: 'State Name is required' })} />
                                {errors.stateName && <Form.Text className="text-danger">{errors.stateName.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col lg={6} xl={6} className="">
                            <Form.Group controlId='country' >
                                <Form.Label>Country</Form.Label>
                                <Form.Control className='login_form_group' type='text' placeholder='Enter Country Name' {...register('country', { required: 'Country is required' })} />
                                {errors.country && <Form.Text className="text-danger">{errors.country.message}</Form.Text>}
                            </Form.Group>
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

export default States;
