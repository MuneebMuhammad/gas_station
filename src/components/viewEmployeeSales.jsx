import React, {useState} from 'react'
import LineGraph from './lineGraph';

function ViewEmployeeSales() {
    const [chartData, setChartData] = useState([]);
    const [eID, setEID] = useState(0)
    const [saleType, setSaleType] = useState(0)

    const handleView = async(id,ty)=>{
        const response = await fetch(`http://localhost:5500/getter/allEmployeeSales`)
        const totalSales = await response.json();
        let data = [];

        totalSales.forEach((item) => {
            item.eSale.forEach((eSale) => {
            if (eSale.employeeId == id && eSale.saleType == ty) {
                data.push({ date: item.date, value: eSale.sales });
            }
            });
        });

        console.log("data", data);
        setChartData(data);

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

  return (
    <div className='container mt-5'>
        <select className="form-select mb-1" aria-label="Default select example" onChange={handleEmployeeChange}>
        <option defaultValue={""}>Choose Employee</option>
        <option value="0">Ali</option>
        <option value="1">Asad</option>
        <option value="2">Asim</option>
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