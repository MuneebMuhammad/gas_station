import React, {useEffect, useState} from 'react'
import EmployeeReadingsEntry from './employeeReadingsEntry'
import DipEntry from './dipEntry'
import Tanker from './tanker'
import { data } from 'jquery'


export default function DataEntry() {
    const [date, setDate] = useState("")
    const [eBeginning, setEBeginning] = useState(["",""])
    const [eEnding, setEEnding] = useState(["",""])
    const [eSaleType, setESaleType] = useState(["",""])
    const [eID, setEID] = useState(["", ""])
    const [dipReading1, setDipReading1] = useState(0)
    const [dipReading2, setDipReading2] = useState(0)
    const [dipReading3, setDipReading3] = useState(0)
    const [tankerReading1, setTankerReading1] = useState(0)
    const [tankerReading2, setTankerReading2] = useState(0)
    const [askUserStart, setAskuserStart] = useState(false)
    const [enteredPetrolStart, setEnteredPetrolStart] = useState()
    const [enteredDieselStart, setEnteredDieselStart] = useState()


    const updateDate = (event) => {
      setDate(event.target.value)
    }    

    const handleBeginningAt = (index, newValue) => {
      setEBeginning(prevData => {
        const newData = [...prevData];
        newData[index] = parseFloat(newValue);
        return newData;
      })
    }

    const handleEndingAt = (index, newValue) => {
      setEEnding(prevData => {
        const newData = [...prevData];
        newData[index] = parseFloat(newValue);
        return newData;
      })
    }

    const handleESaleTypeAt = (index, newValue) => {
      setESaleType(prevData => {
        const newData = [...prevData];
        newData[index] = parseFloat(newValue);
        return newData;
      })
    }

    const handleEIDAt = (index, newValue) => {
      setEID(prevData => {
        const newData = [...prevData];
        newData[index] = parseInt(newValue);
        return newData;
      })
    }

    const handleDipEntry1 = (value) => {
      setDipReading1(parseFloat(value))
    }
    const handleDipEntry2 = (value) => {
      setDipReading2(parseFloat(value))
    }
    const handleDipEntry3 = (value) => {
      setDipReading3(parseFloat(value))
    }

    const handleTankerEntry1 = (value) => {
      setTankerReading1(parseFloat(value))
    }
    const handleTankerEntry2 = (value) => {
      setTankerReading2(parseFloat(value))
    }

    // create json format for employeeSale database
    const createESaleJSON = () => {
      const eSale = eBeginning.map((beginning, index) => ({
        employeeId: eID[index],
        beginningEntry: beginning,
        endingEntry: eEnding[index],
        sales: eEnding[index] - beginning,
        saleType: eSaleType[index]
      }));
  
      const saleJSON = {
        date,
        eSale
      };
  
      return saleJSON;
    };

    // create json format for totalSale database
    const createTSaleJSON = (petrolStartActualStock, dieselStartActualStock) => {
      let petrolSale = 0;
      let dieselSale = 0
      eSaleType.forEach((sType, index) => {
        if (sType == 0) {
          petrolSale = petrolSale + eEnding[index] - eBeginning[index]
        }
        else if (sType == 1) {
          dieselSale = dieselSale + eEnding[index] - eBeginning[index]
        }
      })
      console.log("start actual stocks:", petrolStartActualStock, dieselStartActualStock)
      const tSale = {
        date,
        petrolStartActualStock,
        dieselStartActualStock,
        petrolSale,
        dieselSale,
        "petrolTanker":tankerReading1,
        "dieselTanker":tankerReading2,
        "petrolBookStock":petrolStartActualStock-petrolSale+tankerReading1,
        "dieselBookStock":dieselStartActualStock-dieselSale+tankerReading2,
        "petrolEndActualStock":dipReading1,
        "dieselEndActualStock":dipReading2+dipReading3
      }
      return tSale;
    }

    // write data to totalSale database
    const writeTotalSales = async (petrolStartActualStock, dieselStartActualStock) => {
      const tSaleJSON = createTSaleJSON(petrolStartActualStock, dieselStartActualStock);
      const tresponse = await fetch('http://localhost:5500/entry/total', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(tSaleJSON)
      })
      .then((tresponse) => tresponse.json())
      .then((data) => {
        console.log("successfully entered data:", data);
      })
      .catch((error) => {
        console.log("Error while sending: ", error)
      })
    }

    // write data to employeeSale database
    const writeEmployeeSales = async () =>{
      const eSaleJSON = createESaleJSON();
      const eresponse = await fetch('http://localhost:5500/entry/employee', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(eSaleJSON)
      })
      .then((eresponse) => eresponse.json())
      .then((data) => {
        console.log("successfully entered data:", data);
        // window.location.reload()
      })
      .catch((error) => {
        console.log("Error while sending: ", error)
      })
    }

    
    const postData = async () => {
      // user didn't enter actual stock values then check previous date stock
      if (!enteredPetrolStart || !enteredDieselStart){
        console.log("not actual stocks currently")
        const response = await fetch(`http://localhost:5500/entry/lastDate/${date}`)
        const dateCheck = await response.json();
        
        // previous date didn't exist ask user to enter actual stock values
        if (dateCheck['message'] == 'not exists'){
          console.log("not exists")
          setAskuserStart(true)
          return
        }
        // previous date exists then write data to database
        else{
          console.log("date exists")
          let petrolStartActualStock = dateCheck['petrolStartActualStock'];
          let dieselStartActualStock = dateCheck['dieselStartActualStock']
          await writeTotalSales(petrolStartActualStock, dieselStartActualStock);
          await writeEmployeeSales();
        }
      }
      // user entered actual stock values
      else{
        console.log("actual stock entered by user")
        await writeTotalSales(enteredPetrolStart, enteredDieselStart);
        await writeEmployeeSales();
        setAskuserStart(false)
        
      }
    }

    const handleEntry = ()=>{
        console.log("clicked")
        postData()
    }

  return (
    <div>
      <h4>Date</h4>
      <input id="startDate" className="form-control" type="date" onChange={updateDate}/>
      <br></br>
      <h4>Emploee Reading</h4>
      {eBeginning.map((data, index) => (<EmployeeReadingsEntry key={index} itemNum={index} updateBeginning={(value) => handleBeginningAt(index, value)} updateEnding={(value) => handleEndingAt(index, value)} updateSaleType={(value) => handleESaleTypeAt(index, value)} updateEName={(value) => handleEIDAt(index, value)}/>))}
      <h4>Dip Reading</h4>
      <DipEntry updateDipReading1={(value) => handleDipEntry1(value)} updateDipReading2={(value) => handleDipEntry2(value)} updateDipReading3={(value) => handleDipEntry3(value)}/>
      <h4>Tanker Reading</h4>
      <Tanker updateTankerReading1={(value) => handleTankerEntry1(value)} updateTankerReading2={(value) => handleTankerEntry2(value)}/>
      
      
      {askUserStart && <div> <h4>Starting Actual Stock</h4> <div className="input-group mb-3"> <input id="startPetrolStock" className="form-control" type="number" placeholder="Petrol" onChange={(event)=>{setEnteredPetrolStart(event.target.value)}}/> <span className="input-group-text">litre</span>
      <input id="startDieselStock" className="form-control" type="number" placeholder="Diesel" onChange={(event)=>{setEnteredDieselStart(event.target.value)}}/> <span className="input-group-text">litre</span></div> </div>
      }

      <button onClick={handleEntry}>Enter</button>
      
    </div>
  )
}
