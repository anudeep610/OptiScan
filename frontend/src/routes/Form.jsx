import React, { useState } from "react";
import { Form, Button, Modal, Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import axios from "axios";

import { ReactComponent as CancerLogo } from "../assets/icons/logo.svg";
import { ReactComponent as HeartIcon } from "../assets/icons/heart.svg";
import analyse from "../assets/images/analyse.png";

import "../css/Form.css";

const FormPage = () => {

    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        disease: [],
        image: null,
        email: ""
    });

    const handlechange = (event) => {
        const { name, value, checked } = event.target;
        if (name === 'disease') {
            if (checked) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    disease: [...prevFormData.disease, value],
                }));
            } else {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    disease: prevFormData.disease.filter((d) => d !== value),
                }));
            }
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };


    const handleImageChange = (event) => {
        const image = event.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            image,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.disease.length === 0) {
            setAlertText("Please select at least one disease.");
            handleShow();
            return;
        }

        setLoading(true);
        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('email', formData.email);
        formDataObj.append('gender', formData.gender);
        formDataObj.append('age', formData.age);
        formDataObj.append('iris', formData.image);
        formDataObj.append('disease', formData.disease);

        const response = await axios.post(
            "http://localhost:3001/submit/analyse",
            formDataObj
        ).catch((err) => {
            setLoading(false);
            setAlertText("something went wrong");
            handleShow();
        });

        if (response && response.data.type === "success" && response.data.valid === 1) {
            setLoading(false);
            const resultData = response.data.data; // Array containing the result data
            // Construct the table HTML
            const tableHTML = `
                <table>
                    <thead>
                    <tr>
                        <th style="padding-right: 10px;">Disease</th>
                        <th>Percentage</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${resultData
                            .map(
                                (result) => `
                                <tr>
                                <td style="padding-right: 10px;">${result[0]}</td>
                                <td>${(result[1] * 100).toFixed(2)}</td>
                                </tr>
                            `
                            )
                            .join("")}
                    </tbody>
                </table>
            `;
            setAlertText(<div> <p>{response.data.message}</p> <div dangerouslySetInnerHTML={{ __html: tableHTML }}></div> </div>); // Set the table HTML as the alert text
            handleShow();
            setFormData({
                name: "",
                age: "",
                gender: "",
                disease: [],
                image: null,
                email: ""
            });
        } else if (response && response.data.type === "success" && response.data.valid === 0) {
            setAlertText(response.data.message);
            handleShow();
            setFormData({
                name: "",
                age: "",
                gender: "",
                disease: [],
                image: null,
                email: ""
            });
        } else {
            console.log(response);
            setAlertText("something went wrong ;)");
            handleShow();
            setFormData({
                name: "",
                age: "",
                gender: "",
                disease: [],
                image: null,
                email: ""
            });
        }
        setLoading(false);
    };

    return (
        <div className="prediction-page-container">

            <Navbar fixed={"top"} expand="lg" className="navbar-custom">
                <Container>
                    <Navbar.Brand href="/#hero">
                        <CancerLogo style={{ color: '#ed7567', margin: "0 15px" }} height="32" width="32" className="mr-2" />
                        OptiScan
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/#about-us">About</Nav.Link>
                            <Nav.Link href="/#get-started">How it works??</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {
                !loading && <div className="content-container">
                    <h1 className="text-center my-5 main-heading">"Empower your vision. Unveil the secrets of your eyes."</h1>
                    <div className="prediction-hero-container">
                        <div className="image-container">
                            <img src={analyse} alt="analyse" />
                        </div>

                        <div className="prediction-form-container">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicName" className="py-3">
                                    <Form.Label className="label">Name :</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => handlechange(e)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicName" className="py-3">
                                    <Form.Label className="label">Email :</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your email"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) => handlechange(e)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicAge" className="py-3">
                                    <Form.Label className="label">Age :</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter your age"
                                        name="age"
                                        value={formData.age}
                                        onChange={(e) => handlechange(e)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicGender" className="py-3">
                                    <Form.Label className="label">Gender :</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={(e) => handlechange(e)}
                                        required
                                    >
                                        <option value="">Select gender :</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formBasicImage" className="py-3">
                                    <Form.Label className="label">Upload an iris image :</Form.Label>
                                    <Form.Control type="file" onChange={(e) => handleImageChange(e)} required />
                                </Form.Group>

                                <div key={`default-radio`} className="py-3">
                                    <Form.Label className="label">Select the disease :</Form.Label>
                                    <Form.Check
                                        default
                                        label="Cataract"
                                        name="disease"
                                        type="checkbox"
                                        id={`default-checkbox-1`}
                                        value={1}
                                        onChange={(e) => handlechange(e)}
                                    />
                                    <Form.Check
                                        default
                                        label="Myopia"
                                        name="disease"
                                        type="checkbox"
                                        id={`default-checkbox-3`}
                                        value={2}
                                        onChange={(e) => handlechange(e)}
                                    />
                                    <Form.Check
                                        default
                                        label="Hypertension"
                                        name="disease"
                                        type="checkbox"
                                        id={`default-checkbox-5`}
                                        onChange={(e) => handlechange(e)}
                                        value={3}
                                    />
                                    <Form.Check
                                        default
                                        label="Glaucoma"
                                        name="disease"
                                        type="checkbox"
                                        id={`default-checkbox-6`}
                                        value={4}
                                        onChange={(e) => handlechange(e)}
                                    />
                                    <Form.Check
                                        default
                                        label="Retinoblastoma"
                                        name="disease"
                                        type="checkbox"
                                        id={`default-checkbox-6`}
                                        value={5}
                                        onChange={(e) => handlechange(e)}
                                    />
                                    {/* <Form.Check
                                        default
                                        label="Normal"
                                        name="disease"
                                        type="checkbox"
                                        id={`default-checkbox-6`}
                                        value={6}
                                        onChange={(e) => handlechange(e)}
                                    /> */}
                                </div>

                                <Button style={{ backgroundColor: "#33627c", outline: "none" }} variant="primary" type="" className="my-3">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            }

            {
                loading && <div className="loader">
                    <Bars
                        height="100"
                        width="100"
                        color="#33627c"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            }

            <footer className="bg-light">
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} md={4} lg={6} className="text-center">
                            <p>
                                &copy; 2023 OptiScan.
                                <HeartIcon style={{ alignSelf: "center", color: "red" }} height="18" width="18" className="mr-2 my-4" /> Made with love.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {alertText}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default FormPage;
