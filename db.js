// Install and import mongoose
const mongoose = require("mongoose")
// add mongoose url to .env file and import
const DB_URL = process.env.DB_URL

const dbConnect = async () => {
    try {
        // ensures that it only fulfills logic as written
        mongoose.set("strictQuery", true)
        // connects to our db service
        await mongoose.connect(DB_URL)
        console.log(`[db] connected to: ${DB_URL}`)
    } catch (err) {
        console.log(`[db] error: ${err}`)
    }
}

// export connection and all mongoose related without importing mongoose elsewhere
module.exports = { dbConnect, mongoose }

//? [STEP 1]