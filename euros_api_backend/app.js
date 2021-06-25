const express = require('express');
const cors = require('cors');
const fs = require('fs');

const teamData = JSON.parse(fs.readFileSync('data.json'));

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const countryController = require("./controllers");

app.use("/country", countryController);

app.get('/', (req, res) => {
    res.send(teamData);
})

app.post('/', (req,res) => {
    try {
        let body = req.body;
        teamData.data.push(body);
        // console.log(body);
        res.status(201).send(teamData);
    } catch (error) {
        console.log(error);
    }
})

app.get('/teams', (req,res) => {
    let result = teamData.data;
    let teams = [];
    result.forEach(team => {
        teams.push(team.team)
    })
    res.send(teams)
})

app.get('/qualified', (req,res) => {
    let result = teamData.data.filter(c => c.status === "qualified");
    res.send(result);
})

app.get('/eliminated', (req,res) => {
    let result = teamData.data.filter(c => c.status === "eliminated");
    console.log(result);
    res.send(result);
})

// app.get('/:country', (req,res) => {
//     let country = req.params.country;
//     let requestedCountry = teamData.data.find(c => c.team === country)
//     res.send(requestedCountry);
// })

// app.put('/:country', (req,res) => {
//     let country = req.params.country;
//     let requestedCountry = teamData.data.find(c => c.team === country)

//     let body = req.body;
//     requestedCountry.status = body;
//     res.status(405).send(teamData);
// })

// app.delete('/:country', (req,res) => {
//     let country = req.params.country;
//     let requestedCountry = teamData.data.find(c => c.team === country)
//     teamData.data = teamData.data.filter(element => (element.team != country))
//     console.log(teamData.data);
//     res.status(204).send(teamData);
// })

function dataSet() {
    return teamData;
}

const data = dataSet();

module.exports = app;