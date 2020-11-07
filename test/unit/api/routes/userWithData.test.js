const request = require("supertest");
const config = require("../../../../src/config");
const app = require("../../../../src/app");
const { closePool, newPool, getPool } = require('../../../../src/services/database');
const { resource } = require("../../../../src/app");

let testUsers = [];

beforeAll(async () => {
    // Open db connection
    newPool();
    // Generate 4 test users
    // 1- Keep in db until the end for all select queries
    // 2- Test delete with this
    // 3- Delete immediately to test for user not found
    // 4- Delete immediately to test insert of this same name 
    let generatedUsers = 0;
    while (generatedUsers < 4) {
        const result = await getPool().query("INSERT INTO users (name) VALUES ($1) RETURNING *", [("Randname" + Math.random().toString())]);
        if (!(result instanceof Error)) {
            testUsers[generatedUsers] = result.rows[0];
            generatedUsers++;
        }
    }

    await getPool().query("DELETE FROM users WHERE id = $1", [testUsers[2].id]);
    await getPool().query("DELETE FROM users WHERE id = $1", [testUsers[3].id]);
})

afterAll(async () => {
    // Delete test users
    for (let i = 0; i < testUsers.length; i++) {
        await getPool().query("DELETE FROM users WHERE id = $1", [testUsers[i].id])
    }
    // Deleting deleted ids won't throw any error, just that the rowCount will be 0

    // Close db connection
    await closePool();
})

describe("Route: /api/users/ (With data in DB)", () => {
    test("GET /api/users/ ", async () => {
        const response = await request(app)
            .get("/api/users/")
            .set('api_key', config.api_key);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        response.body.forEach(user => {
            expect(typeof user.id === 'number').toBe(true);
            expect(typeof user.name === 'string').toBe(true);
        });
    });

    test("GET /api/users/ (with valid query string ?name=)", async () => {
        const response = await request(app)
            .get("/api/users/")
            .query({ name: testUsers[0].name })
            .set('api_key', config.api_key);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(testUsers[0]);
    });

    test("GET /api/users/ (invalid query string)", async () => {
        const response = await request(app)
            .get("/api/users/")
            .query({ name: "AB" })
            .set('api_key', config.api_key);
        expect(response.statusCode).toBe(400);
        expect(typeof response.body.error !== 'undefined').toBe(true);
    });

    test("GET /api/users/ (name not found)", async () => {
        const response = await request(app)
            .get("/api/users/")
            .query({ name: testUsers[2].name })
            .set('api_key', config.api_key);
        expect(response.statusCode).toBe(404);
        expect(typeof response.body.error !== 'undefined').toBe(true);
    });

    test("GET /api/users/:id", async () => {
        const response = await request(app)
            .get("/api/users/" + testUsers[0].id)
            .set('api_key', config.api_key);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(testUsers[0]);
    });

    test("GET /api/users/:id (invalid id as string)", async () => {
        const response = await request(app)
            .get("/api/users/" + "STRING-INVALID")
            .set('api_key', config.api_key);
        expect(response.statusCode).toBe(404);
    });

    test("GET /api/users/:id (invalid id as floating point number)", async () => {
        const response = await request(app)
            .get("/api/users/" + 2.34)
            .set('api_key', config.api_key);
        expect(response.statusCode).toBe(404);
    });

    test("GET /api/users/:id (user not found)", async () => {
        const response = await request(app)
            .get("/api/users/" + testUsers[2].id)
            .set('api_key', config.api_key);
        expect(response.statusCode).toBe(404);
    });

    test("POST /api/users/", async () => {
        const response = await request(app)
            .post("/api/users/")
            .set('api_key', config.api_key)
            .send({ name: testUsers[3].name });
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(typeof response.body.id).toBe("number");


    });

    test("POST /api/users/ (invalid body)", async () => {
        const response = await request(app)
            .post("/api/users/")
            .set('api_key', config.api_key)
            .send({});
        expect(response.statusCode).toBe(400);
    });

    test("POST /api/users/ (user already exists)", async () => {
        const response = await request(app)
            .post("/api/users/")
            .set('api_key', config.api_key)
            .send({ name: testUsers[0].name });
        expect(response.statusCode).toBe(500);
        expect(response.body.error.includes("already exists.")).toBe(true);
    });

    test("DELETE /api/users/", async () => {
        const response = await request(app)
            .delete("/api/users/")
            .set('api_key', config.api_key)
            .send({ id: testUsers[1].id });
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({ success: true });

        // Select the deleted id.
        const { rows } = await getPool().query("SELECT * FROM users WHERE id = $1", [testUsers[1].id]);
        expect(rows.length).toBe(0);
    });

    test("DELETE /api/users/ (invalid body no id)", async () => {
        const response = await request(app)
            .delete("/api/users/")
            .set('api_key', config.api_key)
            .send({});
        expect(response.statusCode).toBe(400);
    });

    test("DELETE /api/users/ (invalid body id is string)", async () => {
        const response = await request(app)
            .delete("/api/users/")
            .set('api_key', config.api_key)
            .send({ id: "string" });
        expect(response.statusCode).toBe(400);
    });

    test("DELETE /api/users/ (invalid body id is a floating point number)", async () => {
        const response = await request(app)
            .delete("/api/users/")
            .set('api_key', config.api_key)
            .send({ id: 2.33 });
        expect(response.statusCode).toBe(400);
    });

    test("DELETE /api/users/ (not found)", async () => {
        const response = await request(app)
            .delete("/api/users/")
            .set('api_key', config.api_key)
            .send({ id: testUsers[2].id });
        expect(response.statusCode).toBe(404);
    });
});