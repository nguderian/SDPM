import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FormControl, FormGroup, FormControlLabel, Checkbox, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }, 
    formControl: {
        margin: theme.spacing(1),
        width: '100%'
    }
}));

const NewFreeResponse = () => {
    const classes = useStyles();
    const [hasAnswer, setHasAnswer] = React.useState(false);

    const handleChange = event => {
        setHasAnswer(event.target.checked);
    };

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={hasAnswer} onChange={handleChange} value="hasAnswer"/>}
                        label="Is there a correct answer?"
                    />
                </FormGroup>
                {hasAnswer && <TextField
                    id="outlined-multiline-static"
                    label="Correct Answer(s)"
                    multiline
                    rows="4"
                    placeholder="Enter answer(s), separated by commas"
                    variant="outlined"
                />}
            </FormControl>
        </div>
    );
}


export default NewFreeResponse;