import React, { useState } from 'react';
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


const EditLikert = ({ thresholdValue, question }) => {
    const classes = useStyles();
    let previousThreshold = '';
    let hadThreshold = false;
    if(question.questionType === 'Likert Scale') {
        hadThreshold = question.questionAnswer === '' ? false : true;
        previousThreshold = question.questionAnswer;
    }
    const [hasThreshold, setHasThreshold] = useState(hadThreshold);

    // event handlers
    const handleCheckboxChange = event => {
        setHasThreshold(event.target.checked);
    };

    const handleTextFieldChange = event => {
        thresholdValue(event.target.value);
    };

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={hasThreshold} onChange={handleCheckboxChange} value="hasThreshold"/>}
                        label="Is there a threshold?"
                    />
                </FormGroup>
                {hasThreshold && <TextField
                    label="Threshold"
                    placeholder="Enter threshold value"
                    variant="outlined"
                    defaultValue={previousThreshold}
                    onChange={handleTextFieldChange}
                />}
            </FormControl>
        </div>
    );
}


export default EditLikert;