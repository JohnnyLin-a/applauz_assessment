import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import React, { useState } from 'react';
// import { networkRequest } from '../helpers/networkHelper';

const Client = () => {
    const [method, setMethod] = useState("GET");

    const [header, setHeader] = useState({})
    const [params, setParams] = useState([]);
    const [body, setBody] = useState({});

    const [headerChecked, setHeaderChecked] = useState(true);
    const [paramsChecked, setParamsChecked] = useState(false);
    const [bodyChecked, setBodyChecked] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const onClickSend = (e) => {
        console.log("onClickSend")
    }

    return (
        <div className="container">
            <div className="mt-4 mb-4">
                <h1>Web client</h1>
            </div>
            {message !== "" &&
                <div>
                    <Alert variant={error ? "danger" : "success"}>
                        {message}
                    </Alert>
                </div>
            }
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

                <Row>
                    <Col className="text-center">
                        <div className="px-5 mx-auto form-check-inline" onClick={() => { setHeaderChecked(!headerChecked) }}>
                            <input className="my-auto mr-3" type="checkbox" name="headerChecked" checked={headerChecked} onChange={() => { setHeaderChecked(!headerChecked) }} />
                            <div className="my-auto ">
                                <h3 >
                                    Header
                                </h3>
                            </div>
                        </div>
                    </Col>
                    <Col className="text-center">
                        <div className="px-5 mx-auto form-check-inline" onClick={() => { setParamsChecked(!paramsChecked) }}>
                            <input className="my-auto mr-3" type="checkbox" name="paramsChecked" checked={paramsChecked} onChange={() => { setParamsChecked(!paramsChecked) }} />
                            <div className="my-auto ">
                                <h3 >
                                    Params
                                </h3>
                            </div>
                        </div>
                    </Col>
                    <Col className="text-center">
                        <div className="px-5 mx-auto form-check-inline" onClick={() => { setBodyChecked(!bodyChecked) }}>
                            <input className="my-auto mr-3" type="checkbox" name="headerChecked" checked={bodyChecked} onChange={() => { setBodyChecked(!bodyChecked) }} />
                            <div className="my-auto">
                                <h3>
                                    Body
                                </h3>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Client;