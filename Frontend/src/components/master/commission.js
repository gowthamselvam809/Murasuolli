import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";

const Commission = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [magazine, setMagazine] = useState(false);
    const [selectedOption, setSelectedOption] = useState(false);


    const onSubmit = (values) => {
        reset();
        console.log(values)
    }

    return (
        <Container>
            <Row className="mb-1 px-2"><h3>Commission Category</h3></Row>
            <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
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
                                options={[
                                    { value: 'option1', label: 'Option 1' },
                                    { value: 'option2', label: 'Option 2' }
                                ]}
                                onChange={setMagazine}
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

                        <Button variant='secondary' disabled={isLoading} type='submit' className='login_form_button '>
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default Commission;
