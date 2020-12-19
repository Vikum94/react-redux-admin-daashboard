import React from 'react';
import {Typography, Grid, TextField, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper} from '@material-ui/core';

import useStyles from '../../css/reviewFormStyle'

export default function ReviewForm(props) {
    const {chapterName, chapterCost, chapterDescription, lessons} = props.chapter;
    const classes = useStyles();

    return (

        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Chapter summary
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={10}>
                    <TextField
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        id="chapterName"
                        name="chapterName"
                        label="Chapter name"
                        value={chapterName}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        id="cost"
                        name="cost"
                        label="Cost"
                        value={chapterCost}
                    />
                </Grid>
            </Grid>
            <br/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        id="chapterDescription"
                        name="chapterDescription"
                        label="Chapter Description"
                        value={chapterDescription}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style= {{width: '10%', maxWidth: 20}}>Lesson number</TableCell>
                                    <TableCell align="center" style= {{width: '30%', maxWidth: 20}}>Lesson name</TableCell>
                                    <TableCell align="center" style= {{width: '10%', maxWidth: 20}}>Cost</TableCell>
                                    <TableCell align="center" style= {{width: '50%', maxWidth: 20}}>Link</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lessons.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell align="center">{row.number}</TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.cost}</TableCell>
                                        <TableCell align="center">{row.link}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};