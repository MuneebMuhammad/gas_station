import React from 'react'

function Tanker({ tankerID, tankerQuantity, updateTanker }) {

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (type === 'petrol') {
      updateTanker(parseFloat(value), parseFloat(tankerQuantity[1]));
    } else {
      updateTanker(parseFloat(tankerQuantity[0]), parseFloat(value));
    }
  };
    
  return (
    <div>
      <h5>Tanker: {tankerID}</h5>
      <div className="input-group mb-3">
      <input type="number" className="form-control" placeholder="Petrol" value={tankerQuantity[0] > 0 ? tankerQuantity[0] : ""} onChange={(e) => handleInputChange(e, 'petrol')}/>
      <span className="input-group-text">litre</span>
      <input type="number" className="form-control" placeholder="Diesel" value={tankerQuantity[1] > 0 ? tankerQuantity[1] : ""} onChange={(e) => handleInputChange(e, 'diesel')}/>
      <span className="input-group-text">litre</span>
      </div>
    </div>
  )
}

export default Tanker