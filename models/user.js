//? [STEP 3]
// import database
const { mongoose } = require("../db")
// schema defines how Collection data will be structured
const User = new mongoose.Schema(
    {
        // properties of Document entry into User Collection
        fullName: {
            // Validators (allow certification of many variables)
            type: String,
            required: true,
            unique: false
        },
        age: {
            type: Number,
            required: true,
            min: 18
        },
        email: {
            type: String,
            maxLength: 48,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        },
        password: {
            type: String,
            required: true
        }
    },
    //adds createdAt and updatedAt properties
    { timestamps: true }
)
// exports the model for use in our routes
module.exports = mongoose.model("user", User)