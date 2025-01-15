const { validationResult } = require('express-validator');
const Employee = require('../db/employee');
const User = require('../db/user');

const addEmployeeData = async (req, res) => {
    try {
        const { id, empid, name, city, phone, designation, salary } = req.body;

        const existingUser = await Employee.findOne({ id });

        

        if (existingUser) {
            const existingEmployee = existingUser.employeedata.find(emp => emp.empid === empid);

            if (existingEmployee) {
                return res.status(400).json({ message: 'Employee already exists' });
            }

            existingUser.employeedata.push({ empid, name, city, phone, designation, salary });
            await existingUser.save();

            return res.status(200).json({
                data: existingUser,
                message: 'Employee data added successfully'
            });
        }

        const newEmployee = new Employee({
            id,
            employeedata: [{ empid, name, city, phone, designation, salary }]
        });

        await newEmployee.save();

        return res.status(201).json({
            data: newEmployee,
            message: 'New employee data added successfully'
        });

    } catch (error) {
        console.log('Error in addEmployeeData:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = addEmployeeData;
