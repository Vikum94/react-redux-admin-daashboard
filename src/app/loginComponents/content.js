import React from 'react';
import LoginPage from './loginPage';
import {connect} from "react-redux";

import {login} from '../../store/actions/actionCreators'
import HomePage from "../dashboardComponents/content";

class Content extends React.Component {

    render() {
        if (sessionStorage.getItem('logged') === "F" || sessionStorage.getItem('logged') == null) {
            return <LoginPage/>

        }else {
            return <HomePage/>
        }
    }
}


const mapStateToProps = (appState) => {
    return {
        loggedIn: appState.isValidUser
    }
};

const mapDispatchToProps = {
    login: login
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
