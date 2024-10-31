const router = require("express").Router()

const Team = require("../models/team")

router.get("/", async (req, res) => {
    try {
        const allTeams = await Team.find({})

        res.status(200).json(allTeams)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.post("/create", async (req, res) => {
    try {
        const {
            teamName,
            sportType,
            founded,
            location,
            achievements,
            famousPlayers,
        } = req.body
        if (
            !teamName ||
            !sportType ||
            !founded ||
            !location ||
            !achievements ||
            !famousPlayers
        ) {
            throw new Error(`Please provide all properties`)
        }

        const newTeam = new Team({ teamName, sportType, founded, location, achievements, famousPlayers })

        await newTeam.save()

        res.status(201).json({
            message: `Sports team created`,
            newTeam
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params // destructure the ID

        const foundTeam = await Team.findOne({ _id: id })

        if (!foundTeam) throw new Error(`None found`)

        res.status(200).json(foundTeam)// destructure response

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params

        const updatedTeam = await Team.findOneAndReplace( { _id: id })

        res.status(200).json({
            message: "Modified",
            updatedTeam
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.delete("/:id", (req, res) => {
    try {
        const { id } = req.params
        console.log(id)

        if (!uuidValidate(id)) {
            throw new Error("Please provide valid UUID or GUID")
        }

        const db = read(dbPath)

        const restOf = db.filter(i => i.id !== id)

        if (db.length === restOf.length) {
            throw new Error(`Nothing to delete`)
        }

        res.status(200).json({
            message: `${id} removed from the db`
        })

        save(restOf, dbPath)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

module.exports = router