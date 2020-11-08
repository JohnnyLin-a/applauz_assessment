import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
// import { networkRequest } from '../helpers/networkHelper';

const Client = () => {
    const [params, setParams] = useState([]);
    const [body, setBody] = useState();
    const [method, setMethod] = useState("GET");

    const onClickSend = (e) => {
        console.log("onClickSend")
    }

    return (
        <div className="container">
            <div className="mt-4 mb-4">
                <h1>Web client</h1>
            </div>
            <div>
                <Row>
                    <Col md={12}>
                        <form>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <DropdownButton variant="outline-primary" title={method}>
                                            <Dropdown.Item onClick={() => { setMethod("GET") }}>GET</Dropdown.Item>
                                            <Dropdown.Item onClick={() => { setMethod("POST") }}>POST</Dropdown.Item>
                                            <Dropdown.Item onClick={() => { setMethod("DELETE") }}>DELETE</Dropdown.Item>
                                        </DropdownButton>
                                        <div className="input-group-text">
                                            {process.env.REACT_APP_API_URL || "Please make a copy of .env.exmaple to .env in the web-client directory"}
                                        </div>
                                    </div>
                                    <div className="flex-fill" >
                                        <input type="text" className="form-control" placeholder="/api/users/" />
                                    </div>
                                    <div className="input-group-append">
                                        <button type="button" className="btn btn-primary btn-block" onClick={onClickSend}>Send</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Client;