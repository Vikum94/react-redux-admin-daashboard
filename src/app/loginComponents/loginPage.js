import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography, Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, CircularProgress, Backdrop} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from "@material-ui/lab/Alert";
import {ValidatorForm} from 'react-material-ui-form-validator';

import {login} from "../../store/actions/actionCreators";
import useStyles from '../../css/loginPageStyles'

export default function SignInSide() {
    const classes = useStyles();

    const [email, emailChangeHandler] = useState('');
    const [password, passwordChangeHandler] = useState('');

    const loadingLogin = useSelector((state) => {return state.loadingLogin});
    const errorDetails = useSelector((state) => {return state.loginErrorDetail});
    const isValidUser = useSelector((state) => {return state.isValidUser});

    const dispatch = useDispatch();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <div className={classes.alertRoot} style={{display: errorDetails.display, marginTop: '15px'}}>
                        <Alert variant="filled" severity="warning">
                            {errorDetails.msg}
                        </Alert>
                    </div>
                    <ValidatorForm onSubmit={() => {dispatch(login(email, password))}} className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            _id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={event => emailChangeHandler(event.target.value)}
                            value={email}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            _id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={event => passwordChangeHandler(event.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            disabled={isValidUser}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Typography variant="body2" color="textSecondary" align="center">
                                {'Copyright © '}
                                <Link color="inherit" href="https://material-ui.com/">
                                    සිතුමිණ Synergy Education
                                </Link>{' '}
                                {new Date().getFullYear()}
                                {'.'}
                            </Typography>
                        </Box>
                    </ValidatorForm>
                </div>
            </Grid>
            <Backdrop open={loadingLogin} className={classes.backdrop}>
                <CircularProgress   color="inherit" />
            </Backdrop>
        </Grid>
    );
}