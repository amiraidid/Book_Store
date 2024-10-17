const jwt = require("jsonwebtoken");
const User = require("../Model/userModel")
const bcrypt = require("bcrypt")


const createAccount = async(req, res) => {
    const { email, password } = req.body;
    try {
        const findUser = await User.findOne({email})

        if (findUser) {
            return res.status(400).json({message: "the email already exists, try a new email..."})
        }

        const hashPass = await bcrypt.hash(password, 10)
        req.body.password = hashPass

        await User.create(req.body) 
        res.status(200).json({message: "an new account have been created"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const login = async(req, res) => {
    const { email, password, role } = req.body
    try {
        const findUser = await User.findOne({email})
        const userPass = await bcrypt.compare(password, findUser.password)

        if (!findUser || !userPass) {
            return res.status(500).json({message: "the email & password are incorrect"})
        }

        const token = await jwt.sign({
            id: findUser._id,
            email: findUser.email,
            role: findUser.role
        }, process.env.JWT_SECRET, {expiresIn: '1d' });
        res.status(200).json({message: "Successfully login", token,  role: findUser.role});
        
        
    } catch (error) {
        res.status(401).json({message: "couldnt login your account"})
    }
}

module.exports = { createAccount, login}