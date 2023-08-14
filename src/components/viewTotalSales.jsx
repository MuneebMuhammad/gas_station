import React, {useEffect, useState} from 'react'
import LineGraph from './lineGraph';

function ViewTotalSales() {
const [chartData, setChartData] = useState([]);

const handleOptionChange = async(event)=>{
    const response = await fetch(`http://localhost:5500/getter/allTotalSales`)
    const totalSales = await response.json();
    let data;
    switch (parseInt(event.target.value)){
        case 0:                
            data = totalSales.map(item => ({
                date: item['date'],
                value: parseInt(item['petrolSale'], 10) 
            }))
            break;
        case 1:
            data = totalSales.map(item => ({
                date: item['date'],
                value: parseInt(item['dieselSale'], 10) 
            }))
            break;
        case 2:
            data = totalSales.map(item => ({
                date: item['date'],
                value: parseInt(item['petrolVarience'], 10) 
            }))
            break;
        case 3:
            data = totalSales.map(item => ({
                date: item['date'],
                value: parseInt(item['dieselVarience'], 10) 
            }))
            break;
    }

    setChartData(data)
}

useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`http://localhost:5500/getter/allTotalSales`);
          const totalSales = await response.json();
          let data = totalSales.map(item => ({
            date: item['date'],
            value: parseInt(item['petrolSale'], 10)
          }));
          setChartData(data);
        };
      
        fetchData();
      }, []);

  return (
    <div className="container mt-5">
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" value="0" onChange={handleOptionChange} defaultChecked/>
        <label className="form-check-label" htmlFor="inlineRadio1">Petrol Sale</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" value="1" onChange={handleOptionChange}/>
        <label className="form-check-label" htmlFor="inlineRadio2">Diesel Sale</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" value="2" onChange={handleOptionChange}/>
        <label className="form-check-label" htmlFor="inlineRadio2">Petrol Varience</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" value="3" onChange={handleOptionChange}/>
        <label className="form-check-label" htmlFor="inlineRadio2">Diesel Varience</label>
        </div>
    
        <LineGraph chartData={chartData}/>
    </div>
  )
}

export default ViewTotalSales