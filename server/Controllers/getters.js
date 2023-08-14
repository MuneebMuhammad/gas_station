const express = require('express')
const router = express.Router();
const mongoose = require('../database')

const {tSalesModel, eSaleModel, tankerModel, employeeModel} = require('../schemas')


router.get('/allTotalSales', async (req, res)=>{
    await tSalesModel.find({})
    .then((response)=>{
        res.json(response);
    })
    .catch((err)=>{
        console.log("error getting all sales:", err);
    })
})

router.get('/allEmployeeSales', async(req, res)=>{
    await eSaleModel.find({})
    .then((response)=>{
        res.json(response);
    })
    .catch((err)=>{
        console.log("error getting all sales:", err);
    })
})

router.get('/totalSaleAt/:date', async(req, res)=>{
    await tSalesModel.findOne({date:req.params.date})
    .then((response)=>{
        if (response){
            res.json({message: "exists", response})
        }
        else{
            res.json({message:"not exists"})
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(400).json({ error: 'There was an error reading totalSale current date', details: err });
    })
})

router.get('/employeeSaleAt/:date', async(req, res)=>{
    await eSaleModel.findOne({date:req.params.date})
    .then((response)=>{
        if (response){
            res.json({message: "exists", response})
        }
        else{
            res.json({message:"not exists"})
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(400).json({ error: 'There was an error reading employeeSale current date', details: err });
    })
})

router.get('/tankerIDs', async(req, res)=>{
    await tankerModel.find({})
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.status(400).json({error: 'error reading tanker ids', details: err})
    })
})

router.get('/employeeNames', async(req, res)=>{
    await employeeModel.find({})
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.status(400).json({error: 'error reading employee names', details: err})
    })
})


module.exports = router