import React from 'react';
import {connect} from "react-redux";
import MaterialTable from "material-table";
import {Search, Clear, ChevronLeft, ChevronRight, FirstPage, LastPage} from '@material-ui/icons';
import {withStyles, TextField, Button, DialogActions, DialogContent, DialogTitle, Dialog, DialogContentText, InputAdornment, CircularProgress, Backdrop} from "@material-ui/core";
import * as PropTypes from "prop-types";

import {styles} from './../../css/userStyles';
import {fetchUsers, updateCredits} from './../../store/actions/actionCreators'



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
        const {users, loading, loadingCreditUpdate} = this.props;
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
                        {title: 'ID', field: 'userID'},
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
                <Backdrop open={loading || loadingCreditUpdate} style={{zIndex: 1, color: '#fff'}}>
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
        loadingCreditUpdate: appState.loadingCreditUpdate
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