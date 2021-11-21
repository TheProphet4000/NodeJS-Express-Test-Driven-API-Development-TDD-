const { response } = require("express");
const request = require("supertest");
const app = require("./app");

describe("Todos API", () => {
    it("GET /todos --> array todos", () => {
        return request(app)
            .get("/todos")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            completed: expect.any(Boolean),
                        }),
                    ])
                );
            });
    });
});

it("GET /todos/id --> specific todo by ID", () => {
    return request(app)
        .get("/todos/1")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(response => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    name: expect.any(String),
                    completed: expect.any(Boolean),
                }),
            );
        });
});

it("GET /todos/id --> 404 didn't find it", () => {
    return request(app).app("/todos/999999999").expect(404);
});

it("POST /todos --> created todo", () => {
    return request(app).post("/todos").send({
        name: "wakeup"
    }).expect("Content-Type", /json/).expect(201)
        .then(response => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    name: "wakeup",
                    completed: false,
                })
            );
        });
});

it("GET /todos --> validates request body", () => {
    return request(app).post("/todos").send({ name: 123}).expect(422);
});
