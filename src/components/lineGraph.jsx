import React, {useEffect, useState} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


function LineGraph() {
    const [chartData, setChartData] = useState([]);
    const [selectedDataType, setSelectedDataType] = useState("PetrolSale")

    const handleOptionChange = async(event)=>{
        console.log("type:", event.target.value)
        const response = await fetch(`http://localhost:5500/getter/allTotalSales`)
        const totalSales = await response.json();
        let data;
        switch (parseInt(event.target.value)){
            case 0:                
                setSelectedDataType("PetrolSale")
                data = totalSales.map(item => ({
                    date: item['date'],
                    PetrolSale: parseInt(item['petrolSale'], 10) 
                }))
                break;
            case 1:
                setSelectedDataType("DieselSale")
                data = totalSales.map(item => ({
                    date: item['date'],
                    DieselSale: parseInt(item['dieselSale'], 10) 
                }))
                break;
            case 2:
                setSelectedDataType("PetrolVarience")
                data = totalSales.map(item => ({
                    date: item['date'],
                    PetrolVarience: parseInt(item['petrolVarience'], 10) 
                }))
                break;
            case 3:
                setSelectedDataType("DieselVarience")
                data = totalSales.map(item => ({
                    date: item['date'],
                    DieselVarience: parseInt(item['dieselVarience'], 10) 
                }))
                break;
        }

        setChartData(data)
    }

    useEffect(() => {
        const fetchData = async () => {
          console.log("begin");
          const response = await fetch(`http://localhost:5500/getter/allTotalSales`);
          const totalSales = await response.json();
          let data = totalSales.map(item => ({
            date: item['date'],
            PetrolSale: parseInt(item['petrolSale'], 10)
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
        
        <LineChart
        className='mt-5'
      width={800}
      height={400}
      data={chartData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={selectedDataType} stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>



    </div>
  )
}

export default LineGraph