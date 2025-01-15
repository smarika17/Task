const Employee = require('../db/employee');
const User = require('../db/user');

const getEmployeeData = async (req, res) => {
    try {
        const { id } = req.query; // Access the ID from the query parameters

        if (!id) {
            return res.status(400).json({ message: 'User ID is missing' });
        }

        const user = await Employee.findOne({ id });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        return res.status(200).json({ data: user.employeedata });
    }
    catch (error) {
        console.log('Error in getEmployeeData:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = getEmployeeData;
