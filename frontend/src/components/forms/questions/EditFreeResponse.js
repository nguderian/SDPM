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

const EditFreeResponse = ({ possibleAnswers, question }) => {
    const classes = useStyles();
    let hasCorrect = false;
    let previousAnswer = '';
    if(question.questionType === 'Free Response') {
        hasCorrect = question.questionAnswer === '' ? false : true;
        previousAnswer = question.questionAnswer;
    }
    const [hasAnswer, setHasAnswer] = React.useState(hasCorrect);

    // event handlers
    const handleCheckboxChange = event => {
        setHasAnswer(event.target.checked);  
    };

    const handleTextFieldChange = event => {
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
                    defaultValue={previousAnswer}
                    onChange={handleTextFieldChange}
                />}
            </FormControl>
        </div>
    );
}


export default EditFreeResponse;