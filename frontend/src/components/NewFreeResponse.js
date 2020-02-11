import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FormControl, FormGroup, FormControlLabel, Checkbox, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }, 
    formControl: {
        marginTop: theme.spacing(1),
        width: '100%'
    }
}));

const NewFreeResponse = ({ possibleAnswers, hasCorrect }) => {
    const classes = useStyles();
    const [hasAnswer, setHasAnswer] = React.useState(false);
    const [answers, setAnswers] = React.useState('');

    // event handlers
    const handleCheckboxChange = event => {
        setHasAnswer(event.target.checked);
        hasCorrect(event.target.checked);  
    };

    const handleTextFieldChange = event => {
        setAnswers(event.target.value);
        possibleAnswers(event.target.value);
    };

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={hasAnswer} onChange={handleCheckboxChange} value="hasAnswer"/>}
                        label="Is there a correct answer?"
                    />
                </FormGroup>
                {hasAnswer && <TextField
                    label="Correct Answer(s)"
                    multiline
                    rows="4"
                    placeholder="Enter answer(s), separated by commas"
                    variant="outlined"
                    onChange={handleTextFieldChange}
                />}
            </FormControl>
        </div>
    );
}


export default NewFreeResponse;