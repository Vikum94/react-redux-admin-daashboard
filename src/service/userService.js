import {SERVICE_ROOT} from './serviceConstants';
import {
    loginResponseController,
    getChapterComposer,
    getUserComposer,
    updateCreditComposer,
    updateChapterComposer, removeChapterComposer
} from './serviceController';

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
        headers: {'Authorization': sessionStorage.getItem('token')}
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
        headers: {'Authorization': sessionStorage.getItem('token'), 'Content-Type': 'application/json'},
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

let updateChapter = (chapter) => {
    const URL = SERVICE_ROOT + "chapters/update";
    const requestOptions = {
        method: 'PATCH',
        headers: {'Authorization': sessionStorage.getItem('token'), 'Content-Type': 'application/json'},
        body: JSON.stringify(chapter)
    };

    return fetch(URL, requestOptions)
        .then(updateChapterComposer)
        .then(data =>  data);
};

let createChapter = (chapter) => {
    const URL = SERVICE_ROOT + "chapters/create";
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': sessionStorage.getItem('token'), 'Content-Type': 'application/json'},
        body: JSON.stringify(chapter)
    };

    return fetch(URL, requestOptions)
        .then(updateChapterComposer)
        .then(data =>  data);
};

let removeChapter = (chapter) => {
    const URL = SERVICE_ROOT + "chapters/delete/" + chapter._id;
    const requestOptions = {
        method: 'DELETE',
        headers: {'Authorization': sessionStorage.getItem('token'), 'Content-Type': 'application/json'}
    };

    return fetch(URL, requestOptions)
        .then(removeChapterComposer)
        .then(data =>  data);
};


export const userService = {
    loginService,
    getChapters,
    getUsers,
    updateCredits,
    updateChapter,
    createChapter,
    removeChapter
};