import React, { Fragment } from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, Button, Table, Row, Col, Badge} from 'react-bootstrap';
import { getFromLocalStorage, greetings, getUserTransactions } from '../containers/Helpers';
import { AuthContext } from '../context/Auth';
import { TransactionContext } from '../context/Transactions';
import '../App.css';
import pic from '../Picture.png';
import CustomModal from './CustomModal';

const Dashboard = () => {
    const {handleLogout} = React.useContext(AuthContext);
    const {handleWithdraw, handleDeposit} = React.useContext(TransactionContext);
    const user = getFromLocalStorage('currentUser');
    const userTransactions = getUserTransactions(user.email);
    const [transactions, setTransactions] = React.useState({
        userEmail: user.email,
        type: '',
        date: '',
        details: '',
        amount: 0,
        userBalance: ''
    });
    const [showWithdraw, setShowWithdraw] = React.useState(false);
    const [showDeposit, setShowDeposit] = React.useState(false);
    const navigate = useNavigate();

    const handleCloseWithdraw = () => setShowWithdraw(false);
    const handleShowWithdraw = () => setShowWithdraw(true);

    const handleCloseDeposit = () => setShowDeposit(false);
    const handleShowDeposit = () => setShowDeposit(true);

    const submitForm = (type) => {
        if(transactions.amount < 5){
            alert('Minimum of N5 is required for a transaction.');
            return;
        }
        if(type === 'Debit') {
            handleWithdraw(transactions);
        }
        else{
            handleDeposit(transactions);
        }
    }

    const logout = (e) => {
        e.preventDefault();
        if(handleLogout(user)){
            navigate('/');
        }
    }

    return(
        <Row className='h-100'>
            <Col sm={12} md={2} className={"d-flex-sm shadow-sm bg-cards p-3"}>
                <img src={pic} className="profile rounded-circle mx-auto d-block p-3 mb-3"/>
                <div className='d-flex flex-row flex-md-column justify-content-between gap-2'>
                    <Button className="submitBtn bg-main" onClick={handleShowWithdraw}>
                        Withdraw
                    </Button>
                    <Button className="submitBtn bg-main" onClick={handleShowDeposit}>
                        Deposit
                    </Button>
                    <Button className="submitBtn bg-main" onClick={logout}>
                        Logout
                    </Button>
                    <Button className="submitBtn bg-main" onClick={logout}>
                        Total Amount
                    </Button>
                    <br></br>
                    <br></br>
                    <h4>📞 Contact Us:</h4>
                    <p>Have questions or need assistance? Reach out to our dedicated support team at support@example.com or call us at [9834636876]. We're here for you.</p>
                    <h4>📍 Visit Us:</h4>
                    <p>Avinashi Rd, Peelamedu, Masakalipalayam, Coimbatore, Tamil Nadu 641004, India</p>
                </div>
            </Col>
            <Col sm={12} md={10} className='px-5 py-3 beige'>
                <Row className='my-4 gy-sm-3'>
                    <Col sm={12} md={5}>
                    <Card className="h-100 remove-border">
                        <Card.Title className='px-3 pt-3'>Good {greetings()}, {user.firstName}</Card.Title>
                        <Card.Body>
                            <Card.Title>Current Account</Card.Title>
                            <Card.Text className='fs-1 font-bold mainText'>N {user.initialDeposit}</Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col sm={12} md={7}>
                        <Card className="h-100 remove-border">
                        <Card.Body>
                            <Card.Title>Profile</Card.Title>
                            <Card.Text as='div'>
                                <div className="d-flex flex-column gap-1 mb-2">
                                <div className="text-uppercase fs-6 title mainText">Email</div>
                                <div>{user.email}</div>
                                </div>
                                <div className="d-flex flex-column gap-1 mb-2">
                                <div className="text-uppercase fs-6 title mainText">Date of birth</div>
                                <div>{user.dob}</div>
                                </div>

                                <div className="d-flex flex-column gap-1 mb-2">
                                <div className="text-uppercase fs-6 title mainText">Next of kin</div>
                                <div>{user.nextOfKin}</div>
                                </div>
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <CustomModal
                    showWithdraw={showWithdraw}
                    handleCloseWithdraw={handleCloseWithdraw}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    submitForm={submitForm}
                    isWithdraw={true}
                />

                <CustomModal
                    showDeposit={showDeposit}
                    handleCloseDeposit={handleCloseDeposit}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    submitForm={submitForm}
                    isWithdraw={false}
                />

                <Card className='remove-border table'>
                    <Card.Body>
                        <Card.Title>Transactions</Card.Title>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Date</th>
                                    <th>Details</th>
                                    <th>Amount</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userTransactions && (
                                        userTransactions.map((x, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td><Badge bg={x.type === 'Debit' ? 'danger' : 'success'}>{x.type}</Badge></td>
                                                    <td>{x.date}</td>
                                                    <td>{x.details}</td>
                                                    <td>{x.amount}</td>
                                                    <td>{x.userBalance}</td>
                                                </tr>
                                            )
                                        })
                                    )
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Dashboard;