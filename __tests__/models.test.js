const request = require ("supertest")
const seed = require ("../db/seeds/seed")
const data = require ("../db/data/test-data/index")
const  db   = require ("../db/connection")
const app = require ("../db/app")

beforeEach(() => {
    return seed(data)
})

afterAll(() => {
    db.end()
})

describe("app.get", () => {
    test("Get:200 - a get request returns a status 200", () => {
        return request(app).get('/api/categories').expect(200)
    })
    test("The returned data contains the properties 'slug', and 'description", () => {
        return request(app).get('/api/categories').expect(200)
        .then(response => {
            const categories = response.body
            categories.forEach((category) => {
                expect(category).toHaveProperty('slug', expect.any(String))
                expect(category).toHaveProperty('description', expect.any(String))
            })
        })
    })
})