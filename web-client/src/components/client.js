import React, { useEffect } from 'react';
import { networkRequest } from '../helpers/networkHelper';

const Client = () => {
    useEffect(() => {
        networkRequest("/", "GET", { 'api_key': "APPLAUZ_ASSESSMENT_API_KEY" }, null, null, () => {

        })
    }, [])
    return (
        <div>
            <p>Hello World</p>
        </div>
    );
}

export default Client;