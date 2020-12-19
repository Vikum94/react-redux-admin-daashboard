import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function DetailForm(props) {
    const notifyParent = props.subscriber;
    const {chapterName, chapterCost, chapterDescription} = props.chapter;

    const[name, setName] = useState(chapterName);
    const[cost, setCost] = useState(chapterCost);
    const[description, setDescription] = useState(chapterDescription);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Main chapter details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="chapterName"
                        name="chapterName"
                        label="Chapter name"
                        fullWidth
                        autoComplete="given-name"
                        value={name}
                        onChange={(event) => {setName(event.target.value); notifyParent({...props.chapter, chapterName: event.target.value})}}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="cost"
                        name="cost"
                        label="Cost"
                        fullWidth
                        autoComplete="cost"
                        value={cost}
                        onChange={(event) => {setCost(event.target.value);  notifyParent({...props.chapter, chapterCost: event.target.value})}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="chapterDescription"
                        name="chapterDescription"
                        label="Chapter Description"
                        fullWidth
                        autoComplete="chapterDescription"
                        value={description}
                        onChange={(event) => {setDescription(event.target.value); notifyParent({...props.chapter, chapterDescription: event.target.value})}}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
