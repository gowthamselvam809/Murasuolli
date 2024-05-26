import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import DataTable from '../../components/common/dataTable'
import { useForm } from 'react-hook-form';
import { Add, Close } from '@mui/icons-material';
import Select from 'react-dropdown-select';
import { fetchAgentForDropdown, fetchAllCollection, fetchBankForDropdown, fetchEntryNo, fetchReasonForDropdown, fetchReceiptNo, fetchVoucherNo, insertCollection, updateCollection } from '../../api/apiRegister';
import { isEmptyArray } from 'formik';
import { dateFormatWithYYYYMMDD } from '../../utils/utils';

const DebitPage = () => {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const [isAdd, setIsAdd] = useState(false);
    const [received, setReceived] = useState('');
    const [allCollection, setAllCollection] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [allAgent, setAllAgent] = useState([]);
    const [allBank, setAllBank] = useState([]);
    const [allReason, setAllReason] = useState([]);
    const [reason, setReason] = useState([]);
    const [agent, setAgent] = useState([]);
    const [bank, setBank] = useState([]);
    // const [challan, setChallan] = useState('');
    // const [receiptNo, setReceiptNo] = useState('');
    const [selectedOption, setSelectedOption] = useState(false);

    const fetchAgent = async () => {
        const response = await fetchAgentForDropdown();
        setAllAgent(response.Items[0]);

        const res = await fetchEntryNo({ tranType: 'CN' });
        console.log(res);
        setValue('voucherNo', res.Items[0][0].voucherNo + 1 ?? 1)
        // setChallan(res.Items[0][0].voucherNo + 1 ?? 1);
    }

    const fetchBank = async () => {
        // const response = await fetchBankForDropdown();
        // console.log("banks", response)
        // setAllBank(response.Items[0]);
        const res = await fetchReasonForDropdown();
        setAllReason(res.Items[0])
    }

    const fetchCollection = async () => {
        const response = await fetchAllCollection({ tranType: 'DN' });
        setAllCollection(response?.Items);
    }
    useEffect(() => { fetchCollection() }, [isEdit]);

    useEffect(() => {
        if (isAdd && !isEdit) {
            setValue('voucherNo', allCollection?.length)
        }

    }, [isAdd])

    useEffect(() => {
        fetchCollection()
        fetchAgent();
        fetchBank();

    }, [])


    useEffect(() => {
        if (isEdit) {
            Object.keys(isEdit).forEach((key) => {
                // if (key === 'docDate') {
                //     setValue(key, dateFormatWithYYYYMMDD(new Date(isEdit[key])));
                //     return;
                // }
                setValue(key, isEdit[key])
            });

            // setAgent([allAgent.find(agent => agent.value === isEdit.partyCode)]);
            // console.log('allAgent', [allAgent.find(agent => agent.value === isEdit.partyCode)])

            // setReceived(isEdit.contraCode);
            // if (isEdit?.contraCode !== 'CASH') {
            //     setBank([allBank.find(bank => bank.value === isEdit.bankDet)])
            // }
            // console.log('allReason.filter(reason => reason.value === isEdit.reason)', allReason.filter(reason => reason.value === isEdit.reason), isEdit.reason, isEdit)
            // setReason(allReason.filter(reason => reason.value === isEdit.reason));
            // setReason([{ value: '07', label: 'heloo' }]);

        }
    }, [isEdit, setValue])

    const handleAgent = async (value) => {
        setAgent(value);
        const response = await await fetchEntryNo({ tranType: 'CN', partyCode: value[0].value });
        console.log(response.Items);
        if (response.Items) {
            console.log("first agent", response?.Items[0][0].receiptNo)
            setValue('docNo', response?.Items[0][0].receiptNo + 1 ?? 1);
            // setReceiptNo(response.Items[0][0].receiptNo + 1 ?? 1);
        }

    }

    const handleCancel = () => {
        setIsAdd(false);
        setIsEdit(false);
        reset();
    }

    const onSubmit = async (request) => {
        // if (isEmptyArray(reason)) {
        //     setSelectedOption(true);
        //     return;
        // }
        // if (isEmptyArray(agent)) {
        //     setSelectedOption(true);
        //     return;
        // }
        // if (!received) {
        //     setSelectedOption(true);
        //     return;
        // }
        // if (isEmptyArray(bank) && received == 'BANK') {
        //     setSelectedOption(true);
        //     return;
        // }
        // setSelectedOption(false);

        const response = isEdit ? await updateCollection({
            ...request,
            bankDet: received === 'BANK' ? bank[0].value : 'By Cash',
            reason: isEmptyArray(reason) ? '' : reason[0].value,
            partyCode: agent[0].value,
            contraCode: received.toUpperCase(),
        }) : await insertCollection({
            ...request,
            bankDet: received === 'BANK' ? bank[0].value : 'By Cash',
            reason: isEmptyArray(reason) ? '' : reason[0].value,
            partyCode: agent[0].value,
            contraCode: received.toUpperCase(),
            tranType: 'CN'
        })

        if (response) {
            setIsAdd(false);
            reset();
            setIsEdit(false);
        }

    }

    const handleEdit = (isEdit) => {
        setIsEdit(isEdit);
        setIsAdd(true);
    }

    // const handleDelete = (data) => { 
    //     setIsView(true);
    //     setIsAdd(false);
    // }


    const columns = [
        // { field: 'id', headerName: 'S.No.', width: 100, renderCell: (params) => params.row.id },
        { field: 'id', headerName: 'S.No.', width: 100 },
        { field: 'partyCode', headerName: 'Agent Code', width: 120 },
        { field: 'docNo', headerName: 'Receipt No', width: 200 },
        { field: 'dues', headerName: 'Dues', width: 200 },
        { field: 'amount', headerName: 'Amount', width: 100 },
        {
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <Button variant="info" className="mx-2" size="sm" onClick={() => handleEdit(params.row)}>Edit</Button>{'  '}
                    {/* <Button variant="danger" size="sm" onClick={() => handleDelete(params.row)}>View</Button> */}
                </div>
            ),
        },
    ];

    return (
        <Container className="p-3">
            <Row className="mb-1 px-2">
                <Col>
                    <h3>Debit Entry</h3>
                </Col>
                <Col align='right'>{
                    !isAdd ? (<Button variant="primary" size="md" onClick={() => setIsAdd(!isAdd)}>
                        Add Debit <Add style={{ marginLeft: '0.1em' }} />
                    </Button>) : (<Button variant="primary" size="md" onClick={() => handleCancel()}>
                        close<Close style={{ marginLeft: '0.1em' }} />
                    </Button>)
                }</Col>
            </Row>
            {!isAdd ? <DataTable column={columns} row={allCollection} /> : (
                <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        {/* <Col xl={3} className='mt-1'>
                            <label>Receipt Date</label>
                        </Col>
                        <Col xl={9}>
                            <input
                                type='date'

                                // value={date}
                                // onChange={(e) => {
                                //     setClicked(false);
                                //     setDate(e.target.value);
                                // }}
                                className='login_form_group px-2'
                            />
                        </Col> */}
                        <Col lg={4} xl={4}>
                            <Form.Group controlId='docDate' >
                                <Form.Label>Receipt Date</Form.Label>
                                <Form.Control className='login_form_group' disabled={isEdit} type='date' placeholder='Enter Reason Code' {...register('docDate', { required: 'Reason Code is required' })} />
                                {errors.docDate && <Form.Text className="text-danger">{errors.docDate.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={4} xl={4}>
                            <Form.Group controlId='docNo' >
                                <Form.Label>Receipt No.</Form.Label>
                                <Form.Control className='login_form_group' disabled={true} style={{ background: '#E6CDCD' }} type='text' placeholder='Enter Reason Name' {...register('docNo', { required: 'Reason Name is required' })} />
                                {errors.docNo && <Form.Text className="text-danger">{errors.docNo.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={4} xl={4}>
                            <Form.Group controlId='voucherNo' >
                                <Form.Label>Challan No.</Form.Label>
                                <Form.Control className='login_form_group' disabled={true} style={{ background: '#E6CDCD' }} type='text' placeholder='Enter Reason Code' {...register('voucherNo', { required: 'Reason Code is required' })} />
                                {errors.voucherNo && <Form.Text className="text-danger">{errors.voucherNo.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col lg={6} xl={6}>
                            <Form.Group controlId='partyCode' >
                                <Form.Label>Agent</Form.Label>
                                <Select
                                    className='login_form_group'
                                    options={allAgent}
                                    onChange={(value) => handleAgent(value)}
                                    values={agent}
                                    placeholder="Select a Agent"
                                />
                                {!selectedOption && isEmptyArray(agent) && <Form.Text className="text-danger">Please select a partyCode</Form.Text>}
                            </Form.Group>
                        </Col>
                        {received === 'BANK' && (
                            <Col lg={6} xl={6}>
                                <Form.Group controlId='contraCode' >
                                    <Form.Label>Bank</Form.Label>
                                    <Select
                                        className='login_form_group'
                                        options={allBank}
                                        values={bank}
                                        onChange={(value) => { setBank(value) }}
                                        placeholder="Select a Bank"
                                    />
                                    {isEmptyArray(bank) && selectedOption && <Form.Text className="text-danger">Please select a status</Form.Text>}
                                </Form.Group>
                            </Col>)}
                    </Row>
                    <Row className='mt-2'>
                        <Col lg={6} xl={6} >
                            <Form.Group controlId='dues' >
                                <Form.Label>Dues</Form.Label>
                                <Form.Control className='login_form_group' type='text' placeholder='Enter Reason Name' {...register('dues', { required: 'Reason Name is required' })} />
                                {errors.dues && <Form.Text className="text-danger">{errors.dues.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={6} xl={6} >
                            <Form.Group controlId='deposit' >
                                <Form.Label>Deposit</Form.Label>
                                <Form.Control className='login_form_group' type='text' placeholder='Enter Reason Name' {...register('deposit', { required: 'Reason Name is required' })} />
                                {errors.deposit && <Form.Text className="text-danger">{errors.deposit.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col lg={6} xl={6}>
                            <Form.Group controlId='reasonName' >
                                <Form.Label>Remarks</Form.Label>
                                <Select
                                    className='login_form_group'
                                    options={allReason}
                                    dropdownPosition='top'
                                    values={reason}
                                    onChange={(value) => setReason(value)}
                                    placeholder="Select a Bank"
                                />
                                {errors.reasonName && <Form.Text className="text-danger">{errors.reasonName.message}</Form.Text>}
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
    )
}

export default DebitPage