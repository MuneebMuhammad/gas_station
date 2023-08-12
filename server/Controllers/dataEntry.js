const express = require('express')
const router = express.Router();
const mongoose = require('../database')

const {eSaleModel, testModel, tSalesModel} = require('../schemas')

router.get('/greetings', (req, res)=>{
    res.json({message: "reply from greetings api"})
})

router.post('/employee', async(req, res)=>{
    const newSale = new eSaleModel(req.body);

    newSale.save()
    .then(() => {
        res.status(200).json({ message: 'Sale successfully added' });
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: 'There was an error saving the sale', details: err });
      });
})

router.post('/total', async(req, res) => {
    const newTSale = new tSalesModel(req.body);

    newTSale.save()
    .then(() => {
        res.status(200).json({ message: 'Total data successfully added' });
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: 'There was an error saving the total sale', details: err });
      });
})

router.get('/lastDate/:date', async(req, res) => {
    const dateObject = new Date(req.params.date)
    dateObject.setDate(dateObject.getDate() -1);
    tSalesModel.findOne({date: dateObject.toISOString().split('T')[0]})
    .then((response)=>{
        if(response){
            res.json({message:"exists", petrolStartActualStock:response.petrolEndActualStock, dieselStartActualStock: response.dieselEndActualStock})
        }
        else{
            res.json({message:"not exists"})
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(400).json({ error: 'There was an error reading previous date', details: err });
    })
})

router.post('/test', async(req, res)=>{
    const newTest = new testModel(req.body);
    newTest.save()
    .then(() => {
        res.status(200).json({ message: 'Test successfully added' });
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: 'There was an error at testing', details: err });
      });
})

module.exports = router