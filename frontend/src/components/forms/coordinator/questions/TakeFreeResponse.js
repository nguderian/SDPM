import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({

}));

const TakeFreeResponse = ({ }) => {
    const classes = useStyles();

    return (
        <Fragment>
            <form className={classes.formTitle} noValidate autoComplete="off">
                <TextField id="outlined-basic" 
                    error={formName === '' ? true : false} 
                    helperText={formName === '' ? "Form name is required." : ''} 
                    label="Form Name" 
                    variant="outlined" 
                    fullWidth={true} 
                    onChange={handleFormTitleChange}
                />
            </form>
        </Fragment>
    );
}

export default TakeFreeResponse;