require("dotenv").config()
const express = require("express")
const app = express()

const PORT = process.env.PORT
const HOST = process.env.HOST

//? [STEP 2]
// import destructured dbConnect
const { dbConnect } = require("./db")
const authController = require("./controllers/auth")
const routesController = require("./controllers/routes")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/auth", authController)
app.use("/api", routesController)

app.listen(PORT, HOST, () => {
    // invoke it each time server runs
    dbConnect()
    console.log(`[server] listening on ${HOST}:${PORT}`)
})

/* 
    ? Model-View-Controller (MVC)
    *architecture or system design style
    * breaks full stack application into:
        * model (data - ex: database)
        * view (client - ex: browser or Postman)
        * controller (logic - ex: endpoints)
    * We use MVC for Separation of Concerns
*/