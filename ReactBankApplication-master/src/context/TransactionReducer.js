import { getFromLocalStorage, getIndexOfUser, setToLocalStorage } from "../containers/Helpers";

let allUsers = getFromLocalStorage('allUsers');
let allTransactions = getFromLocalStorage('allTransactions');

export const transactionReducer = (state, action) => {
    let user = getFromLocalStorage('currentUser');
    let find = getIndexOfUser(user);
    switch(action.type){
        case 'Debit':
            allTransactions.push(action.payload);
            if(find !== -1){
                allUsers[find].userDetails.initialDeposit = action.payload.userBalance;
                user = {...user, initialDeposit: action.payload.userBalance}
                setToLocalStorage('allUsers', allUsers);
                setToLocalStorage('currentUser', user);
                setToLocalStorage('allTransactions', allTransactions);
            }
            break;
        case 'Credit':
            allTransactions.push(action.payload);
            if(find !== -1){
                allUsers[find].userDetails.initialDeposit = action.payload.userBalance;
                user = {...user, initialDeposit: action.payload.userBalance}
                setToLocalStorage('allUsers', allUsers);
                setToLocalStorage('currentUser', user);
                setToLocalStorage('allTransactions', allTransactions);
            }
            break;
        default:
            return state;
    }
}