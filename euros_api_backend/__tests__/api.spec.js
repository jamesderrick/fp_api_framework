const app = require('../app');
const request = require('supertest');

const fs = require('fs');
const teamData = JSON.parse(fs.readFileSync('data.json'));

describe('api server', () => {
    let api;
    let port = 5000;

    beforeAll(() => {
        api = app.listen(port, () => {
            console.log(`Server up and running on localhost port ${port}`);
        })
    })

    test('api responds to GET / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    })

    test('api responds to GET /teams with status 200', (done) => {
        request(api).get('/teams').expect(200, done);
    })

    test('responds to delete /country/countryName with status 204', (done) => {

        let array = ['england','wales','scotland'];
        let randIndex = Math.floor(Math.random() * array.length)
        request(api).delete(`/country/${array[randIndex]}`).expect(204, done)
    })

    afterAll((done) => {
        api.close(done);
    })
})