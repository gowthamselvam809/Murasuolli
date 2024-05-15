import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import DataTable from '../../components/common/dataTable'
import { useForm } from 'react-hook-form';
import { Add, Close } from '@mui/icons-material';

const ReceiptsPage = () => {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const [isAdd, setIsAdd] = useState(false);

    const handleCancel = () => {
        setIsAdd(false);
        reset();
    }

    return (
        <Container className="p-3">
            <Row className="mb-1 px-2">
                <Col>
                    <h3>Receipts</h3>
                </Col>
                <Col align='right'>{
                    !isAdd ? (<Button variant="primary" size="md" onClick={() => setIsAdd(!isAdd)}>
                        Add Receipts <Add style={{ marginLeft: '0.1em' }} />
                    </Button>) : (<Button variant="primary" size="md" onClick={() => handleCancel()}>
                        close<Close style={{ marginLeft: '0.1em' }} />
                    </Button>)
                }</Col>
            </Row>
            {!isAdd ? <DataTable column={[]} row={[]} /> : (
                <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col lg={12} xl={12}>
                            <Form.Group controlId='reasonId' >
                                <Form.Label>Reason Code</Form.Label>
                                <Form.Control className='login_form_group' disabled={isEdit} type='text' placeholder='Enter Reason Code' {...register('reasonId', { required: 'Reason Code is required' })} />
                                {errors.reasonId && <Form.Text className="text-danger">{errors.reasonId.message}</Form.Text>}
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

                            <Button variant='secondary' disabled={isLoading} type='button' onClick={handleCancel} className='login_form_button '>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Container>
    )
}

export default ReceiptsPage