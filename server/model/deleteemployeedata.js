const Employee = require('../db/employee');
const User = require('../db/user');

const deleteEmployeeData = async (req, res) => {
    try {
        const { id, empid } = req.body;

        const existingUser = await Employee.findOne({ id });

        if (!existingUser) {
            return res.status(400).json({ message: 'Employee does not exist' });
        }   

        const existingEmployee = existingUser.employeedata.find(emp => emp.empid === empid);

        if (!existingEmployee) {
            return res.status(400).json({ message: 'Employee does not exist' });
        }

        existingUser.employeedata = existingUser.employeedata.filter(emp => emp.empid !== empid);

        await existingUser.save();

        return res.status(200).json({
            data: existingUser,
            message: 'Employee data deleted successfully'
        });
    }
    catch (error) {
        console.log('Error in deleteEmployeeData:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = deleteEmployeeData;