import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";

const Operator = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const [selectedOption, setSelectedOption] = useState(false);


    const onSubmit = (values) => {
        reset();
        console.log(values)
    }

    return (
        <Container>
            <Row className="mb-1 px-2"><h3>Operator</h3></Row>
            <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='code' >
                            <Form.Label>Code</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter the code' {...register('code  ', { required: 'Code is required' })} />
                            {errors.code && <Form.Text className="text-danger">{errors.code.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='name' >
                            <Form.Label>Name</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter the Name' {...register('name', { required: ' ame is required' })} />
                            {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='password' >
                            <Form.Label>Password</Form.Label>
                            <Form.Control className='login_form_group' type='password' placeholder='Enter the password' {...register('password', { required: 'Password is required' })} />
                            {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='levelNo' >
                            <Form.Label>Level No.</Form.Label>
                            <Form.Control className='login_form_group' type='text' placeholder='Enter the level No.' {...register('levelNO', { required: 'Level No. is required' })} />
                            {errors.levelNO && <Form.Text className="text-danger">{errors.levelNO.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col lg={6} xl={6}>
                        <Form.Group controlId='status' >
                            <Form.Label>Status</Form.Label>
                            <Select
                                className='login_form_group'
                                options={[
                                    { value: 'Status1', label: 'Status 1' },
                                    { value: 'Status2', label: 'Status 2' }
                                ]}
                                onChange={setStatus}
                                placeholder="Select a status"
                            />
                            {!status && selectedOption && <Form.Text className="text-danger">Please select a status</Form.Text>}
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

export default Operator;
