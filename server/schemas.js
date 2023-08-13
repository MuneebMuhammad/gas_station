const mongoose = require('mongoose')


const eSaleSchema = new mongoose.Schema({
    employeeId: Number,
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
    petrolTanker: Number,
    dieselTanker: Number,
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
  
  
const testSchema = new mongoose.Schema({
    name: String
})


const eSaleModel = mongoose.model('employeesales', employeeSaleSchema);
const tSalesModel = mongoose.model('totalsales', totalSalesSchma);
const testModel = mongoose.model('tests', testSchema)

module.exports = {eSaleModel, tSalesModel,testModel}