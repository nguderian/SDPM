import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FormControl, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }, 
    formControl: {
        marginTop: theme.spacing(1),
        width: '100%'
    }
}));


const EditFillBlank = ({ fillBlank, question }) => {
    const classes = useStyles();
    let previousAnswer = '';
    if(question.questionType === 'fill_blank') {
        previousAnswer = question.questionAnswer;
    }

    const handleTextFieldChange = event => {
        fillBlank(event.target.value);
    };

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <TextField
                    label="Correct Answer"
                    placeholder="Enter Correct Answer"
                    variant="outlined"
                    defaultValue={previousAnswer}
                    onChange={handleTextFieldChange}
                />
            </FormControl>
        </div>
    );
}

EditFillBlank.propTypes = {
    fillBlank: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
}

export default EditFillBlank;