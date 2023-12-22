import axios from "axios";

export const getDate = (val) => {
    let date = new Date(val);
    let day = date.getDay(); 
    let month = date.toLocaleString('default', { month: 'long' }); 
    let year = date.getFullYear();

    return ([day, month, year].join(' '))
}

export const getDateTime = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = hours >= 12 ? 'PM' : 'AM';

    const fullDate = [day, month, year].join(' ');
    return `${fullDate}, ${hours % 12 || 12}:${minutes} ${time}`;
}

export const greetings = () => {
    const date = new Date();
    const hours = date.getHours();
    let greeting = '';
    if(hours >= 0 && hours < 12){
        greeting = 'morning'
    }
    else if (hours >= 12 && hours <= 17){
        greeting = 'afternoon'
    }
    else greeting = 'evening'

    return greeting
}

export const getFromLocalStorage = (item) => {
    const obj = JSON.parse(localStorage.getItem(item)) || [];
    return obj;
}

export const getUserTransactions = (email) => {
    let allTransactions = getFromLocalStorage('allTransactions');
    let find = allTransactions.filter(x => x.userEmail === email);
    return find !== undefined ? find : [];
}

let allUsers = getFromLocalStorage('allUsers');

export const getIndexOfUser = (user) => {
    allUsers = getFromLocalStorage('allUsers');
    return allUsers?.findIndex(a => a.userDetails.email === user.email && a.userDetails.password === user.password);
}

export const setToLocalStorage = (name, item) => {
    localStorage.setItem(name, JSON.stringify(item));
}

export const getAuthenticatedUser = () => {
    allUsers = getFromLocalStorage('allUsers');
    let user = allUsers.find(x => x.isAuthenticated === true)
    return user !== undefined ? user.userDetails : null;
}

export const findUser = (email) => {
    allUsers = getFromLocalStorage('allUsers');
    return(allUsers?.find(y => y.userDetails.email === email))
}

export const verifyIfUserExists = (email, password) => {
    allUsers = getFromLocalStorage('allUsers');
    let find = allUsers?.filter((a) => {
        if(a.userDetails.email === email && a.userDetails.password === password){
            return a;
        }
    })

    return find;

    //let find = (a) => a.userDetails.email === email && a.userDetails.password === password;
    //return allUsers && allUsers.some(find);
}

export const genericCalls = async (options) => {
    const res = await axios.request(options);
    const data = res.status;
    return data;
 }