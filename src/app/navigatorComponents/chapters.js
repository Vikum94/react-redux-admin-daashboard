import React from 'react';
import {connect} from "react-redux";
import {
    Grid,
    Backdrop,
    CircularProgress,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    DialogContent, Dialog, withStyles
} from "@material-ui/core";
import {CloudUpload, Close} from "@material-ui/icons";

import {fetchChapters} from "../../store/actions/actionCreators";
import Chapter from '../contentComponents/chapter';
import {styles} from '../../css/chapterContainerStyle';
import ChapterEditDialog from "../contentComponents/chapterEditDialog";
import * as PropTypes from "prop-types";

class Chapters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addChapterDialogOpen: false,
            chapter: {
                chapterNumber: 0,
                chapterName: '',
                chapterCost: 0,
                chapterDescription: '',
                lessons: []
            }
        }
    };

    componentDidMount() {
        this.props.fetch_chapters();
    };

    addChapter = ()=> {
        this.setState({addChapterDialogOpen: true});
    };

    handleAddChapterDialogClose = () => {
        this.props.fetch_chapters();
        this.setState({addChapterDialogOpen: false});
        return false;
    };

    viewChapters = (chapterList) => {
        if (!this.props.loading) {
            return (
                <Grid container spacing={3}>
                    {chapterList.map(chapter => {
                        return (
                            <React.Fragment key={chapter._id}>
                                <Grid item xs={3}>
                                    <Chapter
                                        chapter={chapter}
                                    />
                                </Grid>
                            </React.Fragment>
                        )
                    })}
                </Grid>
            )
        } else {
            return (
                <Backdrop open={true} style={{zIndex: 1, color: '#fff'}}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            )
        }
    };

    render() {
        const {classes, chapterList} = this.props;
        return (
            <React.Fragment>
                <br/>
                <Grid container spacing={3} justify="flex-end">
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="default"
                            startIcon={<CloudUpload />}
                            onClick={this.addChapter}
                        >
                            New Chapter
                        </Button>
                    </Grid>
                </Grid>
                {this.viewChapters(chapterList)}

                <Dialog fullScreen  open={this.state.addChapterDialogOpen} onClose={this.handleAddChapterDialogClose} aria-labelledby="form-dialog-title">
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleAddChapterDialogClose} aria-label="close">
                                <Close />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Add new chapter
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent style={{backgroundColor: '#eaeff1'}}>
                        <ChapterEditDialog chapter={this.state.chapter} type={'add'}/>
                    </DialogContent>
                </Dialog>

            </React.Fragment>
        );
    }
}


const mapStateToProps = (appState) => {
    return {
        chapterList: appState.chapters,
        loading: appState.loadingChapters
    }
};

const matchDispatchToProps = {
    fetch_chapters: fetchChapters
};

Chapters.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(Chapters));