const { Router } = require("express");
const { allCountries, countryById, countryByName, addActivities, removeAct, filterActivities, deleteAct, getActivities, editActivity } = require("../controllers/controllers");

const router = Router();

router.get("/countries", async (req, res) => {
    try {
        const countries = await allCountries()
        res.status(200).json(countries)
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.get("/countries/:id", async (req, res) => {
    try {
        const { id } = req.params
        const country = await countryById(id)
        res.status(200).json(country)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.get("/country", async (req, res) => {
    try {
        const { name } = req.query
        const country = await countryByName(name)
        res.status(200).json(country)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.post("/activity", async (req, res) => {
    try {
        const { name, dificult, duration, season, countryId, countryId2, countryId3 } = req.body;
        const response = await addActivities(name, dificult, duration, season, countryId, countryId2, countryId3);
        if(!response.create) throw new Error(response.error)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error.message)
        console.log(error);
    }
})

router.delete("/activity", async (req, res) => {
    try {
        const { countryId, activityId } = req.query;
        const response = await removeAct(countryId, activityId);
        res.status(200).send(response)
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message)
    }
})

router.delete("/activity/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await deleteAct(id);
        res.status(200).send(response)
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message)
    }
})

router.get("/activity", async (req, res) => {
    try {
        const { activity } = req.query;
        const countries = await filterActivities(activity);
        res.status(200).json(countries)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/activities", async (req, res) => {
    try {
        const activities = await getActivities()
        res.status(200).json(activities)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put("/activity/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, duration, dificult, season } = req.body;
        const response = await editActivity(id, name, season, duration, dificult);
        res.status(200).send(response)
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message)
    }
})

module.exports = router;