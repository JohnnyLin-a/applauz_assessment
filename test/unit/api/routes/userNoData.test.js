const request = require("supertest");
const config = require("../../../../src/config");
const app = require("../../../../src/app");
const { closePool, newPool, getPool } = require('../../../../src/services/database');

let testUsers = [];

beforeAll(async () => {
    // Open db connection
    newPool();

    // delete all users
    await getPool().query("DELETE FROM users");
})

afterAll(async () => {
    // Close db connection
    await closePool();
})

describe("Route: /api/users/ (No users in DB)", () => {
    test("GET /api/users/", async () => {
        const response = await request(app)
            .get("/api/users/")
            .set('api_key', config.api_key);
        expect(response.statusCode).toBe(404);
        expect(response.body).toMatchObject({ error: "No registered user" });
    });
});