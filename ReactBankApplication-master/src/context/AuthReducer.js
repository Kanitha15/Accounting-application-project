import { setToLocalStorage, getIndexOfUser, getFromLocalStorage } from "../containers/Helpers";

export let getInitialState = () => {
    return JSON.parse(localStorage.getItem('allUsers')) || [];
};

export const reducer = (state, action) => {
    let find = getIndexOfUser(action.payload.userDetails);
    let init = getInitialState();
    switch(action.type){
        case 'register':
            if(find === -1){
                init.push({
                    isAuthenticated: action.payload.isAuthenticated,
                    userDetails: action.payload.userDetails
                });
                setToLocalStorage('allUsers', init);
            }
            break;
        case 'login':
            init = getInitialState();
            if(find !== -1){
                init[find].isAuthenticated = action.payload.isAuthenticated;
                setToLocalStorage('allUsers', init);
                setToLocalStorage('currentUser', action.payload.userDetails)
            }
            break;
        case 'logout':
            init = getInitialState();
            init[find].isAuthenticated = action.payload.isAuthenticated;
            setToLocalStorage('allUsers', init);
            localStorage.removeItem('currentUser');
            break;
        default:
            return state;
    }
}