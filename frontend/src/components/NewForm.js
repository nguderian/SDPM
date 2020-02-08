import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
    }
}));

const NewForm = () => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Form Name" variant="outlined" fullWidth={true}/>
        </form>
    );
}

export default NewForm

