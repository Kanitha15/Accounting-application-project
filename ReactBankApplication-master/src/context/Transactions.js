import React from "react";
import { transactionReducer } from "./TransactionReducer";
import { getFromLocalStorage, getDateTime } from "../containers/Helpers";

export const TransactionContext = React.createContext([]);

const TransactionProvider = ({children}) => {
    const [transaction, transactionDispatch] = React.useReducer(transactionReducer, getFromLocalStorage('allTransactions'));

    const handleWithdraw = (details) => {
        transactionDispatch({
            type: 'Debit',
            payload: {
                ...details, 
                date: getDateTime(),
                type: 'Debit',
                userBalance: parseFloat(getFromLocalStorage('currentUser').initialDeposit) - parseFloat(details.amount)
            }
        });
        return true;
    }

    const handleDeposit = (details) => {
        transactionDispatch({
            type: 'Credit',
            payload: {
                ...details, 
                date: getDateTime(),
                type: 'Credit',
                userBalance: parseFloat(getFromLocalStorage('currentUser').initialDeposit) + parseFloat(details.amount)
            }
        });
        return true;
    }

    return(
        <TransactionContext.Provider value={{handleWithdraw, handleDeposit, transaction}}>
            {children}
        </TransactionContext.Provider>
    )
}

export default TransactionProvider;