import React, {useEffect, useState} from 'react'
import LineGraph from './lineGraph';


function ViewTanker() {
  const [allTankers, setAllTankers] = useState([])
  const [chartData, setChartData] = useState([]);
  const [tID, setTID] = useState(0)
  const [saleType, setSaleType] = useState(0);





  const handleView = async(id,ty)=>{
    const response = await fetch(`http://localhost:5500/getter/allTotalSales`)
    const totalSales = await response.json();
    let data = [];

    totalSales.forEach((item) => {
        item.deliveries.forEach((delivery) => {
        if (delivery.tankerID == id) {
          let quantity = ty == 0? delivery.petrolQuantity : delivery.dieselQuantity
          data.push({ date: item.date, value: quantity });
        }
        });
    });

    console.log("data", data);
    setChartData(data);

}



const handleTankerChange = (event)=>{
    setTID(event.target.value);
    handleView(event.target.value, saleType);
}

const handleTypeChange = (event)=>{
    setSaleType(event.target.value)
    handleView(tID, event.target.value);
}






  useEffect(() => {
    const fetchData = async () => {
      const eResponse = await fetch(`http://localhost:5500/getter/tankerIDs`);
      const employees = await eResponse.json();
      let eData = employees.map(item => (item.number));
      setAllTankers(eData)

    };
  
    fetchData();
  }, []);

  return (
    <div>
      <div className='container mt-5'>
        <select className="form-select mb-1" aria-label="Default select example" onChange={handleTankerChange}>
        <option defaultValue={""}>Choose Tanker</option>
        {allTankers.map((item, index)=> (<option key={index} value={item}>{item}</option>))}
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
    </div>
  )
}

export default ViewTanker