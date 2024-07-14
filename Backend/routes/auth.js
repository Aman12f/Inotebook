const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser')

const JWT_SECRET = 'Amanisagoodboy';

// ROUTE 1 : Create a user using : POST "/api/auth/createUser"
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Email must be in Email form ').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    console.log(req.body);  // Logs the request body to the console.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Creating a new user
        // check wheter the user with email exist already 
        let user1 =await User.findOne({email:req.body.email})
        if(user1){
            return res.status(400).json({error:"Sorry user with this email already exist"})
        }
        //create a new user
        const salt = await bcrypt.genSaltSync(10)
        const secPass = await bcrypt.hash(req.body.password,salt)  
        const user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        const data = {
            user:{
                id : user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET); 
        // console.log(jwtData) 
  
        res.json({authToken});
    } catch (err) {
        console.error(err.message);
        // Checking for duplicate key error
        if (err.code === 11000) {
            return res.status(400);
        }
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 2 : authenticate a user : using : POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Email must be in Email form ').isEmail(),
    body('password', 'Password can not be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Try to login with correct creadentials"})
        }
        const passwordCompare =await bcrypt.compare(password,user.password)
        if(!passwordCompare)
            {
                return res.status(400).json({error:"Try to login with correct creadentials"})
            }
            const data = {
                user:{
                    id : user.id
                }
            }
            const authToken = jwt.sign(data,JWT_SECRET); 
            res.json({authToken})
    } catch (err) {
        console.error(err.message);
        // Checking for duplicate key error
        if (err.code === 11000) {
            return res.status(400);
        }
        res.status(500).send("Internal Server Error");
    }

})

// ROUTE 3 : Get logedin User Details using : Post "/api/auth/getuser/". Login User
router.post('/getuser', fetchuser,async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (err) {
        console.error(err.message);
        // Checking for duplicate key error
        if (err.code === 11000) {
            return res.status(400);
        }
        res.status(500).send("Internal Server Error");
    }
    
    })
module.exports = router;
