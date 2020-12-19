import React from 'react';
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import {
    withStyles,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Button,
    CardActions,
    Dialog,
    DialogContent,
    AppBar,
    IconButton,
    Toolbar,
    Grid, TextField, DialogTitle, DialogActions, CircularProgress, Backdrop
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

import {styles} from '../../css/chapterStyle';
import ChapterEditDialog from "./chapterEditDialog";
import {fetchChapters, removeChapter} from "../../store/actions/actionCreators";


class Chapter extends React.Component {

    constructor(props) {
        super(props);
        const {chapter} = this.props;
        this.state = {
            editDialogOpen: false,
            removeDialogOpen: false,
            chapter: {
                _id: chapter._id,
                chapterNumber: chapter.chapterNumber,
                chapterName: chapter.chapterName,
                chapterCost: chapter.chapterCost,
                chapterDescription: chapter.chapterDescription,
                lessons: chapter.lessons
            },
            onSubmit: false
        }
    };


    onEdit = () => {
        this.setState({
            editDialogOpen: true
        })
    };
    onRemove = () => {
        this.setState({
            removeDialogOpen: true
        })
    };

    handleEditDialogClose = () => {
        this.props.fetchChapters();
        this.setState({
            editDialogOpen: false
        });
        return false;
    };

    handleRemoveDialogClose = () => {
        if(this.state.onSubmit){
            this.props.fetchChapters()
        }
        this.setState({removeDialogOpen: false});
        return false;
    };

    onDelete = () => {
        this.props.removeChapter(this.props.chapter);
        this.setState({onSubmit: true})
    };

    render() {
        const {classes, chapter} = this.props;

        return (
            <React.Fragment>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardContent>

                            <Typography gutterBottom variant="h5" component="h2">
                                {chapter.chapterName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {chapter.chapterDescription}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="h3">
                                Rs.{chapter.chapterCost}/=
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => this.onEdit(chapter)}>
                            Edit
                        </Button>
                        <Button size="small" color="primary" onClick={() => this.onRemove(chapter)}>
                            Remove
                        </Button>
                    </CardActions>
                </Card>

                <Dialog fullScreen open={this.state.editDialogOpen} onClose={this.handleEditDialogClose}
                        aria-labelledby="form-dialog-title">
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleEditDialogClose}
                                        aria-label="close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Chapter Details Edit
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent style={{backgroundColor: '#303030'}}>
                        <ChapterEditDialog chapter={this.state.chapter} type={'edit'}/>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={this.state.removeDialogOpen}
                    onClose={this.handleRemoveDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.props.chapterRemoveResponse.msgHeader}</DialogTitle>
                    <DialogContent>
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
                                    value={this.props.chapter.chapterName}
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
                                    value={this.props.chapter.chapterCost}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        {(!this.state.onSubmit) ?

                            <React.Fragment>
                                <Button onClick={this.handleRemoveDialogClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.onDelete} color="primary" autoFocus>
                                    Delete
                                </Button>
                            </React.Fragment>
                        :

                            <React.Fragment>
                                <Button onClick={this.handleRemoveDialogClose} color="primary">
                                    Close
                                </Button>
                            </React.Fragment>
                        }
                    </DialogActions>
                    <Backdrop open={this.props.loadingChapterRemove} style={{zIndex: 1, color: '#fff'}}>
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                </Dialog>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (appState) => {
    return {
        loadingChapters: appState.loadingChapters,
        loadingChapterRemove: appState.loadingChapterRemove,
        chapterRemoveResponse: appState.chapterRemoveResponse
    }
};

const matchDispatchToProps = {
    fetchChapters: fetchChapters,
    removeChapter: removeChapter
};

Chapter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(Chapter));