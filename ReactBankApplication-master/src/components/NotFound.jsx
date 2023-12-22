import { Fragment } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../App.css';

const NotFound = () => {
    const navigate = useNavigate();
    return(
        <Fragment>
            <Container as={'div'} fluid>
                <h1>404</h1>
                <p>Looks like you're at a page that doesn't exist.</p>
                <Button onClick={() => navigate('/')} className="submitBtn">
                    Back to login page
                </Button>
            </Container>
        </Fragment>
    )
}

export default NotFound;