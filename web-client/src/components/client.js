import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
// import { networkRequest } from '../helpers/networkHelper';

const Client = () => {
    const [method, setMethod] = useState("GET");

    const [headers, setHeaders] = useState([])
    const [params, setParams] = useState([]);
    const [body, setBody] = useState("");

    const [headerChecked, setHeaderChecked] = useState(true);
    const [paramsChecked, setParamsChecked] = useState(false);
    const [bodyChecked, setBodyChecked] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const [jsonParseError, setJsonParseError] = useState(false);

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
                        {headerChecked && <div>
                            {headers.map((header, index) =>
                                <form key={index}>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <Button variant="danger" onClick={() => {
                                                    let newHeaders = [...headers];
                                                    newHeaders.splice(index, 1);
                                                    setHeaders(newHeaders);
                                                }}>Remove</Button>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Key" value={header.key} onChange={e => {
                                                let newHeaders = [...headers];
                                                newHeaders[index].key = e.target.value;
                                                setHeaders(newHeaders);
                                            }} />
                                            <input type="text" className="form-control" placeholder="Value" value={header.value} onChange={e => {
                                                let newHeaders = [...headers];
                                                newHeaders[index].value = e.target.value;
                                                setHeaders(newHeaders);
                                            }} />
                                        </div>
                                    </div>
                                </form>
                            )}
                            <Row>
                                <Col>
                                    <Button block variant="success" onClick={() => {
                                        const newHeaders = [{ key: "", value: "" }, ...headers]
                                        setHeaders(newHeaders);
                                    }}>
                                        Add
                                    </Button>
                                </Col>
                                <Col>
                                    <Button block variant="primary" onClick={() => {
                                        const newHeaders = [{ key: "api_key", value: (process.env.REACT_APP_API_KEY || "API_KEY_NOT_FOUND") }, ...headers]
                                        setHeaders(newHeaders);
                                    }}>
                                        Add api_key
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        }
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
                        {paramsChecked && <div>
                            {params.map((param, index) =>
                                <form key={index}>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <Button variant="danger" onClick={() => {
                                                    let newParams = [...params];
                                                    newParams.splice(index, 1);
                                                    setParams(newParams);
                                                }}>Remove</Button>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Key" value={param.key} onChange={e => {
                                                let newParams = [...params];
                                                newParams[index].key = e.target.value;
                                                setParams(newParams);
                                            }} />
                                            <input type="text" className="form-control" placeholder="Value" value={param.value} onChange={e => {
                                                let newParams = [...params];
                                                newParams[index].value = e.target.value;
                                                setParams(newParams);
                                            }} />
                                        </div>
                                    </div>
                                </form>
                            )}
                            <Row>
                                <Col>
                                    <Button block variant="success" onClick={() => {
                                        const newParams = [{ key: "", value: "" }, ...params]
                                        setParams(newParams);
                                    }}>
                                        Add
                                    </Button>
                                </Col>
                                <Col>
                                    <Button block variant="primary" onClick={() => {
                                        const newParams = [{ key: "name", value: "" }, ...params]
                                        setParams(newParams);
                                    }}>
                                        Add 'name' param
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        }
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
                        {bodyChecked && <div>
                            {jsonParseError && <Alert variant="danger">JSON syntax error</Alert>}
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={5} onChange={e => {
                                    try {
                                        JSON.parse(e.target.value);
                                        setJsonParseError(false);
                                    } catch (err) {
                                        setJsonParseError(true);
                                    }
                                    setBody(e.target.value);
                                }} />
                            </Form.Group>
                        </div>}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Client;