import * as actionTypes from '../actions/actionTypes';
import {USERS} from './../../app/uiConstants';
import _ from 'lodash';
import {UPDATE_CHAPTER_BEGIN, UPDATE_CHAPTER_SUCCESS, UPDATE_CHAPTER_FAILURE, REMOVE_CHAPTER_BEGIN, REMOVE_CHAPTER_FAILURE, REMOVE_CHAPTER_SUCCESS} from "../actions/actionTypes";

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
    loadingCreditUpdate: false,
    loadingChapterUpdate: false,
    chapterUpdateResponse: {msgHeader: '', msgBody: ''},
    loadingChapterRemove: false,
    chapterRemoveResponse: {msgHeader: 'Are you sure you want to delete this chapter?'},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //---- login process ------------
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

        //---- Tab Swap Process ------------
        case actionTypes.CHANGE_TAB:
            return{
                ...state,
                currentTab: action.payload
            };


        //---- Fetch Chapters ------------
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


        //---- Fetch Users------------
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


        //--- Update credit ------------
        case actionTypes.UPDATE_CREDIT_BEGIN:
            return{
                ...state,
                loadingCreditUpdate: true
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
                loadingCreditUpdate: false
            };
        case actionTypes.UPDATE_CREDIT_FAILURE:
            return{
                ...state,
                loadingCreditUpdate: false
            };


        //----- update chapter -------------
        case UPDATE_CHAPTER_BEGIN:
            return{
                ...state,
                loadingChapterUpdate: true
            };
        case UPDATE_CHAPTER_SUCCESS:
            return{
                ...state,
                loadingChapterUpdate: false,
                chapterUpdateResponse: action.payload
            };
        case UPDATE_CHAPTER_FAILURE:
            return{
                ...state,
                loadingChapterUpdate: false,
                chapterUpdateResponse: action.payload
            };

        //----- remove chapter -------------
        case REMOVE_CHAPTER_BEGIN:
            return{
                ...state,
                loadingChapterRemove: true
            };
        case REMOVE_CHAPTER_SUCCESS:
            return{
                ...state,
                loadingChapterRemove: false,
                chapterRemoveResponse: action.payload
            };
        case REMOVE_CHAPTER_FAILURE:
            return{
                ...state,
                loadingChapterRemove: false,
                chapterRemoveResponse: action.payload
            };

        default:
            return state
    }
};

export default reducer;