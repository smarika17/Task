const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config(); 
app.use(cors());
app.use(express.json());

const registerUser = require('./model/signup');
const loginUser = require('./model/login');
const addEmployeeData = require('./model/addemployeedata');
const updateEmployeeData = require('./model/updateemployeedata');
const deleteEmployeeData = require('./model/deleteemployeedata');
const getEmployeeData = require('./model/getEmployeeData');



const mongouri = process.env.mongouri;
const port = process.env.port || 3000;


mongoose.connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});


app.post('/api/registeruser', registerUser);
app.post('/api/login', loginUser);
app.post('/api/addemployeedata', addEmployeeData);
app.put('/api/updateemployeedata', updateEmployeeData);
app.delete('/api/deleteemployeedata', deleteEmployeeData);
app.get('/api/getemployeedata', getEmployeeData);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});