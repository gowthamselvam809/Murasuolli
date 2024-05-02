import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-dropdown-select";
import Swal from "sweetalert2";
import { Add, Close } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import DataTable from "../common/dataTable";
import { addAgent, deleteAgent, fetchAllAgent, fetchAllDistrict, fetchAllState, updateAgent } from "../../api/apiRegister";
import { isEmptyArray } from "formik";

const AgentCreation = () => {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    const [allAgent, setAllAgent] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allDistrict, setAllDistrict] = useState([]);
    const [filterDistrict, setFilterDistrict] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [state, setState] = useState([]);
    const [district, setDistrict] = useState([]);
    const [agentType, setAgentType] = useState([]);
    const [selectedOption, setSelectedOption] = useState(false);


    const fetchAgent = async () => {
        const response = await fetchAllAgent();
        setAllAgent(response?.Items)
    }

    const fetchState = async () => {
        const response = await fetchAllState();
        setAllState(response?.Items);
    }

    const fetchDistrict = async () => {
        const response = await fetchAllDistrict();
        setAllDistrict(response?.Items);
    }

    useEffect(() => {
        fetchAgent();
    }, [isEdit, isAdd])

    useEffect(() => {
        fetchState();
        fetchDistrict();
    }, [])

    useEffect(() => {
        if (isEdit) {
            Object.keys(isEdit).forEach((key) => {
                if (key === "address1") {
                    let fullAddress = isEdit[key];
                    if (isEdit["address2"]) {
                        fullAddress += "\n" + isEdit["address2"];
                    }
                    if (isEdit["address3"]) {
                        fullAddress += "\n" + isEdit["address3"];
                    }
                    if (isEdit["address4"]) {
                        fullAddress += "\n" + isEdit["address4"];
                    }
                    setValue(key, fullAddress);
                } else {
                    setValue(key, isEdit[key]);
                }
            });

            // setDistrict(isEdit.districtCode);
            setState([{
                value: isEdit.state,
                label: isEdit.city
            }]);
            setDistrict([{
                value: isEdit.districtCode,
                label: isEdit.place
            }])
            setAgentType([{
                value: isEdit.headType,
                label: isEdit.headType === "M" ? "Management" : "S" ? "Subagent" : "Bank"
            }])
        }
    }, [isEdit, setValue])


    const onSubmit = async (values) => {
        if (isEmptyArray(state)) {
            setSelectedOption(true);
            return;
        }
        if (isEmptyArray(district)) {
            setSelectedOption(true);
            return;
        }
        if (isEmptyArray(agentType)) {
            setSelectedOption(true);
            return;
        }
        setSelectedOption(false);
        let states = allState.filter((st) => st.stateCode === state[0].value);
        console.log(states)
        const data = {
            ...values,
            city: states[0].stateName,
            state: state[0].value,
            operCode: states[0].operCode,
            districtCode: district[0].value,
            place: district[0].label,
            headType: agentType[0].value
        };

        console.log(data)

        const response = isEdit ? await updateAgent(data) : await addAgent(data);
        if (response) {
            handleCancel();
        }
    }

    const handleCancel = () => {
        reset();
        setIsAdd(false);
        setAgentType([]);
        setDistrict([]);
        setState([]);
        setIsEdit(false);
        setFilterDistrict([]);
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
        // { field: 'id', headerName: 'S.No.', width: 100, renderCell: (params) => params.row.id },
        { field: 'id', headerName: 'S.No.', width: 100 },
        { field: 'heada_code', headerName: 'Agent Code', width: 120 },
        { field: 'heada_name', headerName: 'Agent Name', width: 200 },
        { field: 'city', headerName: 'City', width: 200 },
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

    const filteredDistrict = (value) => {
        const filtered = allDistrict?.filter((dis) => {
            return dis.stCode === value
        });
        setFilterDistrict(filtered || []);
    }

    const rowsWithIds = allAgent.map((row, index) => ({
        heada_code: row.heada_code,
        id: index + 1,
        heada_name: row.heada_name,
        city: row.city,
        pinCode: row.pinCode

    }));

    return (
        <Container className="p-3">
            <Row className="mb-1 px-2">
                <Col>
                    <h3>Agent Creation</h3>
                </Col>
                <Col align='right'>

                    {
                        !isAdd ? (<Button variant="primary" size="md" onClick={() => setIsAdd(!isAdd)}>
                            Add Agent <Add style={{ marginLeft: '0.1em' }} />
                        </Button>) : (<Button variant="primary" size="md" onClick={() => handleCancel()}>
                            close<Close style={{ marginLeft: '0.1em' }} />
                        </Button>)
                    }
                </Col>
            </Row>
            {!isAdd ?
                <DataTable column={columns} row={rowsWithIds} />
                :
                <>
                    <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                        <Row >
                            <Col lg={6} xl={6}>
                                <Form.Group controlId='state' >
                                    <Form.Label>State</Form.Label>
                                    <Select className='login_form_group'
                                        options={allState?.map((state, i) => (
                                            { value: state.stateCode, label: state.stateName }
                                        ))}
                                        values={state ? [...state] : []}
                                        onChange={(value) => { setState(value); filteredDistrict(value[0].value) }}
                                        placeholder="Select a State"
                                    />
                                    {isEmptyArray(state) && selectedOption && <Form.Text className="text-danger">Please select a state</Form.Text>}
                                </Form.Group>
                            </Col>
                            <Col lg={6} xl={6}>
                                <Form.Group controlId='formBasicPassword' >
                                    <Form.Label>District</Form.Label>
                                    <Select
                                        className='login_form_group'
                                        options={filterDistrict?.map((state, i) => (
                                            { value: state.areaCode, label: state.areaName }
                                        ))}
                                        values={district ? [...district] : []}
                                        onChange={(value) => { console.log(value); setDistrict(value) }}
                                        placeholder="Select a District"
                                    />
                                    {isEmptyArray(district) && selectedOption && <Form.Text className="text-danger">Please select a district</Form.Text>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row >
                            <Col lg={6} xl={6}>
                                <Form.Group controlId='heada_name' >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control className='login_form_group' type='text' placeholder='Enter your name here' {...register('heada_name', { required: 'Name is required' })} />
                                    {errors.heada_name && <Form.Text className="text-danger">{errors.heada_name.message}</Form.Text>}
                                </Form.Group>

                            </Col>
                            <Col lg={6} xl={6}>
                                <Form.Group controlId='heada_code' >
                                    <Form.Label>Code</Form.Label>
                                    <Form.Control className='login_form_group' disabled={isEdit} type='text' placeholder='Enter Code here' {...register('heada_code', { required: 'code is required' })} />
                                    {errors.heada_code && <Form.Text className="text-danger">{errors.heada_code.message}</Form.Text>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row >
                            <Col >
                                <Form.Group controlId='address' >
                                    <Form.Label>Address </Form.Label>
                                    <Form.Control className='' as="textarea" rows={3} placeholder='Enter an Address here' {...register('address1', { required: 'Address is required' })} />
                                    {errors.address1 && <Form.Text className="text-danger">{errors.address1.message}</Form.Text>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row >
                            <Col lg={6} xl={6}>
                                <Form.Group controlId='place' >
                                    <Form.Label>Place</Form.Label>
                                    <Form.Control className='login_form_group' type='text' placeholder='Enter your place here' {...register('place', { required: 'place is required' })} />
                                    {errors.place && <Form.Text className="text-danger">{errors.place.message}</Form.Text>}
                                </Form.Group>
                            </Col>
                            <Col lg={6} xl={6}>
                                <Form.Group controlId='pinCode' >
                                    <Form.Label>PinCode</Form.Label>
                                    <Form.Control className='login_form_group' type='text' placeholder='Enter your pinCode here' {...register('pinCode', { required: 'pinCode is required' })} />
                                    {errors.pinCode && <Form.Text className="text-danger">{errors.pinCode.message}</Form.Text>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row >
                            <Col lg={6} xl={6}>
                                <Form.Group controlId='phone1' >
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control className='login_form_group' type='text' placeholder='Enter your phone here' {...register('phone1', { required: 'phone is required' })} />
                                    {errors.phone1 && <Form.Text className="text-danger">{errors.phone1.message}</Form.Text>}
                                </Form.Group>
                            </Col>
                            <Col lg={6} xl={6}>
                                <Form.Group controlId='agentType' >
                                    <Form.Label>Agent Type</Form.Label>
                                    <Select
                                        className='login_form_group'
                                        options={[
                                            { value: 'M', label: 'Management' },
                                            { value: 'S', label: 'Subagent' }
                                        ]}
                                        values={agentType ? [...agentType] : []}
                                        onChange={(value) => setAgentType(value)}
                                        placeholder="Select a Agent Type"
                                    />
                                    {isEmptyArray(agentType) && selectedOption && <Form.Text className="text-danger">Please select a type</Form.Text>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row align='right' className="mt-4">
                            <Col >
                                <Button variant='primary' disabled={isLoading} type='submit' className='login_form_button mx-3'>
                                    Save
                                </Button>
                                <Button variant='secondary' onClick={() => { handleCancel() }} disabled={isLoading} type='button' className='login_form_button '>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </>

            }

        </Container>
    );
};

export default AgentCreation;
