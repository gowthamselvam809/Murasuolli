import { Add, Close } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import DataTable from "../common/dataTable";
import Swal from "sweetalert2";
import { createDistrict, fetchAllDistrict, fetchAllState, updateDistrict } from "../../api/apiRegister";
import Select from "react-dropdown-select";
import { isEmptyArray } from "formik";

const District = () => {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [allDistrict, setAllDistrict] = useState([]);
    const [allState, setAllState] = useState([]);
    const [state, setState] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedOption, setSelectedOption] = useState(false);


    const onSubmit = async (data) => {
        if (isEmptyArray(state)) {
            setSelectedOption(true);
            return;
        }
        setSelectedOption(false);
        const response = isEdit ? await updateDistrict({ ...data, stCode: state[0]?.value }) : await createDistrict({ ...data, stCode: state[0]?.value });
        if (response) {
            handleCancel();
        }
    }

    const fetchState = async () => {
        const response = await fetchAllState();
        setAllState(response?.Items?.map((state) => ({ value: state.stateCode, label: state.stateName })));
    }

    const fetchDistrict = async () => {
        const response = await fetchAllDistrict();
        setAllDistrict(response?.Items);
    }

    const getStateLabel = (isEdit) => {
        return allState.filter((state) => state.value === isEdit.stCode)[0]?.label;
    }

    useEffect(() => {
        fetchState();
    }, [])

    useEffect(() => {
        fetchDistrict();
    }, [isAdd])

    useEffect(() => {
        if (isEdit) {
            Object.keys(isEdit).forEach((key) => (setValue(key, isEdit[key])));
            setState([{ value: isEdit.stCode, label: getStateLabel(isEdit) }])

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
        { field: 'areaCode', headerName: 'District Code', width: 120 },
        { field: 'areaName', headerName: 'District Name', width: 180 },
        { field: 'stName', headerName: 'State Name', width: 150 },
        { field: 'areaSht', headerName: 'District Short', width: 150 },
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
        setState([]);
    }
    const rowsWithIds = allDistrict.map((row, index) => ({
        ...row,
        id: index + 1,
        stName: getStateLabel(row)
    }));

    return (
        <Container className="p-3">
            <Row className="mb-1 px-2">
                <Col>
                    <h3>District</h3>
                </Col>
                <Col align='right'>{
                    !isAdd ? (<Button variant="primary" size="md" onClick={() => setIsAdd(!isAdd)}>
                        Add District <Add style={{ marginLeft: '0.1em' }} />
                    </Button>) : (<Button variant="primary" size="md" onClick={() => handleCancel()}>
                        close<Close style={{ marginLeft: '0.1em' }} />
                    </Button>)
                }</Col>
            </Row>
            {!isAdd ? <DataTable column={columns} row={rowsWithIds} /> : (
                <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col lg={6} xl={6}>
                            <Form.Group controlId='state' >
                                <Form.Label>State</Form.Label>
                                <Select
                                    className='login_form_group'
                                    options={allState}
                                    values={state}
                                    onChange={(value) => setState(value)}
                                    placeholder="Select a State"
                                />
                                {isEmptyArray(state) && selectedOption && <Form.Text className="text-danger">Please select a State</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={6} xl={6}>
                            <Form.Group controlId='areaCode' >
                                <Form.Label>District Code</Form.Label>
                                <Form.Control className='login_form_group' disabled={isEdit} type='text' placeholder='Enter State Code' {...register('areaCode', { required: 'State Code is required' })} />
                                {errors.areaCode && <Form.Text className="text-danger">{errors.areaCode.message}</Form.Text>}
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row className='mt-3'>
                        <Col lg={6} xl={6} className="">
                            <Form.Group controlId='areaName' >
                                <Form.Label>District Name</Form.Label>
                                <Form.Control className='login_form_group' type='text' placeholder='Enter State Name' {...register('areaName', { required: 'State Name is required' })} />
                                {errors.areaName && <Form.Text className="text-danger">{errors.areaName.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={6} xl={6} className="">
                            <Form.Group controlId='areaSht' >
                                <Form.Label>District Short</Form.Label>
                                <Form.Control className='login_form_group' type='text' placeholder='Enter Short Name' {...register('areaSht', { required: 'District Short is required' })} />
                                {errors.areaSht && <Form.Text className="text-danger">{errors.areaSht.message}</Form.Text>}
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

export default District;
