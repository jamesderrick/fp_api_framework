const app = require('../app');
const request = require('supertest');

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

    afterAll((done) => {
        api.close(done);
    })
})