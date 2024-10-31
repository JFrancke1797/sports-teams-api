//1. import express router
const router = require("express").Router()
//? [STEP 4]
// import model to connect between route and db
const User = require("../models/user")

//2. perform endpoint handling. router gives access to all HTTP methods
router.post("/register", async (req, res) => {
    try {
        const { fullName, age, email, password } = req.body // object destructuring

        if (!fullName || !age || !email || !password) {
            throw new Error(`Please provide full name, age, email, and password`)
        }

        const newUser = new User({ fullName, age, email, password })

        await newUser.save()
    
        res.status(201).json({
            message: `User created`,
            newUser
        })
    } catch (err) {
        res.status(500).json({
            error: `${err}`
        })
    } 
})

router.post("/login", (req, res) => {
    // TODO: try your shot at reading your database and returning its contents to the client
    // get request email and password values
    // read the database
    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw new Error(`Please provide email & password`)
        }

        const allUsers = read(users)

        const foundUser = allUsers.filter(usr => usr.email === email)

        if (!foundUser.length) {
            throw new Error(`User not found`)
        } 
        
        if (foundUser[0].password !== password) {
            throw new Error(`Incorrect password`)
        } 
        
        res.status(200).json({
            message:`${email} logged in`
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

module.exports = router