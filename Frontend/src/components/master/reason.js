import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Reason = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [deposit, setDeposit] = useState('');

    const onSubmit = (values) => {
        reset();
        console.log(values)
    }


    const handleRadioChange = (event) => {
        setDeposit(event.target.value);
    };

    return (
        <Container>
            <Row className="mb-1 px-2"><h3>Reason Entry</h3></Row>
            <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                    <Col lg={12} xl={12}>
                        <Form.Group controlId='reasonCode' >
                            <Form.Label>Reason Code</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter Reason Code' {...register('reasonCode', { required: 'Reason Code is required' })} />
                            {errors.reasonCode && <Form.Text className="text-danger">{errors.reasonCode.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col lg={12} xl={12} className="mt-3">
                        <Form.Group controlId='reasonName' >
                            <Form.Label>Reason Name</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter Reason Name' {...register('reasonName', { required: 'Reason Name is required' })} />
                            {errors.reasonName && <Form.Text className="text-danger">{errors.reasonName.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col lg={4} xl={4}>
                        <Form.Label>Deposit Transfer :</Form.Label>
                    </Col>
                    <Col lg={8} xl={8}>
                        <Form.Check
                            inline
                            type='radio'
                            id='yes'
                            name='deposit'
                            value='Yes'
                            label='Yes'
                            checked={deposit === 'Yes'}
                            onChange={handleRadioChange}
                            className='mr-4'
                        />

                        <Form.Check
                            inline
                            type='radio'
                            id='no'
                            name='deposit'
                            value='No'
                            label='No'
                            checked={deposit === 'No'}
                            onChange={handleRadioChange}
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

export default Reason;
