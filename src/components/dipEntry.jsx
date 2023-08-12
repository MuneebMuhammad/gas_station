import React from 'react'

function DipEntry(props) {

    const handleDipChange1 = (event)=>{
        props.updateDipReading1(event.target.value)
    }
    const handleDipChange2 = (event)=>{
        props.updateDipReading2(event.target.value)
    }
    const handleDipChange3 = (event)=>{
        props.updateDipReading3(event.target.value)
    }

  return (
    <div>
        <div className="input-group mb-3">
        <input type="number" className="form-control" placeholder="Container 1 (Petrol)" onChange={handleDipChange1}/>
        <span className="input-group-text">litre</span>
        </div>
        <div className="input-group mb-3">
        <input type="number" className="form-control" placeholder="Container 2 (Diesel)" onChange={handleDipChange2}/>
        <span className="input-group-text">litre</span>
        </div>
        <div className="input-group mb-3">
        <input type="number" className="form-control" placeholder="Container 3 (Diesel)" onChange={handleDipChange3}/>
        <span className="input-group-text">litre</span>
        </div>
    </div>
  )
}

export default DipEntry