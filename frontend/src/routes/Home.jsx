import React from "react";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Home.css";

import { ReactComponent as CancerLogo } from "../assets/icons/logo.svg";
import { ReactComponent as QuestionMark } from "../assets/icons/question_mark.svg";
import { ReactComponent as UplaodIcon } from "../assets/icons/upload.svg";
import { ReactComponent as CpuIcon } from "../assets/icons/cpu.svg";
import { ReactComponent as RecieveIcon } from "../assets/icons/receive.svg";
import { ReactComponent as HeartIcon } from "../assets/icons/heart.svg";
import hero from "../assets/images/eye.png";

function HomePage() {
    return (
        <div>
            <Navbar fixed={"top"} expand="lg" className="navbar-custom">
                <Container>
                    <Navbar.Brand href="#hero">
                        <CancerLogo style={{ color: '#ed7567', margin: "0 15px" }} height="32" width="32" className="mr-2" />
                        OptiScan
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="#about-us">About</Nav.Link>
                            <Nav.Link href="#get-started">How it works??</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="hero-section d-flex align-items-center py-5" id="hero">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h1 className="mb-4">See Clearly, Stay Healthy</h1>
                            <p className="mb-4">
                                Your eyes are the windows to your world. Keep them healthy with our advanced eye disease detection algorithms!!!
                            </p>
                            <Link to="/form">
                                <Button style={{ backgroundColor: "#33627c" }} size="lg" className="hero-button">Get Started</Button>
                            </Link>
                        </Col>
                        <Col md={6}>
                            <img src={hero} alt="hero-section" className="img-fluid" />
                        </Col>
                    </Row>
                </Container>
            </div>

            <section id="about-us" className="py-5">
                <Container>
                    <Row>
                        <Col lg={8} className="mx-auto">
                            <h2 className="mb-4">About Us</h2>
                            <p className="lead">Our mission is to improve eye health and prevent vision loss caused by various eye diseases. Our website provides a quick and easy way to detect and diagnose eye diseases, allowing for early treatment and intervention.</p>
                            <p className="lead">Our team of medical professionals and technology experts are dedicated to providing accurate and reliable results for our users. We believe that everyone deserves access to affordable and effective eye care.</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <div className="statistics-section py-5 mt-5">
                <Container className="my-5">
                    <Row className="justify-content-center">
                        <Col md={5} className="mb-5">
                            <div className="statistics-card p-4 text-center">
                                <h3 className="mb-3 sub-heading">Cataracts</h3>
                                <p className="mb-0">10 million cases per year</p>
                            </div>
                        </Col>
                        <Col md={5} className="mb-5">
                            <div className="statistics-card p-4 text-center">
                                <h3 className="mb-3 sub-heading">Glaucoma</h3>
                                <p className="mb-0">3 million cases per year</p>
                            </div>
                        </Col>
                        <Col md={5} className="mb-5">
                            <div className="statistics-card p-4 text-center">
                                <h3 className="mb-3 sub-heading">Diabetic Retinopathy</h3>
                                <p className="mb-0">2 million cases per year</p>
                            </div>
                        </Col>
                        <Col md={5} className="mb-5">
                            <div className="statistics-card p-4 text-center">
                                <h3 className="mb-3 sub-heading">Diabetic Retinopathy</h3>
                                <p className="mb-0">2 million cases per year</p>
                            </div>
                        </Col>
                        <Col md={5} className="mb-5">
                            <div className="statistics-card p-4 text-center">
                                <h3 className="mb-3 sub-heading">Diabetic Retinopathy</h3>
                                <p className="mb-0">2 million cases per year</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="how-it-works-section py-5" id="get-started">
                <Container>
                    <h2 className="text-center mb-5" style={{ display: "flex", justifyContent: "center" }}>
                        How It Works
                        <QuestionMark style={{ color: '#f2003a', alignSelf: "center" }} height="32" width="32" className="mr-2" />
                        <QuestionMark style={{ color: '#f2003a', alignSelf: "center" }} height="32" width="32" className="mr-2" />
                    </h2>
                    <Row className="justify-content-center">
                        <Col md={4} className="mb-4">
                            <div className="how-it-works-card p-4 text-center">
                                <UplaodIcon style={{ color: " #4169E1", alignSelf: "center" }} height="60" width="60" className="mr-2 my-4" />
                                <h3 className="mb-3" style={{ color: "#33627c" }}>Step 1</h3>
                                <p className="mb-0">Upload your eye images and personal details</p>
                            </div>
                        </Col>
                        <Col md={4} className="mb-4">
                            <div className="how-it-works-card p-4 text-center">
                                <CpuIcon style={{ alignSelf: "center", color: "orange" }} height="60" width="60" className="mr-2 my-4" />
                                <h3 className="mb-3" style={{ color: "#33627c" }}>Step 2</h3>
                                <p className="mb-0">Our Deep learning algorithms will analyze your images</p>
                            </div>
                        </Col>
                        <Col md={4} className="mb-4">
                            <div className="how-it-works-card p-4 text-center">
                                <RecieveIcon style={{ alignSelf: "center", color: "#B59E7B" }} height="60" width="60" className="mr-2 my-4" />
                                <h3 className="mb-3" style={{ color: "#33627c" }}>Step 3</h3>
                                <p className="mb-0">Receive a report to your mail of the complete diagnosis</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div>
                <Container className="mt-5 mb-5">
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <h2>Healthy eyes, happy life. Let's take care of them together!</h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <p>Free eye care made easy</p>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Link to="/form">
                                <Button style={{ backgroundColor: "#33627c" }} variant="primary" size="lg" className="mt-3">
                                    Lets Go!!!
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>

            </div>

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
        </div>
    );
}

export default HomePage;