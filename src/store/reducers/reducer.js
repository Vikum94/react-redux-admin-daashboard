import * as actionTypes from '../actions/actionTypes';
import {USERS} from './../../app/uiConstants';
import _ from 'lodash';

if(sessionStorage.getItem('logged') == null){
    sessionStorage.setItem('logged', 'F');
}

const initialState = {
    isValidUser: false,
    loginErrorDetail: {display: 'none', msg: ""},
    currentTab: USERS,
    chapters: [],
    users: [],
    loadingLogin: false,
    loadingUsers: false,
    loadingChapters: false,
    loadingChapterUpdate: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_BEGIN:
            return{
                ...state,
                loadingLogin: true
            };
        case actionTypes.LOGIN_SUCCESS:
            return{
                ...state,
                isValidUser: true,
                loadingLogin: false
            };
        case actionTypes.LOGIN_FAILURE:
            return{
                ...state,
                isValidUser: false,
                loadingLogin: false,
                loginErrorDetail: {display: "inline", msg: action.payload}
            };


        case actionTypes.CHANGE_TAB:
            return{
                ...state,
                currentTab: action.payload
            };


        case actionTypes.CHAPTERS_FETCH_BEGIN:
            return{
                ...state,
                loadingChapters: true
            };
        case actionTypes.CHAPTERS_FETCH_SUCCESS:
            return{
                ...state,
                chapters: action.payload,
                loadingChapters: false
            };
        case actionTypes.CHAPTERS_FETCH_FAILURE:
            return{
                ...state,
                loadingChapters: false
            };


        case actionTypes.USERS_FETCH_BEGIN:
            return{
                ...state,
                loadingUsers: true
            };
        case actionTypes.USERS_FETCH_SUCCESS:
            return{
                ...state,
                users: action.payload,
                loadingUsers: false
            };
        case actionTypes.USERS_FETCH_FAILURE:
            return{
                ...state,
                loadingUsers: false
            };


        case actionTypes.UPDATE_CREDIT_BEGIN:
            return{
                ...state,
                loadingChapterUpdate: true
            };
        case actionTypes.UPDATE_CREDIT_SUCCESS:
            let users = _.clone(state.users);
            _.filter(users, function (o) {
                if(o.userID === action.payload.userID){
                    o.creditBalance = action.payload.creditBalance;
                    return o;
                }
            });
            return{
                ...state,
                users: users,
                loadingChapterUpdate: false
            };
        case actionTypes.UPDATE_CREDIT_FAILURE:
            return{
                ...state,
                loadingChapterUpdate: false
            };

        default:
            return state
    }
};

export default reducer;