import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    answerField: {
        marginTop: theme.spacing(2)
    }
}));

const TakeFillBlank = ({ question, handleChange, index }) => {
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
            />
        </form>
    )
}

export default TakeFillBlank;