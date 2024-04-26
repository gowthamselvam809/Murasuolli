import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";

const Magazine = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [issMode, setIssMode] = useState(null);
    const [issModeDate, setIssModeDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState(false);


    const onSubmit = (values) => {
        reset();
        console.log(values)
    }

    const handleClick = () => {

    }

    return (
        <Container>
            <Row className="mb-1 px-2"><h3>Magazine</h3></Row>
            <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                <Row >
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='magazineId' >
                            <Form.Label>Magazine ID</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter Magazine ID' {...register('magazineId', { required: 'Magazine ID is required' })} />
                            {errors.magazineId && <Form.Text className="text-danger">{errors.magazineId.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='unsoldRate' >
                            <Form.Label>UnSold Rate</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter UnSold Rate' {...register('unsoldRate', { required: 'UnSold Rate is required' })} />
                            {errors.unsoldRate && <Form.Text className="text-danger">{errors.unsoldRate.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col xl={6} lg={6}>
                        <Form.Group controlId='magazineName' >
                            <Form.Label>Magazine Name</Form.Label>
                            <Form.Control className='login_form_group' type='text' rows={3} placeholder='Enter Magazine Name' {...register('magazineName', { required: 'Magazine Name is required' })} />
                            {errors.magazineName && <Form.Text className="text-danger">{errors.magazineName.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='unsoldPer' >
                            <Form.Label>UnSold Per</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter UnSold Per' {...register('unsoldPer', { required: 'UnSold Per is required' })} />
                            {errors.unsoldPer && <Form.Text className="text-danger">{errors.unsoldPer.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <Form.Group controlId='magazineShort' >
                            <Form.Label>Magazine Short</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter the Magazine Short' {...register('magazineShort', { required: 'Magazine Short is required' })} />
                            {errors.magazineShort && <Form.Text className="text-danger">{errors.magazineShort.message}</Form.Text>}
                        </Form.Group>

                    </Col>
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='magazineIssCode' >
                            <Form.Label>Magazine Iss Mode</Form.Label>
                            <Select
                                className='login_form_group'
                                options={[
                                    { value: 'WE', label: 'Weekly' },
                                    { value: 'MN', label: 'Monthly' },
                                    { value: 'FN', label: 'FortNight' },
                                    { value: 'DN', label: 'Daily' }
                                ]}
                                onChange={setIssMode}
                                placeholder="Select a Magazine Iss Mode"
                            />
                            {!issMode && selectedOption && <Form.Text className="text-danger">Please select a Magazine Iss Mode</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <Form.Group controlId='saleRate' >
                            <Form.Label>Sale Rate</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter the Sale Rate' {...register('saleRate', { required: 'Sale Rate is required' })} />
                            {errors.saleRate && <Form.Text className="text-danger">{errors.saleRate.message}</Form.Text>}
                        </Form.Group>

                    </Col>
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='magazineIssCode' >
                            <Form.Label>Magazine Iss Date</Form.Label>
                            <Select
                                className='login_form_group'
                                options={[
                                    { value: 'SUN', label: 'Sunday' },
                                    { value: 'MON', label: 'Monday' },
                                    { value: 'TUE', label: 'Tuesday' },
                                    { value: 'WED', label: 'Wednesday' },
                                    { value: 'THR', label: 'Thursday' },
                                    { value: 'FRI', label: 'Friday' },
                                    { value: 'SAT', label: 'Saturday' }
                                ]}
                                onChange={setIssModeDate}
                                placeholder="Select a Magazine Iss Date"
                            />
                            {!issModeDate && selectedOption && <Form.Text className="text-danger">Please select a Magazine Iss Date</Form.Text>}
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
        </Container>
    );
};

export default Magazine;
