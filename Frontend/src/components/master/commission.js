import { Add, Close } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";
import DataTable from "../common/dataTable";
import Swal from "sweetalert2";
import { createCommission, fetchAllCommission, fetchAllMagazine, updateCommission } from "../../api/apiRegister";
import { isEmptyArray } from "formik";

const Commission = () => {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [allMagazine, setAllMagazine] = useState([]);
    const [allCommission, setAllCommission] = useState([]);
    const [magazine, setMagazine] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedOption, setSelectedOption] = useState(false);


    const onSubmit = async (values) => {
        if (isEmptyArray(magazine)) {
            setSelectedOption(true);
            return;
        }
        setSelectedOption(false);

        const data = {
            ...values,
            magId: magazine[0]?.value,
        }

        const response = isEdit ? await updateCommission(data) : await createCommission(data);
        if (response) {
            handleCancel();
        }
        console.log(values)
    }

    const getMagazineLabel = (isEdit) => {
        return allMagazine.filter((mag) => mag.value === isEdit.magId)[0]?.label;
    }

    const handleEdit = (data) => {
        setIsEdit(data);
        setIsAdd(!isAdd);
    }

    const fetchMagazine = async () => {
        const response = await fetchAllMagazine();
        setAllMagazine(response?.Items?.map((mag) => ({ value: mag.magId, label: mag.magName })));
    }

    const fetchData = async () => {
        const response = await fetchAllCommission();
        setAllCommission(response?.Items);
    }

    useEffect(() => {
        fetchData();
    }, [isAdd])

    useEffect(() => {
        fetchMagazine();
    }, [])

    useEffect(() => {
        if (isEdit) {
            Object.keys(isEdit).forEach((key) => (setValue(key, isEdit[key])));
            setMagazine([{ value: isEdit.magId, label: getMagazineLabel(isEdit) }])
        }
    }, [isEdit, setValue])

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
        { field: 'commId', headerName: 'Comm ID', width: 120 },
        { field: 'commName', headerName: 'Comm Name', width: 120 },
        { field: 'commShort', headerName: 'Comm Short', width: 120 },
        { field: 'magName', headerName: 'Mag Name', width: 100 },
        { field: 'commPer', headerName: 'Comm Per', width: 100 },
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
        setMagazine([]);
    }

    const rowsWithIds = allCommission.map((row, index) => ({
        ...row,
        magName: getMagazineLabel(row),
    }));

    return (
        <Container className="p-3">
            <Row className="mb-1 px-2">
                <Col>
                    <h3>Commission Category</h3>
                </Col>
                <Col align='right'>
                    {
                        !isAdd ? (<Button variant="primary" size="md" onClick={() => setIsAdd(!isAdd)}>
                            Add Commission <Add style={{ marginLeft: '0.1em' }} />
                        </Button>) : (<Button variant="primary" size="md" onClick={() => handleCancel()}>
                            close<Close style={{ marginLeft: '0.1em' }} />
                        </Button>)
                    }
                </Col>
            </Row>

            {
                !isAdd ? <DataTable column={columns} row={rowsWithIds} /> : <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col lg={6} xl={6}>
                            <Form.Group controlId='commId' >
                                <Form.Label>Commission ID</Form.Label>
                                <Form.Control className='login_form_group' type='text' placeholder='Enter Commission ID' {...register('commId', { required: 'Commission ID is required' })} />
                                {errors.commId && <Form.Text className="text-danger">{errors.commId.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={6} xl={6}>
                            <Form.Group controlId='commName' >
                                <Form.Label>Commission Name</Form.Label>
                                <Form.Control className='login_form_group' type='text' placeholder='Enter Commission Name' {...register('commName', { required: 'Commission Name is required' })} />
                                {errors.commName && <Form.Text className="text-danger">{errors.commName.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={6} xl={6}>
                            <Form.Group controlId='commShort' >
                                <Form.Label>Commission Short</Form.Label>
                                <Form.Control className='login_form_group' type='text' placeholder='Enter Commission Short' {...register('commShort', { required: 'Commission Name is required' })} />
                                {errors.commShort && <Form.Text className="text-danger">{errors.commShort.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={6} xl={6}>
                            <Form.Group controlId='magazine' >
                                <Form.Label>Magazine</Form.Label>
                                <Select
                                    className='login_form_group'
                                    options={allMagazine}
                                    values={magazine}
                                    onChange={(value) => setMagazine(value)}
                                    placeholder="Select a District"
                                />
                                {!magazine && selectedOption && <Form.Text className="text-danger">Please select a magazine</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={6} xl={6}>
                            <Form.Group controlId='commPer' >
                                <Form.Label>Commission Per</Form.Label>
                                <Form.Control className='login_form_group' type='text' placeholder='Enter Commission Per' {...register('commPer', { required: 'Comm Per is required' })} />
                                {errors.commPer && <Form.Text className="text-danger">{errors.commPer.message}</Form.Text>}
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
            }

        </Container>
    );
};

export default Commission;
