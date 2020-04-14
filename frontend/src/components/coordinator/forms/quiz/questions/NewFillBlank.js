import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FormControl, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }, 
    formControl: {
        marginTop: theme.spacing(1),
        width: '100%'
    }
}));


const NewFillBlank = ({ fillBlank }) => {
    const classes = useStyles();
    
    // event handlers
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
                    onChange={handleTextFieldChange}
                />
            </FormControl>
        </div>
    );
}


export default NewFillBlank;