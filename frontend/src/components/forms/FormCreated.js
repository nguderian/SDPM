import React, { usetState, Fragment } from 'react';
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

const FormCreated = ({ 
    open, 
    onClose, 
    confirmationText, 
    createdText,
    start,
    end,
    assignedClass,
    alertGrade, 
    routeBack
 }) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Dialog open={open} onClose={onClose} disableBackdropClick disableEscapeKeyDown>
                <DialogTitle>{createdText}</DialogTitle>
                <DialogContent>
                    <Typography className={classes.confirmationDetails}>{confirmationText}</Typography>
                    <Typography className={classes.confirmationDetails}>{`Start: ${start}`}</Typography>
                    <Typography className={classes.confirmationDetails}>{`End: ${end}`}</Typography>
                    <Typography className={classes.confirmationDetails}>{`Assigned to: ${assignedClass}`}</Typography>
                    {alertGrade === '' ? 
                        <Typography className={classes.confirmationDetails}>{`You will not receive alerts for this quiz`}</Typography>
                        : <Typography className={classes.confirmationDetails}>{`You will receive alerts for grades lower than: ${alertGrade}`}</Typography>
                    }
                </DialogContent>
                
                <DialogActions>
                    <Button component={Link} to={routeBack} color="primary">
                        Go to forms
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default FormCreated;