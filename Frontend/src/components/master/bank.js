import { AddCircleOutline, Close } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";
import DataTable from "../common/dataTable";
import { addAgent, deleteAgent, fetchAllBankType, updateAgent } from "../../api/apiRegister";
import Swal from "sweetalert2";

const Bank = () => {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    const [isAdd, setIsAdd] = useState(false);
    const [allBank, setAllBank] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(false);
    const [active, setActive] = useState(false);

    const fetchBankDetails = async () => {
        const response = await fetchAllBankType();
        setAllBank(response?.Items);
    }

    useEffect(() => {
        fetchBankDetails();
    }, [isAdd])

    useEffect(() => {
        if (isEdit) {
            Object.keys(isEdit).forEach((key) => (setValue(key, isEdit[key])));
            console.log(isEdit.active)
            setActive(isEdit.active)
        }

    }, [isEdit, setValue])

    const onSubmit = async (values) => {
        const data = {
            ...values,
            active: active ? null : false,
            headType: 'B'
        }
        const response = isEdit ? await updateAgent(data) : await addAgent(data);
        if (response) {
            handleCancel();
        }
    }

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
                const response = await deleteAgent({ heada_code: data.heada_code });
                if (response) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Agent has been deleted.",
                        icon: "success"
                    });
                }
            }
            handleCancel();
        });
    }

    const columns = [
        { field: 'id', headerName: 'S.No.', width: 50 },
        { field: 'heada_code', headerName: 'Bank Code', width: 100 },
        { field: 'heada_name', headerName: 'Bank Name', width: 150 },
        { field: 'address1', headerName: 'address', width: 180 },
        { field: 'accCode', headerName: 'Account Code', width: 180 },
        { field: 'pinCode', headerName: 'Pin Code', width: 100 },

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
        setActive(false);
    }

    const rowsWithIds = allBank.map((row, index) => ({
        ...row,
        id: index + 1,
        active: row.active === null ? true : false
    }));

    return (
        <Container className="p-3">
            <Row className="mb-1 px-2">
                <Col>
                    <h3>Bank Entry</h3>
                </Col>
                <Col align='right'>{
                    !isAdd ? (<Button variant="primary" size="md" onClick={() => setIsAdd(!isAdd)}>
                        Add Bank <AddCircleOutline style={{ marginLeft: '0.1em' }} />
                    </Button>) : (<Button variant="primary" size="md" onClick={() => handleCancel()}>
                        close<Close style={{ marginLeft: '0.1em' }} />
                    </Button>)
                }</Col>
            </Row>
            {
                !isAdd ? (<DataTable column={columns} row={rowsWithIds} />) : (
                    <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col lg={6} xl={6}>
                                <Form.Group controlId='heada_code' >
                                    <Form.Label>Bank Code</Form.Label>
                                    <Form.Control className='login_form_group' disabled={isEdit} type='text' placeholder='Enter Bank Code here' {...register('heada_code', { required: 'code is required' })} />
                                    {errors.heada_code && <Form.Text className="text-danger">{errors.heada_code.message}</Form.Text>}
                                </Form.Group>
                            </Col>
                            <Col lg={6} xl={6}>
                                <Form.Group controlId='accCode' >
                                    <Form.Label>Account Code</Form.Label>
                                    <Form.Control className='login_form_group' type='text' placeholder='Enter Account Code here' {...register('accCode', { required: 'code is required' })} />
                                    {errors.accCode && <Form.Text className="text-danger">{errors.accCode.message}</Form.Text>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Form.Group controlId='heada_name' >
                                    <Form.Label>Bank Name</Form.Label>
                                    <Form.Control className='login_form_group' type='text' placeholder='Enter the Bank name' {...register('heada_name', { required: 'Bank Name is required' })} />
                                    {errors.heada_name && <Form.Text className="text-danger">{errors.heada_name.message}</Form.Text>}
                                </Form.Group>

                            </Col>
                            <Col xl={12} lg={12}>
                                <Form.Group controlId='address1' >
                                    <Form.Label>Address </Form.Label>
                                    <Form.Control className='login_form_group' as="textarea" rows={3} placeholder='Enter an Address here' {...register('address1', { required: '1 is required' })} />
                                    {errors.address1 && <Form.Text className="text-danger">{errors.address1.message}</Form.Text>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row >
                            <Col lg={6} xl={6}>
                                <Form.Group controlId='pinCode' >
                                    <Form.Label>PinCode</Form.Label>
                                    <Form.Control className='login_form_group' type='text' placeholder='Enter your pinCode here' {...register('pinCode', { required: 'pinCode is required' })} />
                                    {errors.pinCode && <Form.Text className="text-danger">{errors.pinCode.message}</Form.Text>}
                                </Form.Group>
                            </Col>
                            <Col lg={6} xl={6} className="mt-4 d-flex align-items-center">
                                <Form.Check
                                    style={{ fontSize: 20 }}
                                    type='checkbox'
                                    id={`active`}
                                    label={`Active`}
                                    onClick={() => setActive(!active)}
                                    checked={active}
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
                )
            }
        </Container>
    );
};

export default Bank;
