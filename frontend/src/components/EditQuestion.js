import React, { useState, Fragment, useRef } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
const EditQuestion = ({ open }) => {
    const [show, setShow] = React.useState(open);

    // event handlers
    const handleCancel = () => {
        setShow(false)
    };

    const handleConfirm = () => {

    };
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title"></DialogTitle>
            
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditQuestion;