const Employee = require('../db/employee');
const User = require('../db/user');

const updateEmployeeData = async (req, res) => {
    try {
        const { id, empid, name, city, phone, designation, salary } = req.body;

        const existingUser = await Employee.findOne({ id });

        if (!existingUser) {
            return res.status(400).json({ message: 'Employee does not exist' });
        }   

        const existingEmployee = existingUser.employeedata.find(emp => emp.empid === empid);

        if (!existingEmployee) {
            return res.status(400).json({ message: 'Employee does not exist' });
        }

        existingEmployee.name = name;
        existingEmployee.city = city;
        existingEmployee.phone = phone;
        existingEmployee.designation = designation;
        existingEmployee.salary = salary;

        await existingUser.save();

        return res.status(200).json({
            data: existingUser,
            message: 'Employee data updated successfully'
        });

    }
    catch (error) {
        console.log('Error in updateEmployeeData:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = updateEmployeeData;