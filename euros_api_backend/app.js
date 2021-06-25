const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

let teamData = {"data":
            [{
                "team" : "england",
                "squad" : [
                    'Pickford',
                    'Kane',
                    'Sterling',
                    'Others'
                ],
                "status" : "qualified"     
            },
            {
                "team" : "wales",
                "squad" : [
                    'Bale',
                    'Ramsey'
                ],
                "status" : "qualified"    
            },
            {
                "team" : "scotland",
                "squad" : [
                    'Gilmour'
                ],
                "status" : "eliminated"    
            }]      
        }

app.get('/', (req, res) => {
    res.send(teamData);
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
    console.log('test');
    let result = teamData.data.filter(c => c.status === "eliminated");
    console.log(result);
    res.send(result);
})

app.get('/:country', (req,res) => {
    let country = req.params.country;
    let requestedCountry = teamData.data.find(c => c.team === country)
    res.send(requestedCountry);
})

module.exports = app;