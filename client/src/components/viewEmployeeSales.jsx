import React, {useEffect, useState} from 'react'
import LineGraph from './lineGraph';

function ViewEmployeeSales() {
    const [chartData, setChartData] = useState([]);
    const [eID, setEID] = useState(0)
    const [saleType, setSaleType] = useState(0);
    const [allEmployees, setAllEmployees] = useState([])

    const handleView = async(id,ty)=>{
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:5500/getter/allEmployeeSales`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
            'Authorization': token}
          })
        
        const totalSales = await response.json();
        if (totalSales.message == "ok"){
            let data = [];

            totalSales.response.forEach((item) => {
                item.eSale.forEach((eSale) => {
                if (eSale.employeeId == id && eSale.saleType == ty) {
                    data.push({ date: item.date, value: eSale.sales });
                }
                });
            });
    
            console.log("data", data);
            setChartData(data);
        }
        

    }

    const handleEmployeeChange = (event)=>{
        setEID(event.target.value);
        handleView(event.target.value, saleType);
    }

    const handleTypeChange = (event)=>{
        console.log("sale type:", event.target.value)
        setSaleType(event.target.value)
        handleView(eID, event.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')
          const eResponse = await fetch(`http://localhost:5500/getter/employeeNames`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
            'Authorization': token}
          });
          const employees = await eResponse.json();
          if (employees.message == "ok"){
            let eData = employees.response.map(item => (item.name));
            setAllEmployees(eData)
          }
          
  
        };
      
        fetchData();
      }, []);

  return (
    <div className='container mt-5'>
        <select className="form-select mb-1" aria-label="Default select example" onChange={handleEmployeeChange}>
        <option defaultValue={""}>Choose Employee</option>
        {allEmployees.map((item, index)=> (<option key={index} value={item}>{item}</option>))}
        </select>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" value="0" defaultChecked onChange={handleTypeChange}/>
        <label className="form-check-label" htmlFor="inlineRadio1">Petrol</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" value="1" onChange={handleTypeChange}/>
        <label className="form-check-label" htmlFor="inlineRadio2">Diesel</label>
        </div>
        <LineGraph chartData={chartData}/>
    </div>
  )
}

export default ViewEmployeeSales