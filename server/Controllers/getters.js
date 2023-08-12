const express = require('express')
const router = express.Router();
const mongoose = require('../database')

const {tSalesModel} = require('../schemas')


router.get('/allTotalSales', async (req, res)=>{
    await tSalesModel.find({})
    .then((response)=>{
        res.json(response);
    })
    .catch((err)=>{
        console.log("error getting all sales:", err);
    })
})








module.exports = router