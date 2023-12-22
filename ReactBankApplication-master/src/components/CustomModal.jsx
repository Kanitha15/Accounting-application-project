import React from "react";
import { Modal, Button } from "react-bootstrap";
import FormInput from './FormInput'

const CustomModal = ({showWithdraw = false, showDeposit = false, handleCloseWithdraw, handleCloseDeposit, transactions, setTransactions, isWithdraw, submitForm}) => {
    return(
        isWithdraw ? 
        <Modal show={showWithdraw} onHide={handleCloseWithdraw}>
            <Modal.Header closeButton>
                <Modal.Title>Withdraw amount</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormInput
                    change={(amount) => setTransactions({...transactions, amount})}
                    value={transactions.amount}
                    type={'number'}
                    inputClass={'form'}
                    inputId={'formBasicEmail'}
                    label={'Make a withdrawal'}
                    placeholder={'Amount to withdraw'}
                />
                <FormInput
                    change={(details) => setTransactions({...transactions, details})}
                    value={transactions.details}
                    type={'text'}
                    inputClass={'form'}
                    inputId={'formBasicEmail'}
                    label={'Description'}
                    placeholder={'Enter a description'}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseWithdraw}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => {
                    e.preventDefault();
                    handleCloseWithdraw();
                    submitForm('Debit');
                }} type="submit">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        : 
        <Modal show={showDeposit} onHide={handleCloseDeposit}>
            <Modal.Header closeButton>
                <Modal.Title>Deposit amount</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormInput
                    change={(amount) => setTransactions({...transactions, amount})}
                    value={transactions.amount}
                    type={'number'}
                    inputClass={'form'}
                    inputId={'formBasicEmail'}
                    label={'Make a deposit'}
                    placeholder={'Amount to deposit'}
                />
                <FormInput
                    change={(details) => setTransactions({...transactions, details})}
                    value={transactions.details}
                    type={'text'}
                    inputClass={'form'}
                    inputId={'formBasicEmail'}
                    label={'Description'}
                    placeholder={'Enter a description'}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeposit}>
                Close
                </Button>
                <Button variant="primary" onClick={(e) => {
                    e.preventDefault();
                    submitForm('Credit');
                    handleCloseDeposit();
                }} type="submit">
                Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CustomModal;