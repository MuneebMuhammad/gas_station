const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const conn = mongoose.connect(MONGO_URI);
mongoose.set('debug', true);


module.exports = mongoose;