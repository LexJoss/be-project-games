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

    test("The returned array contains the complete categories column", () => {
        return request(app).get('/api/categories').expect(200)
        .then(response => {
            const categories = response.body
            expect(categories.length).toBe(4)
        })
    })
})
describe("2nd endpoint, reviews, can return status 200", () => {
    test("Get:200 - a get request returns a status 200", () => {
        return request(app).get('/api/reviews').expect(200)
    })
    test("The returned reviews object contains the correct categories", () => {
        return request(app).get('/api/reviews').expect(200)
        .then(response => {
            const reviews = response.body
            reviews.forEach((review) => {
                expect(review).toHaveProperty('owner', expect.any(String))
                expect(review).toHaveProperty('title', expect.any(String))
                expect(review).toHaveProperty('votes', expect.any(Number))
                expect(review).toHaveProperty('created_at', expect.any(String))
                expect(review).toHaveProperty('category', expect.any(String))
                expect(review).toHaveProperty('review_img_url', expect.any(String))
                expect(review).toHaveProperty('designer', expect.any(String))
                expect(review).toHaveProperty('review_id', expect.any(Number))
            })
        
        })
    }) 
    test("Can return reviews in descending order by date created", () => {
        return request(app).get('/api/reviews').expect(200)
        .then(response => {
            const reviews = response.body
            expect(reviews).toBeSorted({descending: true})
        })
    })
    test("Can return the number of comments that share the review_id property of the parent review", () => {
        return request(app).get('/api/reviews').expect(200)
        .then(response => {
            const reviews = response.body
            const regex = /[0-9]*/
            reviews.forEach((review) => {
                expect(review).toHaveProperty('comment_count', expect.any(String))
                expect(review.comment_count).toMatch(regex)
            })
            
        })
    })
})




