import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";

const CopyConfirm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [magazine, setMagazine] = useState(false);
    const [commission, setCommission] = useState(false);
    const [selectedOption, setSelectedOption] = useState(false);


    const onSubmit = (values) => {
        reset();
        console.log(values)
    }

    return (
        <Container>
            <Row className="mb-1 px-2"><h3>Copies Confirmation</h3></Row>
            <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                    <Col lg={12} xl={12}>
                        <Form.Group controlId='partyCode' >
                            <Form.Label>Party Code</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter Party Code' {...register('partyCode', { required: 'Party Code is required' })} />
                            {errors.partyCode && <Form.Text className="text-danger">{errors.partyCode.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='magazine' >
                            <Form.Label>Magazine</Form.Label>
                            <Select className='login_form_group'
                                options={[
                                    { value: 'option1', label: 'Option 1' },
                                    { value: 'option2', label: 'Option 2' }
                                ]}
                                onChange={setMagazine}
                                placeholder="Select a State"
                            />
                            {!magazine && selectedOption && <Form.Text className="text-danger">Please select a magazine</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='commission' >
                            <Form.Label>Commission</Form.Label>
                            <Select
                                className='login_form_group'
                                options={[
                                    { value: 'option1', label: 'Option 1' },
                                    { value: 'option2', label: 'Option 2' }
                                ]}
                                onChange={setCommission}
                                placeholder="Select a District"
                            />
                            {!commission && selectedOption && <Form.Text className="text-danger">Please select a commission</Form.Text>}
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
        </Container>
    );
};

export default CopyConfirm;
