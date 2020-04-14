import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    answerField: {
        marginTop: theme.spacing(2)
    }
}));

const TakeFreeResponse = ({ question, handleChange, index, viewingSubmission }) => {
    const classes = useStyles(); 

    const handleAnswerChange = event => {
        handleChange(event.target.value, index)
    };

    return (
        <form>
            <TextField
                className={classes.answerField}
                variant='outlined'
                fullWidth={true}
                label='Enter Answer'
                onChange={handleAnswerChange}
                disabled={viewingSubmission}
                value={viewingSubmission ? question.answer_text : ''}
            />
        </form>
    )
}

export default TakeFreeResponse;