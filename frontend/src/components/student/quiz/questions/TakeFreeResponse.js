import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    answerField: {
        marginTop: theme.spacing(2)
    }
}));

const TakeFreeResponse = ({ question, handleChange, index, viewingSubmission, userType }) => {
    const classes = useStyles(); 
    let answer = '';
    if(viewingSubmission && userType === 'coordinator') {
        answer = question.answers[0].key_text
    }
    else if(viewingSubmission && userType === 'student') {
        answer = question.answer_text;
    }
    else {
        answer = question.answer_text
    }

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
                multiline={true}
                value={viewingSubmission ? answer : null}
            />
        </form>
    )
}

TakeFreeResponse.propTypes = {
    question: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    viewingSubmission: PropTypes.bool.isRequired,
    userType: PropTypes.string.isRequired
}

export default TakeFreeResponse;