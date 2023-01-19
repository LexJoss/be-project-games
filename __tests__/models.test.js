const request = require ("supertest")
const seed = require ("../db/seeds/seed")
const data = require ("../db/data/test-data/index")
const  db   = require ("../db/connection")
const app = require ("../db/app")
const comments = require("../db/data/test-data/comments")





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
            expect(reviews.length).not.toBe(0)
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

describe("3rd endpoint, parametric. Get reviews by I.D", () => {
    test("end point response with status 200", () => {
        return request(app).get('/api/reviews/1').expect(200)
    })
    test("The returned reviews object contains the correct categories", () => {
        return request(app).get('/api/reviews/1').expect(200)
        .then(response => {
            const review = response.body
                expect(review[0]).toHaveProperty('owner', expect.any(String))
                expect(review[0]).toHaveProperty('title', expect.any(String))
                expect(review[0]).toHaveProperty('votes', expect.any(Number))
                expect(review[0]).toHaveProperty('created_at', expect.any(String))
                expect(review[0]).toHaveProperty('category', expect.any(String))
                expect(review[0]).toHaveProperty('review_img_url', expect.any(String))
                expect(review[0]).toHaveProperty('designer', expect.any(String))
                expect(review[0]).toHaveProperty('review_id', expect.any(Number))
        
        })
    })
    test("The response body only contains one element, which has the correct ID", () => {
        return request(app).get('/api/reviews/1').expect(200)
        .then(response => {
            const review = response.body
            expect(review.length).toBe(1)
            expect(review[0].review_id).toBe(1)
        })
    }) 
    test("Will respond with an error message if an unavailable ID is given", () => {
        return request(app).get('/api/reviews/10000').expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Not Found")
        })
    })
    test("Will respond with an error message if an invalid parameter is given", () => {
        return request(app).get('/api/reviews/cheese').expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Not Found")
        })
    })
})
describe("4th endpoint, comments by review id", () => {
    test("4th endpoint responds with a status 200", () => {
        return request(app).get('/api/reviews/2/comments').expect(200)
    })

    test("The return object has the correct keys for a comment", () => {
        return request(app).get('/api/reviews/2/comments').expect(200)
        .then (response => {
            const comments = response.body
            expect(comments.length).not.toBe(0)
            comments.forEach((comment) => {
            expect(comment).toHaveProperty('comment_id', expect.any(Number))
            expect(comment).toHaveProperty('votes', expect.any(Number))
            expect(comment).toHaveProperty('created_at', expect.any(String))
            expect(comment).toHaveProperty('author', expect.any(String))
            expect(comment).toHaveProperty('body', expect.any(String))
            expect(comment).toHaveProperty('review_id', expect.any(Number))
        })
    })
    })
    test('The return object resolves with the correct review_id per comment', () => {
        return request(app).get('/api/reviews/2/comments').expect(200)
        .then (response => {
            const comments = response.body
            comments.forEach((comment) =>{
                expect(comment.review_id).toBe(2)
            })
        })
    })
    test("Will respond with an error message if an unavailable ID is given", () => {
        return request(app).get('/api/reviews/1/comments').expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Not Found")
        })
    })
    test("Will respond with an error message if an invalid parameter is given", () => {
        return request(app).get('/api/reviews/cheese').expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Not Found")
        })
    })
})



