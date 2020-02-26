import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const AlertDialog = ({ open, onClose, alertMessage}) => {
    const handleClose = () => {
        onClose();
    }
    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Invalid Entry</DialogTitle>
                <DialogContent>
                    <Typography>{alertMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog;