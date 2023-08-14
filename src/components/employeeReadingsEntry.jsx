import React from 'react'
import Divider from '@mui/material/Divider';

const EmployeeReadingsEntry = (props) => {
  
  const handleBeginning = (event) => {
    props.updateBeginning(event.target.value);
  }

  const handleEnding = (event) => {
    props.updateEnding(event.target.value);
  }

  const handleSaleTypeChange = (event) => {
    props.updateSaleType(event.target.value)
  } 


  return (
    <div className="container mb-3">
      
        <h5>{props.eIDvalue}</h5>
        <div className="input-group mb-3">
        <input type="number" className="form-control" placeholder="Beginning Reading" onChange={handleBeginning} value={props.beginningValue}/>
        <span className="input-group-text">(start) litre</span>
        <input type="number" className="form-control" placeholder="Ending Reading" onChange={handleEnding} value={props.endingValue}/>
        <span className="input-group-text">(end) litre</span>
        </div>

        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={"inlineRadioOptions"+props.itemNum}  value="0" onChange={handleSaleTypeChange} checked={props.saleTypeValue==0}/>
            <label className="form-check-label" htmlFor="inlineRadio1">Petrol</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={"inlineRadioOptions"+props.itemNum}   value="1" onChange={handleSaleTypeChange} checked={props.saleTypeValue==1}/>
            <label className="form-check-label" htmlFor="inlineRadio2">Diesel</label>
            </div>
            <Divider />
  </div>

  )
}

export default EmployeeReadingsEntry