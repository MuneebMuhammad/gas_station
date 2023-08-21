const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String
})

const eSaleSchema = new mongoose.Schema({
    employeeId: String,
    beginningEntry: Number,
    endingEntry: Number,
    sales: Number,
    saleType: { type: Number, enum: [0, 1] }
});
  
const employeeSaleSchema = new mongoose.Schema({
    date: String,
    eSale: [eSaleSchema]
});
  
const totalSalesSchma = new mongoose.Schema({
    date: String,
    petrolStartActualStock: Number,
    dieselStartActualStock: Number,
    petrolSale: Number,
    dieselSale: Number,
    petrolDelivery: Number,
    dieselDelivery: Number,
    deliveries: [
        {
          tankerID: String,
          petrolQuantity: Number,
          dieselQuantity: Number
        }
      ],
    petrolBookStock: Number,
    dieselBookStock: Number,
    dipReading1: Number,
    dipReading2: Number,
    dipReading3: Number,
    petrolEndActualStock: Number,
    dieselEndActualStock: Number,
    petrolVarience: Number,
    dieselVarience: Number
  });
  
const tankerSchema = new mongoose.Schema({
    number: String,
    maxCapacity: Number,
    sections: Number
})

const employeeSchema = new mongoose.Schema({
    name: String,
    cnic: Number,
    age: Number,
    reference: String
})
  
const testSchema = new mongoose.Schema({
    name: String
})


const userModel= mongoose.model('users', userSchema)
const eSaleModel = mongoose.model('employeesales', employeeSaleSchema);
const tSalesModel = mongoose.model('totalsales', totalSalesSchma);
const tankerModel = mongoose.model('tankers', tankerSchema)
const employeeModel = mongoose.model('employees', employeeSchema)
const testModel = mongoose.model('tests', testSchema)

module.exports = {userModel,eSaleModel, tSalesModel, tankerModel, employeeModel,testModel}