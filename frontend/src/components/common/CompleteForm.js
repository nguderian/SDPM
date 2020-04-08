import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    confirmationDetails: {
        margin: theme.spacing(1)
    }
}));

const CompleteForm = ({
    open,
    onClose,
    formTitle,
    formDescription,
    buttonText, 
    routeForward
}) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Dialog open={open} onClose={onClose} disableBackdropClick disableEscapeKeyDown>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    <Typography className={classes.confirmationDetails}>{formTitle}</Typography>
                    <Typography className={classes.confirmationDetails}>{formDescription}</Typography>
                </DialogContent>

                <DialogActions>
                    <Button component={Link} to={routeForward} color='primary'>
                        {buttonText}
                    </Button>
                    <Button onClick={onClose} color='secondary'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default CompleteForm; 