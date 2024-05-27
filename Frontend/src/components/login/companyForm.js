import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage, isEmptyArray } from "formik";
import { useNavigate } from "react-router-dom";
import { SessionStorageKeys, SignupFormSchema, labels } from "../../helper";
import { pageRoutes } from "../../helper";
import { fetchAllCompanies, fetchAllFinancialYear, fetchAllOperator, userLogin } from "../../api/apiRegister";
import { SessionStorage } from "../../utils";
import Select from "react-dropdown-select";
import { toast } from "react-toastify";
// import { SocialLoginPage } from "./SocialLoginPage";

const CompanyForm = ({ setIsCompanySelected, setOperator }) => {
    const [company, setCompany] = useState([]);
    const [financial, setFinancial] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState([]);
    const [selectedFinancial, setSelectedFinancial] = useState([]);

    const initialValues = {
        company: "efds",
        financial: "sdf",
    };

    const handleSubmit1 = async () => {
        if (isEmptyArray(selectedCompany) || isEmptyArray(selectedFinancial)) {
            toast.error('Please select the company and financial Year...');
            return;
        }
        const response = await fetchAllOperator();
        setOperator(response?.Items);
        setIsCompanySelected(true)
    }

    const fetchCompany = async () => {
        const response = await fetchAllCompanies();
        setCompany(response?.Items);
    }
    useEffect(() => {
        fetchCompany()
    }, [])


    return (
        <div className="formik-conatiner login">
            <label className="label">{labels.LOG_IN}</label>
            <Formik
                initialValues={initialValues}
                validationSchema={SignupFormSchema}
            // onSubmit={handleSubmit}
            >
                {({ errors, handleSubmit }) => (
                    <form className="formik-form" >
                        <div className="formik-group">
                            <label className="formik-label">Company</label>
                            {/* <Field name="email" type="email" className={`form-field ${errors.email ? "error" : ""}`} placeholder={labels.EMAIL} /> */}
                            <Select
                                name="Company"
                                className='form-field'
                                options={company}
                                // values={state}
                                onChange={async (value) => {
                                    setSelectedCompany(value);
                                    console.log(value[0].value)
                                    sessionStorage.setItem('prefix', value[0].value);
                                    const response = await fetchAllFinancialYear();
                                    if (response) {
                                        setFinancial(response?.Items);
                                    }
                                }}
                                placeholder="Select a Company"
                            />
                            <ErrorMessage className="error-field" name="Company" component="label" />
                        </div>
                        <div className="formik-group">
                            <label className="formik-label">Financial</label>
                            <Select
                                name="Financial"
                                className='form-field'
                                options={financial}
                                // values={state}
                                // dropdownPosition="top"
                                dropdownHeight="200px"
                                onChange={(value) => {
                                    setSelectedFinancial(value);
                                    console.log(value[0].value)
                                    sessionStorage.setItem('financialDB', value[0].value);

                                }}
                                placeholder="Select a Financial"

                            />
                        </div>
                        <button className="submit-btn" onClick={handleSubmit1} type="button">
                            {labels.SUBMIT}
                        </button>
                        {/* <SocialLoginPage /> */}
                    </form>
                )}
            </Formik>
        </div>
    );

}
export { CompanyForm };