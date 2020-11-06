const { pool } = require('../../../../src/services/database');

describe("Service: database.pool", () => {
    afterAll(async () => {
        return await pool.end();
    })
    test('connection', async () => {
        let success = true;
        pool.query("SELECT NOW() AS now", (err, res) => {
            if (err) {
                success = false;
            }
        })

        expect(success).toBe(true);
    });
})