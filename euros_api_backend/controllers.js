const express = require('express');
const router = express.Router();

const fs = require('fs');
const teamData = JSON.parse(fs.readFileSync('data.json'));

router.get('/:country', (req,res) => {

    try {
        let country = req.params.country;
        let requestedCountry = teamData.data.find(c => c.team === country)
        if (!requestedCountry) {
            throw new Error("Country Not Found!")
        }
        res.send(requestedCountry);
    } catch (error) {
        res.status(404).send({message: error.message})
    }

})

router.put('/:country', (req,res) => {
    let country = req.params.country;
    let requestedCountry = teamData.data.find(c => c.team === country)

    let body = req.body;
    requestedCountry.status = body;
    res.status(405).send(teamData);
})

router.delete('/:country', (req,res) => {
    let country = req.params.country;
    let requestedCountry = teamData.data.find(c => c.team === country)
    teamData.data = teamData.data.filter(element => (element.team != country))
    console.log(teamData.data);
    res.status(204).send(teamData);
})

module.exports = router;