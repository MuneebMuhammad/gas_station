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

  const handleNameChange = (event) => {
    props.updateEName(event.target.value)
  }

  return (
    <div className="container mb-3">
        <select className="form-select mb-1" aria-label="Default select example" onChange={handleNameChange}>
        <option defaultValue={""}>Choose Employee</option>
        <option value="0">Ali</option>
        <option value="1">Asad</option>
        <option value="2">Asim</option>
        </select>
        
        
        <div className="input-group mb-3">
        <input type="number" className="form-control" placeholder="Beginning Reading" onChange={handleBeginning}/>
        <span className="input-group-text">litre</span>
        <input type="number" className="form-control" placeholder="Ending Reading" onChange={handleEnding}/>
        <span className="input-group-text">litre</span>
        </div>

        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={"inlineRadioOptions"+props.itemNum}  value="0" onChange={handleSaleTypeChange}/>
            <label className="form-check-label" htmlFor="inlineRadio1">Petrol</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={"inlineRadioOptions"+props.itemNum}   value="1" onChange={handleSaleTypeChange}/>
            <label className="form-check-label" htmlFor="inlineRadio2">Diesel</label>
            </div>
            <Divider dark/>
  </div>

  )
}

export default EmployeeReadingsEntry