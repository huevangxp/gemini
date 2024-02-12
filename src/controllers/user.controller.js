const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.Register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username && !password) {
            return res.status(404).json({message: 'Invalid username and password!'})
        }
        const user = await User.findOne({ where: { username: username } })
        if (user) {
            return res.status(404).json({ message: 'This user already!' })
        }

        const newPass = await bcrypt.hash(password, 10);

        const data = {
            username: username,
            password: newPass
        }
        const createUser =  await User.create(data)
        return res.status(200).json({message:'Success', createUser: createUser.username})

    } catch (error) {
        return res.status(500).json({message: 'Server Error'})
    }
}

exports.Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const checkUser = await User.findOne({ where: { username: username } });
        if (!checkUser) {
            return res.status(404).json({ message: 'this user not found!' })
        }
        // console.log(checkUser);
        const checkPass = await bcrypt.compare(password, checkUser.password);
        if (!checkPass) {
            return res.status(404).json({ message:'Password incorrect!'})
        }
        // console.log('2');
        const user = {
            username: checkUser.username
        }
        // console.log(user);
        const token = await jwt.sign(user, 'huevang-gemini-Ai', { expiresIn: '7d' })
        return res.status(200).json({message:"Login Success", token: token})
    } catch (error) {
        return res.status(500).json({message: 'Server Error', error})
    }
}