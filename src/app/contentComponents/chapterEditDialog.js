import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { CssBaseline, Paper, Stepper, Step, Button, Link, Typography, StepLabel, CircularProgress, Backdrop} from '@material-ui/core';

import DetailForm from './chapterForm';
import ReviewForm from './reviewForm';
import LessonForm from "./lessonForm";
import {createChapter, updateChapter} from "../../store/actions/actionCreators";
import useStyles from "../../css/chapterEditDialogStyle";

const ChapterEditDialog =  (props) => {
    const classes = useStyles();
    const steps = ['Chapter details', 'Lessons details','Review your chapter'];

    const dispatch = useDispatch();
    const loadingChapterUpdate = useSelector(state => state.loadingChapterUpdate);
    const chapterUpdateResponse = useSelector(state => state.chapterUpdateResponse);

    const [activeStep, setActiveStep] = useState(0);
    const [chapter, setChapter] = useState({
        _id: props.chapter._id,
        chapterName: props.chapter.chapterName,
        chapterCost: props.chapter.chapterCost,
        chapterDescription: props.chapter.chapterDescription,
        lessons: props.chapter.lessons,
    });


    const handleNext = () => {
        if(activeStep === steps.length - 1){
            props.type === 'edit' ? dispatch(updateChapter(chapter, setActiveStep)) : dispatch(createChapter(chapter, setActiveStep));
        }else{
            setActiveStep(activeStep + 1);
        }
    };

    const getStepContent = (step, chapter, subscriber) =>{
        switch (step) {
            case 0:
                return <DetailForm chapter={chapter} subscriber={subscriber}/>;
            case 1:
                return <LessonForm chapter={chapter} subscriber={subscriber}/>;
            case 2:
                return <ReviewForm chapter={chapter} subscriber={subscriber}/>;
            default:
                throw new Error('Unknown step');
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />

            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Chapter: {props.chapter.chapterNumber}
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {
                            activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        {chapterUpdateResponse.msgHeader}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {chapterUpdateResponse.msgBody}
                                    </Typography>
                                </React.Fragment>
                            ) : (

                                <React.Fragment>
                                    {getStepContent(activeStep, chapter, setChapter)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://material-ui.com/">
                        සිතුමිණ Synergy Education
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </main>
            <Backdrop open={loadingChapterUpdate} style={{zIndex: 1, color: '#fff'}}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </React.Fragment>
    );
};

export default ChapterEditDialog;