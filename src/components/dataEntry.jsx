import React, {useEffect, useState} from 'react'
import EmployeeReadingsEntry from './employeeReadingsEntry'
import DipEntry from './dipEntry'
import Tanker from './tanker'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';

import { data } from 'jquery'


export default function DataEntry(props) {
    const [date, setDate] = useState("")
    const [dipReading1, setDipReading1] = useState(0)
    const [dipReading2, setDipReading2] = useState(0)
    const [dipReading3, setDipReading3] = useState(0)
    const [askUserStart, setAskuserStart] = useState(false)
    const [enteredPetrolStart, setEnteredPetrolStart] = useState()
    const [enteredDieselStart, setEnteredDieselStart] = useState()
    const [tankerIDs, setTankerIDs] = useState([]);
    const [tankerDelivery, setTankerDelivery] = useState([])
    const [eBeginning, setEBeginning] = useState([])
    const [eEnding, setEEnding] = useState([])
    const [eSaleType, setESaleType] = useState([])
    const [eID, setEID] = useState([])


    const updateDate = async(event) => {
      // reset previous values on date change
      setEnteredPetrolStart();
      setEnteredDieselStart();
      setAskuserStart(false)
      setDipReading1(0)
      setDipReading2(0)
      setDipReading3(0)
      setDate(event.target.value)
      setTankerDelivery(Array(tankerIDs.length).fill([0, 0]))
      // setEBeginning(Array(eID.length).fill([0]))
      // setEEnding(Array(eID.length).fill([0]))
      // setESaleType(Array(eID.length).fill([0]))
      setEBeginning(Array(eID.length).fill(0))
      setEEnding(Array(eID.length).fill(0))
      setESaleType(Array(eID.length).fill(0))

      const token = localStorage.getItem('token')
      // load data if this date exists in the table
      const response = await fetch(`http://localhost:5500/getter/totalSaleAt/${event.target.value}`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': token}
      })
      const viewData = await response.json();
      console.log("view Data:", viewData)
      if (viewData.message == "exists"){
        setAskuserStart(true)
        setDipReading1(viewData.response.dipReading1)
        setDipReading2(viewData.response.dipReading2)
        setDipReading3(viewData.response.dipReading3)
        setEnteredPetrolStart(viewData.response.petrolStartActualStock)
        setEnteredDieselStart(viewData.response.dieselStartActualStock)
        setTankerDelivery(viewData.response.deliveries.map((item)=> ([item.petrolQuantity, item.dieselQuantity])))

        const response = await fetch(`http://localhost:5500/getter/employeeSaleAt/${event.target.value}`,{
          method: 'GET',
          headers: {'Content-Type': 'application/json',
          'Authorization': token}
        })
        const employeeViewData = await response.json();
        if (employeeViewData.message == "exists"){
          console.log(employeeViewData)
          setEBeginning(employeeViewData.response.eSale.map((item)=> (item.beginningEntry)))
          setEEnding(employeeViewData.response.eSale.map((item)=> (item.endingEntry)))
          setESaleType(employeeViewData.response.eSale.map((item)=> (item.saleType)))
          setEID(employeeViewData.response.eSale.map((item)=> (item.employeeId)))
        }
        
        
      }
    }    

    const handleTankerUpdate = (index, petrol, diesel) => {
      const newQuantities = [...tankerDelivery];
      newQuantities[index] = [petrol, diesel];
      setTankerDelivery(newQuantities);
    };


    const handleEmployeeSaleUpdate = (index, eStart, eEnd, eSType) =>{
      const newEStart = [...eBeginning];
      newEStart[index] = eStart;
      setEBeginning(newEStart);

      const newEEnd = [...eEnding];
      newEEnd[index] = eEnd[index];
      setEEnding(newEEnd);

      const newEType = [...eSType];
      newEType[index] = eSType[index];
      setESaleType(newEType);
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

    const handleDipEntry1 = (value) => {
      setDipReading1(parseFloat(value))
    }
    const handleDipEntry2 = (value) => {
      setDipReading2(parseFloat(value))
    }
    const handleDipEntry3 = (value) => {
      setDipReading3(parseFloat(value))
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

      const deliveries = []
      tankerIDs.forEach((id, index)=>{
          deliveries.push({tankerID: id, petrolQuantity: tankerDelivery[index][0]?tankerDelivery[index][0]:0, dieselQuantity: tankerDelivery[index][1]?tankerDelivery[index][1]:0})
      })
      let petrolDelivery = 0
      let dieselDeliver = 0
      deliveries.forEach((d, index)=>{
        petrolDelivery += d.petrolQuantity
        dieselDeliver += d.dieselQuantity
      })
      console.log("petrol and diesel", petrolDelivery, dieselDeliver)
      let petrolBookStock = petrolStartActualStock-petrolSale+petrolDelivery
      let dieselBookStock = dieselStartActualStock-dieselSale+dieselDeliver
      let petrolEndActualStock = dipReading1
      let dieselEndActualStock = dipReading2+dipReading3
      let petrolVarience = petrolBookStock - petrolEndActualStock
      let dieselVarience = dieselBookStock - dieselEndActualStock
    
      
      console.log("delivery:", deliveries)
      const tSale = {
        date,
        petrolStartActualStock,
        dieselStartActualStock,
        petrolSale,
        dieselSale,
        deliveries,
        petrolBookStock,
        dieselBookStock,
        dipReading1,
        dipReading2,
        dipReading3,
        petrolEndActualStock,
        dieselEndActualStock,
        petrolVarience,
        dieselVarience
      }
      return tSale;
    }

    // write data to totalSale database
    const writeTotalSales = async (petrolStartActualStock, dieselStartActualStock) => {
      const token = localStorage.getItem('token')
      const tSaleJSON = createTSaleJSON(petrolStartActualStock, dieselStartActualStock);
      const tresponse = await fetch('http://localhost:5500/entry/total', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
        'Authorization': token},
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
      const token = localStorage.getItem('token')
      const eSaleJSON = createESaleJSON();
      const eresponse = await fetch('http://localhost:5500/entry/employee', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
        'Authorization': token},
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
      console.log("Endings:", eEnding)
      // user didn't enter actual stock values then check previous date stock
      if (!enteredPetrolStart || !enteredDieselStart){
        const response = await fetch(`http://localhost:5500/entry/lastDate/${date}`)
        const dateCheck = await response.json();
        
        // previous date didn't exist ask user to enter actual stock values
        if (dateCheck['message'] == 'not exists'){
          setAskuserStart(true)
          return
        }
        // previous date exists then write data to database
        else{
          let petrolStartActualStock = dateCheck['petrolStartActualStock'];
          let dieselStartActualStock = dateCheck['dieselStartActualStock']
          await writeTotalSales(petrolStartActualStock, dieselStartActualStock);
          await writeEmployeeSales();
        }
      }
      // user entered actual stock values
      else{
        await writeTotalSales(enteredPetrolStart, enteredDieselStart);
        await writeEmployeeSales();
        
        
      }
    }

    const handleEntry = ()=>{
        console.log("clicked")
        postData()
    }

    const handleLogout = () =>{
      localStorage.removeItem('token')
      window.location.replace('http://localhost:3000')
    }

    
    useEffect(() => {
      const fetchData = async () => {
        const tResponse = await fetch(`http://localhost:5500/getter/tankerIDs`);
        const tankers = await tResponse.json();
        let tData = tankers.map(item => (item.number));
        setTankerIDs(tData);
        setTankerDelivery(Array(tData.length).fill([0, 0]))

        const eResponse = await fetch(`http://localhost:5500/getter/employeeNames`);
        const employees = await eResponse.json();
        let eData = employees.map(item => (item.name));
        setEID(eData)
        setEBeginning(Array(eData.length).fill(0))
        setEEnding(Array(eData.length).fill(0))
        setESaleType(Array(eData.length).fill(0))

      };
      
      fetchData();
    }, []);


  return (
    <>
    {props.token}
    <Button variant='contained' endIcon={<LogoutIcon />} style={{float: "right", marginTop: "20px", marginRight: "20px"}} onClick={handleLogout}>Log out</Button>
    <br></br>
    <div className="container mt-4" style={{maxWidth:"550px"}}>
    
      <h4 >Date</h4>
      <input id="startDate" className="form-control" type="date" onChange={updateDate}/>
      <br></br>

      <h4 className="mt-4">Dispenser Reading</h4>
      {eBeginning.map((data, index) => (
        <EmployeeReadingsEntry 
        beginningValue={eBeginning[index]} 
        endingValue={eEnding[index]} 
        saleTypeValue={eSaleType[index]} 
        eIDvalue={eID[index]} 
        key={index} 
        itemNum={index} 
        updateEmployeeSale={(start, end, saleType)=>handleEmployeeSaleUpdate(index, start, end, saleType)}
        updateBeginning={(value) => handleBeginningAt(index, value)} 
        updateEnding={(value) => handleEndingAt(index, value)} 
        updateSaleType={(value) => handleESaleTypeAt(index, value)} 
        />))}

      <h4 className="mt-5">Dip Reading</h4>
      <DipEntry updateDipReading1={(value) => handleDipEntry1(value)} updateDipReading2={(value) => handleDipEntry2(value)} updateDipReading3={(value) => handleDipEntry3(value)} dipValue1={dipReading1} dipValue2={dipReading2} dipValue3={dipReading3}/>
      
      <h4 className="mt-5">Delivery</h4>
      {/* <Tanker updateTankerReading1={(value) => handleTankerEntry1(value)} updateTankerReading2={(value) => handleTankerEntry2(value)} tankerValue1={tankerReading1} tankerValue2={tankerReading2}/> */}
      {tankerIDs.map((tankerID, index) => (
        <Tanker
          key={tankerID}
          tankerID={tankerID}
          tankerQuantity={tankerDelivery[index]}
          updateTanker={(petrol, diesel) => handleTankerUpdate(index, petrol, diesel)}
        />
      ))}


      {askUserStart && <div> <h4 className="mt-4">Starting Actual Stock</h4> <div className="input-group mb-3"> <input id="startPetrolStock" className="form-control" type="number" placeholder="Petrol" value={enteredPetrolStart} onChange={(event)=>{setEnteredPetrolStart(event.target.value)}}/> <span className="input-group-text">litre</span>
      <input id="startDieselStock" className="form-control" type="number" placeholder="Diesel" value={enteredDieselStart} onChange={(event)=>{setEnteredDieselStart(event.target.value)}}/> <span className="input-group-text">litre</span></div> </div>
      }
      <Button className='mb-5 mt-3' color="success" variant="contained" endIcon={<SendIcon />} onClick={handleEntry} >
        Enter
      </Button>
    </div>
    </>
  )
}
