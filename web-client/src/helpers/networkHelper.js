export const networkRequest = async (endpoint: string, method: string, headers, params: Array, body, callback: function) => {
    let fetchOptions = { method, cors: "cors" };
    if (headers) fetchOptions.headers = headers;
    if (params) endpoint += "?" + new URLSearchParams(params);
    if (body) fetchOptions.body = JSON.stringify(body);

    fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, fetchOptions)
        .then(response => response.text()
            .then(data => {
                return { status: response.status, data }
            })
        )
        .then(({ status, data }) => {
            console.log("status, data", status, data);
            callback({ status, data });
        })
        .catch(error => {
            console.log("networkRequest error:", error);
        })
}