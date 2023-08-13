import React from 'react'

function Tanker(props) {

    const handleTankerChange1 = (event)=>{
        props.updateTankerReading1(event.target.value)
    }
    const handleTankerChange2 = (event)=>{
        props.updateTankerReading2(event.target.value)
    }
  return (
    <div>
        <div className="input-group mb-3">
        <input type="number" className="form-control" placeholder="Tanker 1 (Petrol)" value={props.tankerValue1 != 0 ? props.tankerValue1 : ""} onChange={handleTankerChange1}/>
        <span className="input-group-text">litre</span>
        </div>
        <div className="input-group mb-3">
        <input type="number" className="form-control" placeholder="Tanker 2 (Diesel)" value={props.tankerValue2 != 0 ? props.tankerValue2 : ""} onChange={handleTankerChange2}/>
        <span className="input-group-text">litre</span>
        </div>
    </div>
  )
}

export default Tanker