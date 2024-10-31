const { mongoose } = require("../db")

const Team = mongoose.Schema(
    {
        teamName: {
            type: String,
            required: true,
            unique: true
        },
        sportType: {
            type: String,
            required: true,
        },
        founded: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        achievements: {
            type: Array,
            required: true
        },
        famousPlayers: {
            type: Array,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("team", Team)