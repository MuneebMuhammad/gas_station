const express = require('express')
const router = express.Router();
const mongoose = require('../database')
const jwt = require('jsonwebtoken');

const {eSaleModel, testModel, tSalesModel} = require('../schemas')


// Middleware to verify JWT
function verifyToken(req, res, next) {
  const secretKey = 'R%L9kwW*w!3wLBbs';

  const token = req.headers['authorization'];
  console.log("token:", token)
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    console.log("role decoded", decoded)
    req.user = decoded.id;
    req.role = decoded.role
    next();
  });
}

// Middleware to verify role
function verifyRole(role) {
  return (req, res, next) => {
    if (req.role !== role) return res.status(403).send({ message: 'Access forbidden.' });
    next();
  };
}

router.post('/employee', verifyToken, verifyRole('manager'), async(req, res)=>{
      console.log("employee sale:", req.body)
      eSaleModel.findOneAndUpdate(
        {date:req.body.date},
        req.body,
        {new: true, upsert: true}
      )
      .then(() => {
          res.status(200).json({ message: 'Sale successfully added' });
        })
        .catch(err => {
          console.log(err)
          res.status(400).json({ error: 'There was an error saving the employee sale', details: err });
        });    
})

router.post('/total', verifyToken, verifyRole('manager'), async(req, res) => {
    
    tSalesModel.findOneAndUpdate(
      {date: req.body.date},
      req.body,
      {new: true, upsert: true}
    )
    .then(() => {
        res.status(200).json({ message: 'Total data successfully added' });
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: 'There was an error saving the total sale', details: err });
      });
})

router.get('/lastDate/:date', verifyToken, verifyRole('manager'), async(req, res) => {
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