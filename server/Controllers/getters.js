const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('../database')

const {userModel, tSalesModel, eSaleModel, tankerModel, employeeModel} = require('../schemas')


const secretKey = 'R%L9kwW*w!3wLBbs';

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


router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({username:req.body.email, password: req.body.password});
    
    if (user) {
      const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '1h' });
      console.log("user", user)
      console.log("user found token:", token)
      res.json({ token, role:user.role });
    } else {
        console.log("not found")
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });


router.get('/allTotalSales', verifyToken, verifyRole('admin'), async (req, res)=>{
    await tSalesModel.find({})
    .then((response)=>{
        res.json({message:"ok", response});
    })
    .catch((err)=>{
        res.status(401).json({ message: 'Invalid credentials' });
        console.log("error getting all sales:", err);
    })
})

router.get('/allEmployeeSales', verifyToken, verifyRole('admin'), async(req, res)=>{
    await eSaleModel.find({})
    .then((response)=>{
        res.json({message:"ok", response});
    })
    .catch((err)=>{
        console.log("error getting all sales:", err);
    })
})

router.get('/totalSaleAt/:date',verifyToken, async(req, res)=>{
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

router.get('/employeeSaleAt/:date',verifyToken, async(req, res)=>{
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

router.get('/tankerIDs',verifyToken, async(req, res)=>{
    await tankerModel.find({})
    .then((response)=>{
        res.json({message:"ok", response})
    })
    .catch((err)=>{
        res.status(400).json({error: 'error reading tanker ids', details: err})
    })
})

router.get('/employeeNames',verifyToken, async(req, res)=>{
    await employeeModel.find({})
    .then((response)=>{
        res.json({message:"ok", response})
    })
    .catch((err)=>{
        res.status(400).json({error: 'error reading employee names', details: err})
    })
})


module.exports = router