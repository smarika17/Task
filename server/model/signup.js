const User = require('../db/user');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hash
        });

        await newUser.save();

        return res.status(200).json({
            data: newUser,
             message: 'User registered successfully' });
    } catch (error) {
        console.log("Error in registerUser:", error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = registerUser;
