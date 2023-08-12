const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors');
var dataEntryController = require('./Controllers/dataEntry.js')
const app = express();


app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'))


app.listen(5500, () => {
console.log('Server running on http://localhost:5500');
});

app.use('/entry', dataEntryController)