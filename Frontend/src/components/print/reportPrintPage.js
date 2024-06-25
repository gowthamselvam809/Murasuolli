import React, { useEffect, useState } from 'react';
import { fetchReportsForPrint } from '../../api/apiRegister';
import { GetDateYYYY_MM_DD } from '../../utils';
import { dateFormatWithYYYYMMDD } from '../../utils/utils';

const PrintableComponent = React.forwardRef((props, ref) => {
    const [reportData, setReportData] = useState([]);
    const [district, setDistrict] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const response = await fetchReportsForPrint();
            const districtsFromResponse = response.Items[0].map(item => item.District);
            const uniqueDistricts = new Set(districtsFromResponse);
            setDistrict(Array.from(uniqueDistricts));
            console.log('aaaaaaaa', district)
            setReportData(response.Items[0]);
        }
        fetchReports();
    }, []);



    return (
        <div ref={ref} className='px-4' style={{ paddingTop: 20 }}>
            <h3 className='text-center'>Murasuolli</h3>
            <h6 className='text-center'>{`[DAILY]`} Issue Wise Supply Register For the Issue Dated : {dateFormatWithYYYYMMDD(new Date())}</h6>
            {
                district.map((dis) => {
                    const filteredDis = reportData.filter((rep) => rep.District === dis);

                    return (
                        <div style={{ width: '100%' }} className='px-4'>
                            <h6 className='text-center' style={{ fontWeight: 'bold' }}>{dis}</h6>
                            <table style={{ width: '100%' }} className='px-4'>
                                <thead>
                                    <tr>
                                        <th>Agent</th>
                                        <th>Name</th>
                                        <th>Place</th>
                                        <th>Copies</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDis.map((fil, index) => (
                                        <tr key={index}>
                                            <td>{fil.agent}</td>
                                            <td>{fil.name}</td>
                                            <td>{fil.place}</td>
                                            <td>{fil.copies}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <br />
                        </div>
                    )

                })
            }

        </div>
    );
});

export default PrintableComponent;
