import React from 'react';
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {withStyles, ListItem, ListItemIcon, ListItemText, } from "@material-ui/core";
import {People, DnsRounded} from '@material-ui/icons';

import {styles} from './../../css/navigatorStyle';
import {change_tab} from "../../store/actions/actionCreators";
import {CHAPTERS, USERS} from "../uiConstants";

class Navigator extends React.Component {

    handleClick = (id) => {
        this.props.change_tab(id)
    };

    render() {
        return (
            <div>
                <ListItem button onClick={() => this.handleClick(USERS)}>
                    <ListItemIcon>
                        <People/>
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItem>
                <ListItem button onClick={() => this.handleClick(CHAPTERS)}>
                    <ListItemIcon>
                        <DnsRounded />
                    </ListItemIcon>
                    <ListItemText primary="Chapters" />
                </ListItem>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = {
    change_tab: change_tab
};

Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navigator));