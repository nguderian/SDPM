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
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

const FormSubmitted = ({
    open,
    onClose,
    confirmationText,
    submittedText,
    routeBack
}) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Dialog open={open} onClose={onClose} disableBackdropClick disableEscapeKeyDown>
                <DialogTitle>{submittedText}</DialogTitle>
                <DialogContent>
                    <Typography className={classes.confirmationDetails}>{confirmationText}</Typography>
                </DialogContent>

                <DialogActions>
                    <Button component={Link} to={routeBack} color='primary'>
                        Go to quizzes
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default FormSubmitted;