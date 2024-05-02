import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";
import { createCopyConfirm, fetchAllCommission, fetchAllCopyConfirm, fetchAllMagazine, updateCopyConfirm } from "../../api/apiRegister";
import { Add, Close } from "@mui/icons-material";
import DataTable from "../common/dataTable";
import Swal from "sweetalert2";
import { isEmptyArray } from "formik";

const CopyConfirm = () => {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [magazine, setMagazine] = useState([]);
    const [allMagazine, setAllMagazine] = useState([]);
    const [allCommission, setAllCommission] = useState([]);
    const [commission, setCommission] = useState([]);
    const [selectedOption, setSelectedOption] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [allConfirm, setAllConfirm] = useState([]);
    const [isEdit, setIsEdit] = useState(false);


    const onSubmit = async (values) => {
        if (isEmptyArray(commission)) {
            setSelectedOption(true);
            return;
        }
        if (isEmptyArray(magazine)) {
            setSelectedOption(true);
            return;
        }
        setSelectedOption(false);
        const data = {
            ...values,
            magId: magazine[0]?.value,
            commId: commission[0]?.value
        }
        const response = isEdit ? await updateCopyConfirm(data) : await createCopyConfirm(data);
        if (response) {
            handleCancel();
        }
        console.log(values)
    }

    const getMagazineLabel = (isEdit) => {
        return allMagazine.filter((mag) => mag.value === isEdit.magId)[0]?.label;
    }

    const getCommissionLabel = (isEdit) => {
        return allCommission.filter((comm) => comm.value === isEdit.commId)[0]?.label;
    }

    useEffect(() => {
        if (isEdit) {
            Object.keys(isEdit).forEach((key) => (setValue(key, isEdit[key])));
            setMagazine([{ value: isEdit.magId, label: getMagazineLabel(isEdit) }])
            setCommission([{ value: isEdit.commId, label: getCommissionLabel(isEdit) }])
        }
    }, [isEdit, setValue])

    const fetchMagazine = async () => {
        const response = await fetchAllMagazine();
        setAllMagazine(response?.Items?.map((mag) => ({ value: mag.magId, label: mag.magName })));
    }

    const fetchCommission = async () => {
        const response = await fetchAllCommission();
        setAllCommission(response?.Items.map((comm) => ({ value: comm.commId, label: comm.commName })))
    }

    const fetchConfirmData = async () => {
        const response = await fetchAllCopyConfirm();
        setAllConfirm(response?.Items);
    }

    useEffect(() => {
        fetchConfirmData();
    }, [isAdd])

    useEffect(() => {
        fetchMagazine();
        fetchCommission();
    }, [])

    const handleCancel = () => {
        setIsAdd(false);
        reset();
        setIsEdit(false);
        setMagazine([]);
        setCommission([]);
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
        { field: 'sno', headerName: 'S.No.', width: 100 },
        { field: 'partyCode', headerName: 'Party Code', width: 120 },
        { field: 'commName', headerName: 'Commission', width: 250 },
        { field: 'magName', headerName: 'Magazine', width: 200 },
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

    const rowsWithIds = allConfirm.map((row, index) => ({
        ...row,
        id: index + 1,
        magName: getMagazineLabel(row),
        commName: getCommissionLabel(row),

    }));


    return (
        <Container className="p-3">
            <Row className="mb-1 px-2">
                <Col>
                    <h3>Copies Confirmation</h3>
                </Col>
                <Col align='right'>
                    {
                        !isAdd ? (<Button variant="primary" size="md" onClick={() => setIsAdd(!isAdd)}>
                            Add Confirmation <Add style={{ marginLeft: '0.1em' }} />
                        </Button>) : (<Button variant="primary" size="md" onClick={() => handleCancel()}>
                            close<Close style={{ marginLeft: '0.1em' }} />
                        </Button>)
                    }
                </Col>
            </Row>
            {
                !isAdd ? <DataTable column={columns} row={rowsWithIds} /> : (
                    <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                        <Row className="mb-3">
                            <Col lg={12} xl={12}>
                                <Form.Group controlId='partyCode' >
                                    <Form.Label>Party Code</Form.Label>
                                    <Form.Control className='login_form_group' disabled={isEdit} type='text' placeholder='Enter Party Code' {...register('partyCode', { required: 'Party Code is required' })} />
                                    {errors.partyCode && <Form.Text className="text-danger">{errors.partyCode.message}</Form.Text>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col lg={6} xl={6}>
                                <Form.Group controlId='magazine' >
                                    <Form.Label>Magazine</Form.Label>
                                    <Select className='login_form_group'
                                        options={allMagazine}
                                        onChange={(value) => setMagazine(value)}
                                        values={magazine}
                                        placeholder="Select a State"
                                    />
                                    {isEmptyArray(magazine) && selectedOption && <Form.Text className="text-danger">Please select a magazine</Form.Text>}
                                </Form.Group>
                            </Col>
                            <Col lg={6} xl={6}>
                                <Form.Group controlId='commission' >
                                    <Form.Label>Commission</Form.Label>
                                    <Select
                                        className='login_form_group'
                                        options={allCommission}
                                        values={commission}
                                        onChange={(value) => setCommission(value)}
                                        placeholder="Select a District"
                                    />
                                    {isEmptyArray(commission) && selectedOption && <Form.Text className="text-danger">Please select a commission</Form.Text>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col lg={6} xl={6}>
                                <Form.Group controlId='copies' >
                                    <Form.Label>Copies</Form.Label>
                                    <Form.Control className='login_form_group' type='text' placeholder='Enter Number of Copies' {...register('copies', { required: 'Copies is required' })} />
                                    {errors.copies && <Form.Text className="text-danger">{errors.copies.message}</Form.Text>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row align='right' className="mt-4">
                            <Col >
                                <Button variant='primary' disabled={isLoading} type='submit' className='login_form_button mx-3'>
                                    Save
                                </Button>

                                <Button variant='secondary' disabled={isLoading} type='submit' className='login_form_button '>
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

export default CopyConfirm;
