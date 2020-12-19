import * as actionTypes from './actionTypes';
import {userService} from './../../service/userService'

export const login = (email, password) => {
    return dispatch => {
        dispatch({
            type: actionTypes.LOGIN_BEGIN
        });
        userService.loginService(email, password)
            .then(
                email => {
                    dispatch({
                        type: actionTypes.LOGIN_SUCCESS,
                        payload: email
                    });
                },
                error => {
                    let err = error;
                    if (typeof error === 'object') {
                        err = "Service Error : " + error
                    }
                    dispatch({
                        type: actionTypes.LOGIN_FAILURE,
                        payload: err
                    })

                }
            )
    }
};

export const change_tab = (currenttab) => {
    return dispatch => {
        dispatch({
            type: actionTypes.CHANGE_TAB,
            payload: currenttab
        })
    }
};

export const fetchChapters = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.CHAPTERS_FETCH_BEGIN
        });
        userService.getChapters()
            .then(
                data => {
                    dispatch({
                        type: actionTypes.CHAPTERS_FETCH_SUCCESS,
                        payload: data
                    })
                },
                error => {
                    dispatch({
                        type: actionTypes.CHAPTERS_FETCH_FAILURE,
                        payload: error
                    })
                }
            )
    }
};

export const fetchUsers = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.USERS_FETCH_BEGIN
        });
        userService.getUsers()
            .then(
                data => {
                    dispatch({
                        type: actionTypes.USERS_FETCH_SUCCESS,
                        payload: data
                    })
                },
                error => {
                    dispatch({
                        type: actionTypes.USERS_FETCH_FAILURE,
                        payload: error
                    })
                }
            )
    }
};

export const updateCredits = (user, amount) => {
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATE_CREDIT_BEGIN
        });
        userService.updateCredits(user, amount)
            .then(
                data => {
                    dispatch({
                        type: actionTypes.UPDATE_CREDIT_SUCCESS,
                        payload: data
                    })
                },
                error => {
                    dispatch({
                        type: actionTypes.UPDATE_CREDIT_FAILURE,
                        payload: error
                    })
                }
            )
    }
};

export const updateChapter = (chapter, setActiveStep) => {
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATE_CHAPTER_BEGIN
        });
        userService.updateChapter(chapter)
            .then(
                data => {
                    dispatch({
                        type: actionTypes.UPDATE_CHAPTER_SUCCESS,
                        payload: {msgHeader: 'Thank you.', msgBody: 'Your chapter details are updated successfully.', data: data}
                    });
                    setActiveStep(3);
                },
                error => {
                    dispatch({
                        type: actionTypes.UPDATE_CHAPTER_FAILURE,
                        payload: {msgHeader: 'Sorry.', msgBody: error}
                    });
                    setActiveStep(3);
                }
            )
    }
};

export const createChapter = (chapter, setActiveStep) => {
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATE_CHAPTER_BEGIN
        });
        userService.createChapter(chapter)
            .then(
                data => {
                    dispatch({
                        type: actionTypes.UPDATE_CHAPTER_SUCCESS,
                        payload: {msgHeader: 'Thank you.', msgBody: 'Your chapter details are updated successfully.', data: data}
                    });
                    setActiveStep(3);
                },
                error => {
                    dispatch({
                        type: actionTypes.UPDATE_CHAPTER_FAILURE,
                        payload: {msgHeader: 'Sorry.', msgBody: error}
                    });
                    setActiveStep(3);
                }
            )
    }
};

export const removeChapter = (chapter) => {
    return dispatch => {
        dispatch({
            type: actionTypes.REMOVE_CHAPTER_BEGIN
        });
        userService.removeChapter(chapter)
            .then(
                data => {
                    dispatch({
                        type: actionTypes.REMOVE_CHAPTER_SUCCESS,
                        payload: {msgHeader: 'Successfully remove the chapter.', data: data}
                    });
                },
                error => {
                    dispatch({
                        type: actionTypes.REMOVE_CHAPTER_FAILURE,
                        payload: {msgHeader: 'Sorry: '+ error}
                    });
                }
            )
    }
};