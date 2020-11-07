const { Pool } = require('pg');
const { postgres_config } = require('../../../../src/config');

describe("Service: database", () => {
    describe('pool', () => {
        let pool = null;
        beforeAll(() => {
            pool = new Pool(postgres_config);
        })
        afterAll(async () => {
            await pool.end();
        })
        test('connection', async () => {
            let success = null;
            try {
                await pool.query("SELECT NOW() AS now");
                success = true;
            } catch (err) {
                console.log("Connection error", err);
                success = false;
            }
            expect(success).toBe(true);
        });
    })
})