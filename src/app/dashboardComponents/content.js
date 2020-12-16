import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import {ThemeProvider, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import {theme, styles, drawerWidth} from '../../css/homeStyle';
import Header from './header';
import Navigator from './navigator';
import {CHAPTERS, USERS} from '../uiConstants'
import Users from "../navigatorComponents/users";
import Chapters from "../navigatorComponents/chapters";

class HomePage extends React.Component {

    renderSwitchNavigatorOption = (type) => {
        switch(type) {
            case CHAPTERS:
                return <Chapters/>;
            case USERS:
                return <Users/>;
            default:
                return <div/>;
        }
    };

    render() {
        const {classes, currentTab} = this.props;
        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <CssBaseline/>
                    <nav className={classes.drawer}>
                        <Navigator PaperProps={{style: {width: drawerWidth}}}/>
                    </nav>
                    <div className={classes.app}>
                        <Header/>

                        <main className={classes.main}>
                            {this.renderSwitchNavigatorOption(currentTab)}
                        </main>


                        <footer className={classes.footer}>
                            <Typography variant="body2" color="textSecondary" align="center">
                                {'Copyright © '}
                                <Link color="inherit" href="https://material-ui.com/">
                                    සිතුමිණ Synergy Education
                                </Link>{' '}
                                {new Date().getFullYear()}
                                {'.'}
                            </Typography>
                        </footer>

                    </div>
                </div>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (appState) => {
    return {
        isValidUser: appState.isValidUser,
        currentTab: appState.currentTab
    }
};

const mapDispatchToProps = {};

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomePage));
