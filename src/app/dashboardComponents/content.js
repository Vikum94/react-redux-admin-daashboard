import React from 'react';
import {useSelector} from "react-redux";
import clsx from 'clsx';
import {
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Container,
    Grid,
    } from '@material-ui/core';
import {Menu, ChevronLeft} from '@material-ui/icons';

import NavigatorList from './navigator';
import Users from "../navigatorComponents/users";
import Chapters from "../navigatorComponents/chapters";
import {CHAPTERS, USERS} from "../uiConstants";
import {theme, useStyles} from '../../css/homeStyle'
import { MuiThemeProvider } from '@material-ui/core/styles';


export default function Dashboard() {
    const classes = useStyles(theme);

    const [open, setOpen] = React.useState(true);
    const currentTab = useSelector(state => state.currentTab);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const renderSwitchNavigatorOption = (type) => {
        switch (type) {
            case CHAPTERS:
                return <Chapters/>;
            case USERS:
                return <Users/>;
            default:
                return <div/>;
        }
    };

    return (
        <MuiThemeProvider  theme={theme} >
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            සිතුමිණ Synergy Education
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeft/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <NavigatorList/>
                    </List>
                </Drawer>

                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                {currentTab}
                            </Typography>
                            <Grid item xs={12}>
                                {renderSwitchNavigatorOption(currentTab)}
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        </MuiThemeProvider >
    );
};