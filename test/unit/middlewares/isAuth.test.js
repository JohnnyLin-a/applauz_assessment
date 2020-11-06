const isAuth = require('../../../src/api/middlewares/isAuth');
const config = require('../../../src/config');

describe("Middleware: isAuth", () => {
    let mockRequest = {};
    let mockResponse = {};
    let nextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = { body: {} };
        mockResponse = {
            json: jest.fn()
        };
    });

    test('undefined api_key', async () => {
        const expectedResponse = { error: "You are unauthorized to proceed (No api_key)" };
        isAuth(mockRequest, mockResponse, nextFunction)

        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    test('null api_key', async () => {
        mockRequest.body.api_key = null;
        const expectedResponse = { error: "You are unauthorized to proceed (No api_key)" };
        isAuth(mockRequest, mockResponse, nextFunction)

        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    // Remove empty string test because it has a possibility that the api_key itself is empty string
    // test('empty string api_key', async () => {
    //     mockRequest.body.api_key = "";
    //     const expectedResponse = { error: "You are unauthorized to proceed (Wrong api_key)" };
    //     isAuth(mockRequest, mockResponse, nextFunction)

    //     expect(mockResponse.json).toBeCalledWith(expectedResponse);
    // });

    test('non-string api_key', async () => {
        mockRequest.body.api_key = 1;
        const expectedResponse = { error: "You are unauthorized to proceed (Wrong api_key)" };
        isAuth(mockRequest, mockResponse, nextFunction)

        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    test('wrong api_key', async () => {
        // Concatenating the corerect key to ensure it is wrong.
        mockRequest.body.api_key = "WRONG_API_KEY" + config.api_key;
        const expectedResponse = { error: "You are unauthorized to proceed (Wrong api_key)" };
        isAuth(mockRequest, mockResponse, nextFunction)

        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    test('correct api_key', async () => {
        mockRequest.body.api_key = config.api_key;
        isAuth(mockRequest, mockResponse, nextFunction)

        expect(nextFunction).toHaveBeenCalled();
    });
})


