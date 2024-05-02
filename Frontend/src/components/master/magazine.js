import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";
import DataTable from "../common/dataTable";
import { Add, Close } from '@mui/icons-material';
import Swal from "sweetalert2";
import { createMagazine, fetchAllMagazine, updateMagazine } from "../../api/apiRegister";
import { isEmptyArray } from "../../utils";


const Magazine = () => {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const [isAdd, setIsAdd] = useState(false);

    const [allMagazine, setAllMagazine] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [issMode, setIssMode] = useState([]);
    const [issModeDate, setIssModeDate] = useState([]);
    const [selectedOption, setSelectedOption] = useState(false);
    const [isEdit, setIsEdit] = useState(false);


    const onSubmit = async (values) => {
        if (isEmptyArray(issMode)) {
            setSelectedOption(true);
            return;
        }
        if (isEmptyArray(issModeDate)) {
            setSelectedOption(true);
            return;
        }
        setSelectedOption(false);

        const data = {
            ...values,
            magIssMode: issMode[0]?.value,
            magIssDay: issModeDate[0]?.value
        }
        const response = isEdit ? await updateMagazine(data) : await createMagazine(data);
        if (response) {
            handleCancel();
        }
        console.log(values)
    }

    const fetchMagazine = async () => {
        const response = await fetchAllMagazine();
        setAllMagazine(response?.Items);
    }

    useEffect(() => {
        if (isEdit) {
            Object.keys(isEdit).forEach((key) => (setValue(key, isEdit[key])));
            setIssMode([{
                value: isEdit.magIssMode,
                label: selectingLabel(isEdit.magIssMode, false)
            }]);
            setIssModeDate([{
                value: isEdit.magIssDay,
                label: selectingLabel(isEdit.magIssDay, true)
            }])
        }
    }, [isEdit, setValue])


    useEffect(() => {
        fetchMagazine();
    }, [isAdd])

    const modeDay = [
        { value: 'SUN', label: 'Sunday' },
        { value: 'MON', label: 'Monday' },
        { value: 'TUE', label: 'Tuesday' },
        { value: 'WED', label: 'Wednesday' },
        { value: 'THR', label: 'Thursday' },
        { value: 'FRI', label: 'Friday' },
        { value: 'SAT', label: 'Saturday' }
    ];

    const mode = [
        { value: 'WE', label: 'Weekly' },
        { value: 'MN', label: 'Monthly' },
        { value: 'FN', label: 'FortNight' },
        { value: 'DN', label: 'Daily' }
    ];

    const selectingLabel = (short, day = false) => {
        let filter;
        if (day) {
            filter = modeDay.filter((mode) => mode.value === short);
        } else {
            filter = mode.filter((mode) => mode.value === short);
        }
        return filter[0].label;
    }

    const columns = [
        // { field: 'id', headerName: 'S.No.', width: 50 },
        { field: 'magId', headerName: 'Mag ID', width: 60 },
        { field: 'magName', headerName: 'Mag Name', width: 120 },
        { field: 'magShort', headerName: 'Mag Short', width: 80 },
        { field: 'unSoldRate', headerName: 'UnSold Rate', width: 100 },
        { field: 'unSoldPer', headerName: 'UnSold Per', width: 100 },
        { field: 'saleRate', headerName: 'Sale Rate', width: 80 },
        { field: 'magIssMode', headerName: 'Mag Iss Mode', width: 120 },
        { field: 'magIssDay', headerName: 'Mag Iss Day', width: 120 },
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


    const handleCancel = () => {
        setIsAdd(false);
        reset();
        setIssMode([]);
        setIssModeDate([]);
        setIsEdit(false);
    }

    const rowsWithIds = allMagazine.map((row, index) => ({
        id: index + 1,
        ...row
    }));

    return (
        <Container className="p-3">
            <Row className="mb-1 px-2">
                <Col>
                    <h3>Magazine</h3>
                </Col>
                <Col align='right'>{
                    !isAdd ? (<Button variant="primary" size="md" onClick={() => setIsAdd(!isAdd)}>
                        Add Magazine <Add style={{ marginLeft: '0.1em' }} />
                    </Button>) : (<Button variant="primary" size="md" onClick={() => handleCancel()}>
                        close<Close style={{ marginLeft: '0.1em' }} />
                    </Button>)
                }</Col>
            </Row>
            {!isAdd ? (<DataTable column={columns} row={rowsWithIds} />) : (
                <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                    <Row >
                        <Col lg={6} xl={6}>
                            <Form.Group controlId='magId' >
                                <Form.Label>Magazine ID</Form.Label>
                                <Form.Control className='login_form_group' type='text' placeholder='Enter Magazine ID' {...register('magId', { required: 'Magazine ID is required' })} />
                                {errors.magId && <Form.Text className="text-danger">{errors.magId.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={6} xl={6}>
                            <Form.Group controlId='unSoldRate' >
                                <Form.Label>UnSold Rate</Form.Label>
                                <Form.Control className='login_form_group' type='text' placeholder='Enter UnSold Rate' {...register('unSoldRate', { required: 'UnSold Rate is required' })} />
                                {errors.unsoldRate && <Form.Text className="text-danger">{errors.unsoldRate.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row >
                        <Col xl={6} lg={6}>
                            <Form.Group controlId='magName' >
                                <Form.Label>Magazine Name</Form.Label>
                                <Form.Control className='login_form_group' type='text' rows={3} placeholder='Enter Magazine Name' {...register('magName', { required: 'Magazine Name is required' })} />
                                {errors.magName && <Form.Text className="text-danger">{errors.magName.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={6} xl={6}>
                            <Form.Group controlId='unsoldPer' >
                                <Form.Label>UnSold Per</Form.Label>
                                <Form.Control className='login_form_group' type='text' placeholder='Enter UnSold Per' {...register('unSoldPer', { required: 'UnSold Per is required' })} />
                                {errors.unsoldPer && <Form.Text className="text-danger">{errors.unsoldPer.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row >
                        <Col>
                            <Form.Group controlId='magShort' >
                                <Form.Label>Magazine Short</Form.Label>
                                <Form.Control className='login_form_group' type='text' placeholder='Enter the Magazine Short' {...register('magShort', { required: 'Magazine Short is required' })} />
                                {errors.magShort && <Form.Text className="text-danger">{errors.magShort.message}</Form.Text>}
                            </Form.Group>

                        </Col>
                        <Col lg={6} xl={6}>
                            <Form.Group controlId='magazineIssCode' >
                                <Form.Label>Magazine Iss Mode</Form.Label>
                                <Select
                                    className='login_form_group'
                                    options={mode}
                                    onChange={(value) => setIssMode(value)}
                                    values={issMode ? issMode : []}
                                    placeholder="Select a Magazine Iss Mode"
                                />
                                {isEmptyArray(issMode) && selectedOption && <Form.Text className="text-danger">Please select a Magazine Iss Mode</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row >
                        <Col>
                            <Form.Group controlId='saleRate' >
                                <Form.Label>Sale Rate</Form.Label>
                                <Form.Control className='login_form_group' type='number' placeholder='Enter the Sale Rate' {...register('saleRate', { required: 'Sale Rate is required' })} />
                                {errors.saleRate && <Form.Text className="text-danger">{errors.saleRate.message}</Form.Text>}
                            </Form.Group>

                        </Col>
                        <Col lg={6} xl={6}>
                            <Form.Group controlId='magazineIssCode' >
                                <Form.Label>Magazine Iss Day</Form.Label>
                                <Select
                                    className='login_form_group'
                                    options={modeDay}
                                    onChange={(value) => setIssModeDate(value)}
                                    values={issModeDate ? issModeDate : []}
                                    placeholder="Select a Magazine Iss Date"
                                />
                                {isEmptyArray(issModeDate) && selectedOption && <Form.Text className="text-danger">Please select a Magazine Iss Date</Form.Text>}
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

export default Magazine;
