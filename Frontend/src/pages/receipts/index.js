import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import DataTable from '../../components/common/dataTable'
import { useForm } from 'react-hook-form';
import { Add, Close } from '@mui/icons-material';
import Select from 'react-dropdown-select';
import { deleteCollection, fetchAgentForDropdown, fetchAllCollection, fetchBankForDropdown, fetchReasonForDropdown, fetchReceiptNo, fetchVoucherNo, getChallanCounterNo, insertCollection, updateCollection } from '../../api/apiRegister';
import { isEmptyArray } from 'formik';
import { GetDateYYYY_MM_DD } from '../../utils';
import { dateFormatWithYYYYMMDD } from '../../utils/utils';
import Swal from 'sweetalert2';

const ReceiptsPage = () => {
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
    const [counter, setCounter] = useState('');
    const [voucherNo, setVoucherNo] = useState('');
    const [voucherNewNo, setVoucherNewNo] = useState('');
    const [chequeMode, setChequeMode] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [ttran, setTtran] = useState('');

    // const [challan, setChallan] = useState('');
    // const [receiptNo, setReceiptNo] = useState('');
    const [selectedOption, setSelectedOption] = useState(false);

    const fetchAgent = async () => {
        const response = await fetchAgentForDropdown();
        setAllAgent(response.Items[0]);

        const res = await fetchVoucherNo();
        // console.log(res);
        setVoucherNo(res.Items[0][0].no)
        // setValue('voucherNo', res.Items[0][0].no)
        // setChallan(res.Items[0][0].voucherNo + 1 ?? 1);
    }

    const fetchBank = async () => {
        const response = await fetchBankForDropdown();
        console.log("banks", response)
        setAllBank(response.Items[0]);
        const res = await fetchReasonForDropdown();
        setAllReason(res.Items[0])
    }

    const fetchCounter = async () => {
        const response = await getChallanCounterNo();
        console.log("response--------", response)
        setValue('challanCounter', response.Items[0][0].cnt)
        setCounter(response.Items[0][0].cnt)
    }

    const fetchCollection = async () => {
        const response = await fetchAllCollection({ tranType: 'RC' });
        setAllCollection(response?.Items);
    }
    useEffect(() => { fetchCollection() }, [isEdit, isAdd]);

    useEffect(() => {
        fetchCounter();
        if (isAdd && !isEdit) {
            setValue('docNo', voucherNo)
            setValue('challanCounter', counter);
            setValue('voucherNo', allCollection.length);
        }

    }, [isAdd])

    const fetchNewVoucherNo = async () => {
        setValue('docNo', voucherNo + 1);
    }

    const fetchChallanNumber = async () => {

    }

    useEffect(() => {
        fetchCollection()
        fetchAgent();
        fetchBank();
        fetchCounter();
        fetchChallanNumber()
    }, [])


    useEffect(() => {
        if (isEdit) {
            Object.keys(isEdit).forEach((key) => {
                if (key === 'docDate' || key === "chqdate") {
                    setValue(key, dateFormatWithYYYYMMDD(new Date(isEdit[key])));
                    return;
                }
                setValue(key, isEdit[key])
            });


            setAgent([allAgent.find(agent => agent.value === isEdit.partyCode.split(" ")[0])]);
            // console.log('allAgent', [allAgent.find(agent => agent.value === isEdit.partyCode)])

            setReceived(isEdit.contraCode);
            if (isEdit?.contraCode !== 'CASH') {
                setBank([allBank.find(bank => bank.value === isEdit.bankDet)]);
                setChequeMode(isEdit?.chqmode);
                setTtran(isEdit?.ttran);
            }
            // console.log('allReason.filter(reason => reason.value === isEdit.reason)', allReason.filter(reason => reason.value === isEdit.reason), isEdit.reason, isEdit)
            setReason(allReason.filter(reason => reason.value === isEdit.reason));
            // setReason([{ value: '07', label: 'heloo' }]);

        }
    }, [isEdit, setValue])

    useEffect(() => {
        if (isAdd && !isEdit) {
            const today = new Date().toISOString().split('T')[0];
            setCurrentDate(today);
        }
        fetchCounter();
    }, [isAdd, isEdit]);

    const handleAgent = async (value) => {
        setAgent(value);
        // if (!isEdit) {
        //     const response = await fetchReceiptNo({ partyCode: value[0].value });
        //     console.log(response.Items);
        //     if (response.Items) {
        //         console.log("first agent", response.Items[0][0].receiptNo)
        //         setValue('docNo', response.Items[0][0].receiptNo + 1 ?? 1);
        //         // setReceiptNo(response.Items[0][0].receiptNo + 1 ?? 1);
        //     }
        // }

    }

    const handleCancel = () => {
        setIsAdd(false);
        setIsEdit(false);
        setAgent([]);
        setBank([]);
        setReason([]);
        setReceived('')
        setCounter('')
        setTtran('');
        setChequeMode('');
        reset();

    }

    const onSubmit = async (request) => {
        // if (isEmptyArray(reason)) {
        //     setSelectedOption(true);
        //     return;
        // }
        if (isEmptyArray(agent)) {
            setSelectedOption(true);
            return;
        }
        if (!received) {
            setSelectedOption(true);
            return;
        }
        if (isEmptyArray(bank) && received == 'BANK') {
            setSelectedOption(true);
            return;
        }
        setSelectedOption(false);
        console.log("ttran-------------------", ttran)

        const response = isEdit ? await updateCollection({
            ...request,
            bankDet: received === 'BANK' ? bank[0].value : 'By Cash',
            reason: isEmptyArray(reason) ? '' : reason[0].value,
            chqmode: chequeMode,
            ttran: ttran,
            partyCode: agent[0].value,
            contraCode: received.toUpperCase(),
        }) : await insertCollection({
            ...request,
            bankDet: received === 'BANK' ? bank[0].value : 'By Cash',
            chqmode: chequeMode,
            ttran: ttran,
            reason: isEmptyArray(reason) ? '' : reason[0].value,
            partyCode: agent[0].value,
            contraCode: received.toUpperCase(),
            tranType: 'RC'
        })

        if (response) {
            setIsAdd(false);
            reset();
            setIsEdit(false);
        }

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
                const response = await deleteCollection(data);
                if (response) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Agent has been deleted.",
                        icon: "success"
                    });
                }
            }
            handleCancel();
        });
    }


    const handleRadioChange = (event) => {
        setReceived(event.target.value);
    };

    const handleRadioChequeModeChange = (event) => {
        setChequeMode(event.target.value);
    };

    const handleRadioTtranChange = (event) => {
        setTtran(event.target.value);
    };

    const handleEdit = (isEdit) => {
        setIsEdit(isEdit);
        setIsAdd(true);
    }

    // const handleDelete = (data) => {
    //     setIsView(true);
    //     setIsAdd(false);
    // }

    const handleInput = (event) => {
        const { value } = event.target;
        if (/[^0-9]/.test(value)) {
            event.target.value = value.replace(/[^0-9]/g, '');
        }
    };


    const columns = [
        // { field: 'id', headerName: 'S.No.', width: 100, renderCell: (params) => params.row.id },
        { field: 'id', headerName: 'S.No.', width: 60 },
        { field: 'date', headerName: 'Receipt Date', width: 120 },
        { field: 'partyCode', headerName: 'Agent Code', width: 340 },
        { field: 'docNo', headerName: 'Receipt No', width: 100 },
        { field: 'dues', headerName: 'Dues', width: 100 },
        { field: 'deposit', headerName: 'Deposit', width: 100 },
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
            {!isAdd ? <DataTable column={columns} row={allCollection} /> : (
                <Form className='login_form p-2' onSubmit={handleSubmit(onSubmit)}>
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
                    <Row className="mb-3">
                        <Col lg={3} xl={3}>
                            <Form.Group controlId='docDate' >
                                <Form.Label>Receipt Date</Form.Label>
                                <Form.Control className='login_form_group' disabled={isEdit}
                                    defaultValue={currentDate}
                                    type='date' placeholder='Enter Receipt Date' {...register('docDate', { required: 'Receipt Date is required' })} />
                                {errors.docDate && <Form.Text className="text-danger">{errors.docDate.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={2} xl={2}>
                            <Form.Group controlId='docNo' >
                                <Form.Label>Challan No.</Form.Label>
                                <Form.Control className='login_form_group' disabled={true} style={{ background: '#E6CDCD' }} type='text' placeholder='Receipt Number' {...register('docNo', { required: 'Receipt Number is required' })} />
                                {errors.docNo && <Form.Text className="text-danger">{errors.docNo.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={2} xl={2}>
                            <Form.Group controlId='voucherNo' >
                                <Form.Label>Receipt No.</Form.Label>
                                <Form.Control className='login_form_group' disabled={true} style={{ background: '#E6CDCD' }} type='text' placeholder='Enter Reason Code' {...register('voucherNo', { required: 'Reason Code is required' })} />
                                {errors.voucherNo && <Form.Text className="text-danger">{errors.voucherNo.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={2} xl={2}>
                            <Form.Group controlId='voucherNo' >
                                <Form.Label></Form.Label>
                                <button className='btn btn-primary' onClick={fetchNewVoucherNo} type='button'>New Challan No.</button>
                                {errors.voucherNo && <Form.Text className="text-danger">{errors.voucherNo.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={3} xl={3}>
                            <Form.Group controlId='challanCounter' >
                                <Form.Label>Challan Counter</Form.Label>
                                <Form.Control className='login_form_group' disabled={true} style={{ background: '#E6CDCD' }} type='text' placeholder='Enter Reason Code' {...register('challanCounter', { required: false })} />
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
                                    disabled={isEdit}
                                    placeholder="Select a Agent"
                                />
                                {!selectedOption && isEmptyArray(agent) && <Form.Text className="text-danger">Please select a partyCode</Form.Text>}
                            </Form.Group>
                        </Col>
                        {received === 'BANK' && (
                            <>
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
                                </Col>
                                <Row className='mt-4'>
                                    <Col lg={2} xl={2}>
                                        <Form.Label>chequeMode:</Form.Label>
                                    </Col>
                                    <Col lg={4} xl={4}>
                                        <Form.Check
                                            inline
                                            type='radio'
                                            id='Cheque'
                                            name='chequeMode'
                                            value='CH'
                                            label='Cheque'
                                            checked={chequeMode === 'CH'}
                                            onChange={handleRadioChequeModeChange}
                                            className='mr-4'
                                        />

                                        <Form.Check
                                            inline
                                            type='radio'
                                            id='DD'
                                            name='chequeMode'
                                            value='DD'
                                            label='DD'
                                            checked={chequeMode === 'DD'}
                                            onChange={handleRadioChequeModeChange}
                                        />
                                    </Col>
                                    {!chequeMode && selectedOption && <Form.Text className="text-danger">Please select a Cheque Mode</Form.Text>}

                                    <Col lg={2} xl={2}>
                                        <Form.Label>Trans Type:</Form.Label>
                                    </Col>
                                    <Col lg={4} xl={4}>
                                        <Form.Check
                                            inline
                                            type='radio'
                                            id='D'
                                            name='ttran'
                                            value='D'
                                            label='Local'
                                            checked={ttran === 'D'}
                                            onChange={handleRadioTtranChange}
                                            className='mr-4'
                                        />

                                        <Form.Check
                                            inline
                                            type='radio'
                                            id='A'
                                            name='ttran'
                                            value='A'
                                            label='Our Station'
                                            checked={ttran === 'A'}
                                            onChange={handleRadioTtranChange}
                                        />
                                        <Form.Check
                                            inline
                                            type='radio'
                                            id='C'
                                            name='ttran'
                                            value='C'
                                            label='Our Bank'
                                            checked={ttran === 'C'}
                                            onChange={handleRadioTtranChange}
                                        />
                                    </Col>
                                    {!ttran && selectedOption && <Form.Text className="text-danger">Please select a received</Form.Text>}

                                    <Col lg={4} xl={4}>
                                        <Form.Group controlId='chqdate' >
                                            <Form.Label>Cheque Date</Form.Label>
                                            <Form.Control className='login_form_group'
                                                defaultValue={currentDate}
                                                type='date' placeholder='Enter Cheque Date' {...register('chqdate', { required: 'Cheque Date is required' })} />
                                            {errors.chqdate && <Form.Text className="text-danger">{errors.chqdate.message}</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} xl={4} >
                                        <Form.Group controlId='chqno' >
                                            <Form.Label>cheque no / DD </Form.Label>
                                            <Form.Control className='login_form_group'
                                                onInput={handleInput}
                                                type='text' placeholder='Enter Dues' {...register('chqno', {
                                                    required: 'chqno is required', pattern: {
                                                        value: /^[0-9]+$/,
                                                        message: 'Only numbers are allowed'
                                                    }
                                                })} />
                                            {errors.chqno && <Form.Text className="text-danger">{errors.chqno.message}</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} xl={4} >
                                        <Form.Group controlId='remark2' >
                                            <Form.Label>Bank Details </Form.Label>
                                            <Form.Control className='login_form_group'
                                                type='text' placeholder='Enter Bank Details' {...register('remark2', {
                                                    required: 'Bank Details is required'
                                                })} />
                                            {errors.remark2 && <Form.Text className="text-danger">{errors.remark2.message}</Form.Text>}
                                        </Form.Group>
                                    </Col>

                                </Row>
                                {/* <Row className='mt-4'>
                                    <Col lg={2} xl={2}>
                                        <Form.Label>Trans Type:</Form.Label>
                                    </Col>
                                    <Col lg={4} xl={4}>
                                        <Form.Check
                                            inline
                                            type='radio'
                                            id='Cheque'
                                            name='chequeMode'
                                            value='cheque'
                                            label='Cheque'
                                            checked={ttran === 'cheque'}
                                            onChange={handleRadioChequeModeChange}
                                            className='mr-4'
                                        />

                                        <Form.Check
                                            inline
                                            type='radio'
                                            id='DD'
                                            name='chequeMode'
                                            value='DD'
                                            label='DD'
                                            checked={ttran === 'DD'}
                                            onChange={handleRadioChequeModeChange}
                                        />
                                        <Form.Check
                                            inline
                                            type='radio'
                                            id='DD'
                                            name='chequeMode'
                                            value='DD'
                                            label='DD'
                                            checked={ttran === 'DD'}
                                            onChange={handleRadioChequeModeChange}
                                        />
                                    </Col>
                                    {!chequeDate && selectedOption && <Form.Text className="text-danger">Please select a received</Form.Text>}

                                </Row> */}
                            </>
                        )}
                    </Row>
                    <Row className='mt-4'>
                        <Col lg={2} xl={2}>
                            <Form.Label>Received :</Form.Label>
                        </Col>
                        <Col lg={4} xl={4}>
                            <Form.Check
                                inline
                                type='radio'
                                id='Cash'
                                name='received'
                                value='CASH'
                                label='Cash'
                                checked={received === 'CASH'}
                                onChange={handleRadioChange}
                                className='mr-4'
                            />

                            <Form.Check
                                inline
                                type='radio'
                                id='Bank'
                                name='received'
                                value='BANK'
                                label='Bank'
                                checked={received === 'BANK'}
                                onChange={handleRadioChange}
                            />
                        </Col>
                        {!received && selectedOption && <Form.Text className="text-danger">Please select a received</Form.Text>}


                    </Row>
                    <Row className='mt-2'>
                        <Col lg={6} xl={6} >
                            <Form.Group controlId='dues' >
                                <Form.Label>Dues</Form.Label>
                                <Form.Control className='login_form_group'
                                    onInput={handleInput}
                                    type='text' placeholder='Enter Dues' {...register('dues', {
                                        required: 'Dues is required', pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'Only numbers are allowed'
                                        }
                                    })} />
                                {errors.dues && <Form.Text className="text-danger">{errors.dues.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col lg={6} xl={6} >
                            <Form.Group controlId='deposit' >
                                <Form.Label>Deposit</Form.Label>
                                <Form.Control className='login_form_group'
                                    onInput={handleInput}
                                    type='text' placeholder='Enter Deposit' {...register('deposit', {
                                        required: 'Deposit is required', pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'Only numbers are allowed'
                                        }
                                    })} />
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
                                    placeholder="Select a Remarks"
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

export default ReceiptsPage