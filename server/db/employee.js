const mongoose = require('mongoose');

const employeedata = new mongoose.Schema({
    empid: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: String,
        required: true
    }
});

const employeeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    employeedata: [employeedata]
});


const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
