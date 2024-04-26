import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";


const GridExample = () => {
  const [rowData] = useState([
    { firstName: "Sudarshan", lastName: "Reddy", age: 25, gender: "Male", state: "Karnataka", district: "Chickballapur", dob: "1997-03-01" },
    { firstName: "Vihaan", lastName: "Sharma", age: 30, gender: "Male", state: "Delhi", district: "South Delhi", dob: "1992-05-15" },
    { firstName: "Aditi", lastName: "Gupta", age: 28, gender: "Female", state: "Uttar Pradesh", district: "Lucknow", dob: "1994-09-20" },
    { firstName: "Advik", lastName: "Choudhury", age: 27, gender: "Male", state: "West Bengal", district: "Kolkata", dob: "1995-11-12" },
    { firstName: "Ananya", lastName: "Deshpande", age: 35, gender: "Female", state: "Maharashtra", district: "Mumbai", dob: "1987-07-08" },
    { firstName: "Arjun", lastName: "Singh", age: 32, gender: "Male", state: "Rajasthan", district: "Jaipur", dob: "1990-02-25" },
    { firstName: "Aaradhya", lastName: "Mishra", age: 38, gender: "Female", state: "Uttar Pradesh", district: "Kanpur", dob: "1984-12-30" },
    { firstName: "Ayaan", lastName: "Patel", age: 40, gender: "Male", state: "Gujarat", district: "Ahmedabad", dob: "1982-08-18" },
    { firstName: "Aisha", lastName: "Kaur", age: 36, gender: "Female", state: "Punjab", district: "Ludhiana", dob: "1986-10-05" },
    { firstName: "Advait", lastName: "Kumar", age: 33, gender: "Male", state: "Bihar", district: "Patna", dob: "1989-04-11" },
    { firstName: "Ishani", lastName: "Shah", age: 29, gender: "Female", state: "Gujarat", district: "Surat", dob: "1993-06-27" },
    { firstName: "Kabir", lastName: "Joshi", age: 31, gender: "Male", state: "Maharashtra", district: "Pune", dob: "1991-08-10" },
    { firstName: "Meera", lastName: "Das", age: 34, gender: "Female", state: "West Bengal", district: "Howrah", dob: "1988-11-23" },
    { firstName: "Neha", lastName: "Thakur", age: 26, gender: "Male", state: "Uttarakhand", district: "Dehradun", dob: "1996-03-17" },
    { firstName: "Riya", lastName: "Verma", age: 29, gender: "Female", state: "Haryana", district: "Faridabad", dob: "1993-07-02" },
    { firstName: "Rehan", lastName: "Gandhi", age: 32, gender: "Male", state: "Delhi", district: "North Delhi", dob: "1990-01-28" },
    { firstName: "Vivaan", lastName: "Malhotra", age: 30, gender: "Female", state: "Punjab", district: "Amritsar", dob: "1992-04-05" },
    { firstName: "Yash", lastName: "Reddy", age: 35, gender: "Male", state: "Telangana", district: "Hyderabad", dob: "1987-10-12" },
    { firstName: "Zara", lastName: "Nair", age: 37, gender: "Female", state: "Kerala", district: "Kochi", dob: "1985-12-09" },
    { firstName: "Aryan", lastName: "Rao", age: 33, gender: "Male", state: "Karnataka", district: "Bangalore", dob: "1989-02-14" },
    { firstName: "Dia", lastName: "Singhania", age: 39, gender: "Female", state: "Maharashtra", district: "Nagpur", dob: "1983-09-29" },
    { firstName: "Kavya", lastName: "Sharma", age: 34, gender: "Male", state: "Uttar Pradesh", district: "Ghaziabad", dob: "1988-05-16" },
    { firstName: "Rudra", lastName: "Iyer", age: 31, gender: "Female", state: "Tamil Nadu", district: "Chennai", dob: "1991-11-20" },
    { firstName: "Yuvraj", lastName: "Sinha", age: 36, gender: "Male", state: "Bihar", district: "Gaya", dob: "1986-06-14" },
    { firstName: "Sanvi", lastName: "Chopra", age: 38, gender: "Female", state: "Haryana", district: "Gurgaon", dob: "1984-08-01" },
    { firstName: "Aarush", lastName: "Raj", age: 27, gender: "Male", state: "Rajasthan", district: "Udaipur", dob: "1995-02-08" },
    { firstName: "Ira", lastName: "Kulkarni", age: 28, gender: "Female", state: "Maharashtra", district: "Nashik", dob: "1994-06-03" },
    { firstName: "Nivaan", lastName: "Dutta", age: 29, gender: "Male", state: "Assam", district: "Guwahati", dob: "1993-04-18" },
    { firstName: "Sara", lastName: "Chatterjee", age: 30, gender: "Female", state: "West Bengal", district: "Kolkata", dob: "1992-07-25" },
    { firstName: "Kiara", lastName: "Ghosh", age: 32, gender: "Male", state: "Kerala", district: "Thiruvananthapuram", dob: "1990-09-13" },
    { firstName: "Veer", lastName: "Narayan", age: 33, gender: "Female", state: "Uttar Pradesh", district: "Varanasi", dob: "1989-03-28" },
    { firstName: "Aradhya", lastName: "Shetty", age: 31, gender: "Male", state: "Karnataka", district: "Mysuru", dob: "1991-01-22" },
    { firstName: "Rudra", lastName: "Menon", age: 29, gender: "Female", state: "Kerala", district: "Kozhikode", dob: "1993-08-07" },
    { firstName: "Arya", lastName: "Krishnan", age: 28, gender: "Male", state: "Tamil Nadu", district: "Coimbatore", dob: "1994-12-12" },
    { firstName: "Rohan", lastName: "Dasgupta", age: 27, gender: "Female", state: "West Bengal", district: "Howrah", dob: "1995-05-30" },
    { firstName: "Dhruv", lastName: "Chakraborty", age: 26, gender: "Male", state: "West Bengal", district: "Kolkata", dob: "1996-10-17" },
    { firstName: "Myra", lastName: "Kumar", age: 25, gender: "Female", state: "Tamil Nadu", district: "Chennai", dob: "1997-02-03" },
    { firstName: "Reeva", lastName: "Jain", age: 40, gender: "Male", state: "Uttar Pradesh", district: "Lucknow", dob: "1982-11-14" },
    { firstName: "Kian", lastName: "Sharma", age: 39, gender: "Female", state: "Haryana", district: "Faridabad", dob: "1983-07-28" },
  ]);


  const [columnDefs] = useState([
    {
      field: "firstName",
      cellEditor: "agSelectCellEditor",
      pinned: true
    },
    { field: "lastName", pinned: true },
    { field: "age", filter: "agNumberColumnFilter" },
    {
      field: "gender"
    },
    {
      field: "state"
    },
    {
      field: "district"
    },
    {
      field: "dob"
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    }
  }, []);

  return (
    <div className="ag-theme-quartz" style={{ height: 547, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
      />
    </div>
  );
}

export { GridExample };
