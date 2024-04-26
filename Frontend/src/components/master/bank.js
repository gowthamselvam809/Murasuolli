import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";

const Bank = () => {
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
            <Row className="mb-1 px-2"><h3>Bank Entry</h3></Row>
            <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                <Row >
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='bankCode' >
                            <Form.Label>Bank Code</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter Bank Code here' {...register('bankCode', { required: 'code is required' })} />
                            {errors.bankCode && <Form.Text className="text-danger">{errors.bankCode.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='accountCode' >
                            <Form.Label>Account Code</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter Account Code here' {...register('accountCode', { required: 'code is required' })} />
                            {errors.accountCode && <Form.Text className="text-danger">{errors.accountCode.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <Form.Group controlId='bankName' >
                            <Form.Label>Bank Name</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter the Bank name' {...register('bankName', { required: 'Bank Name is required' })} />
                            {errors.bankName && <Form.Text className="text-danger">{errors.bankName.message}</Form.Text>}
                        </Form.Group>

                    </Col>
                    <Col xl={12} lg={12}>
                        <Form.Group controlId='address' >
                            <Form.Label>Address </Form.Label>
                            <Form.Control className='login_form_group' as="textarea" rows={3} placeholder='Enter an Address here' {...register('address', { required: 'Address is required' })} />
                            {errors.address && <Form.Text className="text-danger">{errors.address.message}</Form.Text>}
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
                        />
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

export default Bank;
