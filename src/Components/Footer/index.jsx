import React from 'react';
import './style.css';
import { Container, Row, Col } from 'react-bootstrap';
import useHeaderFooter from '../Header/Hooks/useHeaderFooter.jsx';

export default function Footer() {

    const isVisibleHeaderFooter = useHeaderFooter();

    return (
        <div>
            {isVisibleHeaderFooter &&
                <Container fluid className='footer-wrapper'>
                    <Row className="mx-5 pb-3 pt-5">
                        <Col className="mb-4">
                            <h6 className="text-uppercase font-weight-bold mb-4">About</h6>
                            <ul className="mb-0 p-0">
                                <li className="mb-2"><a href="/" className="text-muted">Contact Us</a></li>
                                <li className="mb-2"><a href="/" className="text-muted">About Us</a></li>
                                <li className="mb-2"><a href="/" className="text-muted">Stories</a></li>
                                <li className="mb-2"><a href="/" className="text-muted">Press</a></li>
                            </ul>
                        </Col>
                        <Col className="mb-4">
                            <h6 className="text-uppercase font-weight-bold mb-4">Help</h6>
                            <ul className="mb-0 p-0">
                                <li className="mb-2"><a href="/" className="text-muted">Payments</a></li>
                                <li className="mb-2"><a href="/" className="text-muted">Shipping</a></li>
                                <li className="mb-2"><a href="/" className="text-muted">Cancellation</a></li>
                                <li className="mb-2"><a href="/" className="text-muted">Returns</a></li>
                            </ul>
                        </Col>
                        <Col className="mb-4">
                            <h6 className="text-uppercase font-weight-bold mb-4">Policy</h6>
                            <ul className="mb-0 p-0">
                                <li className="mb-2"><a href="/" className="text-muted">Return Policy</a></li>
                                <li className="mb-2"><a href="/" className="text-muted">Terms Of Use</a></li>
                                <li className="mb-2"><a href="/" className="text-muted">Security</a></li>
                                <li className="mb-2"><a href="/" className="text-muted">Privacy</a></li>
                            </ul>
                        </Col>
                        <Col className="mb-4">
                            <h6 className="text-uppercase font-weight-bold mb-4">Company</h6>
                            <ul className="mb-0 p-0">
                                <li className="mb-2"><a href="/" className="text-muted">Login</a></li>
                                <li className="mb-2"><a href="/" className="text-muted">Register</a></li>
                                <li className="mb-2"><a href="/" className="text-muted">Sitemap</a></li>
                                <li className="mb-2"><a href="/" className="text-muted">Our Products</a></li>
                            </ul>
                        </Col>
                        <Col className="text-muted align-self-center text-center">
                            <h1>SMART CLICK</h1>
                            <div className='mt-4 d-flex justify-content-between social-icon'>
                                <a href="https://www.instagram.com/accounts/login/?" target='_blank'><i className="fab fa-instagram fa-2x"></i></a>
                                <a href="https://www.facebook.com/login/" target='_blank'><i className="fa-brands fa-square-facebook fa-2x"></i></a>
                                <a href="https://twitter.com/i/flow/login" target='_blank'><i className="fa-brands fa-square-twitter fa-2x"></i></a>
                                <a href="https://www.youtube.com/" target='_blank'><i className="fa-brands fa-youtube fa-2x"></i></a>
                                <a href="https://www.linkedin.com/login" target='_blank'><i className="fa-brands fa-linkedin fa-2x"></i></a>
                                <a href="https://www.google.com/" target='_blank'><i className="fa-brands fa-google fa-2x"></i></a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    )
}