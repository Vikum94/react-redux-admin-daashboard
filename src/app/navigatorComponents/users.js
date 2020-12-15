import React from 'react';
import {connect} from "react-redux";
import MaterialTable from "material-table";
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import * as PropTypes from "prop-types";
import {styles} from './../../css/userStyles';
import withStyles from "@material-ui/core/styles/withStyles";
import {fetchUsers, updateCredits} from './../../store/actions/actionCreators'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";


class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currentUser: {},
            creditUpdateAmount: 0
        }
    }

    componentDidMount() {
        this.props.fetch_users();
    }

    onUpdateCreditDialogOpen = (user) => {
        this.setState({
            open: true,
            currentUser: user,
        });

    };

    handleClose = () => {
        this.setState({
            open: false,
            currentUser: []
        });
    };

    onUpdate = () => {
        this.props.update_credits(this.state.currentUser, this.state.creditUpdateAmount);
        this.setState({
            open: false
        })
    };

    handleCreditFieldChange = (e) => {
        this.setState({
            creditUpdateAmount: e.target.value
        })
    };

    render() {
        const {users, loading, loadingChapterUpdate} = this.props;
        return (
            <React.Fragment>
                <MaterialTable
                    title="Students Details"
                    icons={{
                        FirstPage: FirstPage,
                        LastPage: LastPage,
                        NextPage: ChevronRight,
                        PreviousPage: ChevronLeft,
                        Search: Search,
                        ResetSearch: Clear
                    }}
                    columns={[
                        {title: 'Name', field: 'name'},
                        {title: 'Email', field: 'email'},
                        {title: 'Credit Balance', field: 'creditBalance'},
                        {
                            title: 'Edit Balance', field: 'id', render: rowData =>
                                <Button variant="outlined" color="primary" onClick={() => {
                                    this.onUpdateCreditDialogOpen(rowData)
                                }}>
                                    Update Credits
                                </Button>
                        }
                    ]}
                    data={users}
                    options={{
                        headerStyle: {
                            fontWeight: 'bold'
                        }
                    }}

                >

                </MaterialTable>

                <div>
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Update {this.state.currentUser.name}'s Credit
                            Balance</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To update user credits, please enter added new amount here.
                            </DialogContentText>
                            <br/>
                            <TextField style={{width: '35ch'}}
                                       id="standard-number"
                                       type="number"
                                       required
                                       variant="outlined"
                                       label="Update By"
                                       defaultValue={0}
                                       min={0}
                                       onChange={this.handleCreditFieldChange}
                                       InputProps={{
                                           startAdornment: <InputAdornment
                                               position="start">Rs</InputAdornment>,
                                           inputProps: {min: 0}
                                       }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.onUpdate} color="primary">
                                Update
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Backdrop open={loading || loadingChapterUpdate} style={{zIndex: 1, color: '#fff'}}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (appState) => {
    return {
        loading: appState.loadingUsers,
        users: appState.users,
        loadingChapterUpdate: appState.loadingChapterUpdate
    }
};

const matchDispatchToProps = {
    fetch_users: fetchUsers,
    update_credits: updateCredits
};

Users.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(Users));