import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";

const AgentCreation = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState(null);
    const [district, setDistrict] = useState(null);
    const [agentType, setAgentType] = useState(null);
    const [selectedOption, setSelectedOption] = useState(false);


    const onSubmit = (values) => {
        reset();
        console.log(values)
    }

    const handleClick = () => {

    }
    return (
        <Container>
            <Row className="mb-1 px-2"><h3>Agent Creation</h3></Row>
            <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                <Row >
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='state' >
                            <Form.Label>State</Form.Label>
                            <Select className='login_form_group'
                                options={[
                                    { value: 'option1', label: 'Option 1' },
                                    { value: 'option2', label: 'Option 2' }
                                ]}
                                onChange={setState}
                                placeholder="Select a State"
                            />
                            {!state && selectedOption && <Form.Text className="text-danger">Please select a state</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='formBasicPassword' >
                            <Form.Label>District</Form.Label>
                            <Select
                                className='login_form_group'
                                options={[
                                    { value: 'option1', label: 'Option 1' },
                                    { value: 'option2', label: 'Option 2' }
                                ]}
                                onChange={setDistrict}
                                placeholder="Select a District"
                            />
                            {!district && selectedOption && <Form.Text className="text-danger">Please select a district</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='name' >
                            <Form.Label>Name</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter your name here' {...register('name', { required: 'Name is required' })} />
                            {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
                        </Form.Group>

                    </Col>
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='code' >
                            <Form.Label>Code</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter Code here' {...register('code', { required: 'code is required' })} />
                            {errors.code && <Form.Text className="text-danger">{errors.code.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col >
                        <Form.Group controlId='address' >
                            <Form.Label>Address </Form.Label>
                            <Form.Control className='login_form_group' as="textarea" rows={2} placeholder='Enter an Address here' {...register('address', { required: 'Address is required' })} />
                            {errors.address && <Form.Text className="text-danger">{errors.address.message}</Form.Text>}
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
                        <Form.Group controlId='phone' >
                            <Form.Label>Phone</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter your phone here' {...register('phone', { required: 'phone is required' })} />
                            {errors.phone && <Form.Text className="text-danger">{errors.phone.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='agentType' >
                            <Form.Label>Agent Type</Form.Label>
                            <Select
                                className='login_form_group'
                                options={[
                                    { value: 'option1', label: 'Option 1' },
                                    { value: 'option2', label: 'Option 2' }
                                ]}
                                onChange={setAgentType}
                                placeholder="Select a Agent Type"
                            />
                            {!agentType && selectedOption && <Form.Text className="text-danger">Please select a type</Form.Text>}
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

export default AgentCreation;
