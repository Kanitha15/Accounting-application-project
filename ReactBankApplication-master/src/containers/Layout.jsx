import {routes, authRoutes} from '../routes';
import {Link, useNavigate} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap';
import React, { Fragment } from 'react';
import '../App.css';
import pic from '../Picture.png';

const Layout = ({children}) => {
    const navigate = useNavigate();
    if(authRoutes.indexOf(window.location.pathname) === -1){
        return <div>{children}</div>
    }

    return (
        <Fragment>
            <Container className="fullHeight" as={'div'} fluid>
                <Row className="my-auto d-flex justify-content-center h-100">
                    <Col sm={12} md={7} className="my-auto d-flex justify-content-center py-3 px-5">
                        {window.location.pathname === '/' ?
                            <div className="text-center text-md-start">
                                <h1 className="fw-bold">Sign In to your bank app</h1>
                                <p>If you don't have an account you can <span className="register" onClick={() => navigate('/register')}>Register here!</span></p>
                                <br></br>
                                <br></br>
                                <br></br>
                                <h1>About Us</h1>
                                <p>At Build Your Firm, we work with all types of accounting firms to help them work smarter, not harder. Our programs and internet marketing services are designed to help you better utilize marketing for practice development, improve your hourly fee realization, and ultimately improve your firm's profitability.</p>
                                
                            </div >
                            :
                            <div className="text-center text-md-start">
                                <h1 className="fw-bold">Create an account</h1>
                                <p>If you already have an account you can <span className="register" onClick={() => navigate('/')}>Sign in here!</span></p>
                            </div >
                        }
                        <img src={pic} className="w-50 h-50 d-none d-md-block"/>
                    </Col>
                    <Col sm={12} md={5} className="my-auto py-3 px-5">
                        {children}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Layout;