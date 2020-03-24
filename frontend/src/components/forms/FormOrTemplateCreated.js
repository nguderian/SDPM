import React, { usetState, Fragment } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({

}));

const FormOrTemplateCreated = ({ open, onClose, confirmationText }) => {
    const classes = useStyles();

    const handleDialogClose = arg => {
        onClose(arg);
    };

    return (
        <Fragment>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>
                    <DialogContent>
                        <Typography>{confirmationText}</Typography>
                    </DialogContent>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleGoToForms} color="primary">
                        Go to forms
                    </Button>
                    <Button onClick={handleCreateSimilar} color="primary">
                        Create similar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default FormOrTemplateCreated;