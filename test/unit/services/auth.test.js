const { validateApiKey } = require('../../../src/services/auth');
const config = require('../../../src/config');

describe("Service: auth.validateKey", () => {

    test('undefined api_key', () => {
        const valid = validateApiKey(undefined);

        expect(valid).toBe(false);
    });

    test('null api_key', async () => {
        const valid = validateApiKey(null);

        expect(valid).toBe(false);
    });

    test('non-string api_key', async () => {
        const valid = validateApiKey(1);

        expect(valid).toBe(false);
    });

    test('wrong api_key', async () => {
        const valid = validateApiKey("WRONG_API_KEY" + config.api_key);

        expect(valid).toBe(false);
    });

    test('correct api_key', async () => {
        const valid = validateApiKey(config.api_key);

        expect(valid).toBe(true);
    });
})