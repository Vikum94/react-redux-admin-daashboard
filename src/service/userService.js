import {SERVICE_ROOT} from './serviceConstants';
import {loginResponseController, getChapterComposer, getUserComposer, updateCreditComposer} from './serviceController'

let loginService = (email, password) => {
    const URL = SERVICE_ROOT + "users/login";
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    };

    return fetch(URL, requestOptions)
        .then(loginResponseController)
        .then(data => {
            sessionStorage.setItem('token', "Bearer " + data.token);
            sessionStorage.setItem('logged', 'T');
            return data.email;
        })
};

let getChapters = () => {
    const URL = SERVICE_ROOT + "chapters";
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': sessionStorage.getItem('token')}
    };

    return fetch(URL, requestOptions)
        .then(getChapterComposer)
        .then(data => {
            return data;
        })
};

let getUsers = () => {
    const URL = SERVICE_ROOT + "users";
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization' : sessionStorage.getItem('token')}
    };

    return fetch(URL, requestOptions)
        .then(getUserComposer)
        .then(data => {
            return data;
        })
};

let updateCredits = (user, amount) => {
    const URL = SERVICE_ROOT + "users/update_credits";
    const requestOptions = {
        method: 'PATCH',
        headers: {'Authorization' : sessionStorage.getItem('token'), 'Content-Type': 'application/json'},
        body: JSON.stringify({
            userID: user.userID,
            credits: amount
        })

    };

    return fetch(URL, requestOptions)
        .then(updateCreditComposer)
        .then(data => {
            return data;
        })
};

export const userService = {
    loginService,
    getChapters,
    getUsers,
    updateCredits
};