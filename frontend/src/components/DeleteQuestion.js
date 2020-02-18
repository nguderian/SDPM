import React, { useState, Fragment, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1)
    }
}));


const DeleteQuestion = ({ open, onClose, deleteQuestion }) => {
    const classes = useStyles();

    const [openModal, setOpenModal] = useState(open);

    // event handlers
    const handleCancel = () => {
        onClose();
        deleteQuestion(false);
    };

    const handleConfirm = () => {
        onClose();
        deleteQuestion(true);
    };

    return (
        <div>
            <Dialog open={openModal} onClose={onClose} aria-labelledby="simple-dialog-title" >
                <DialogTitle id="simple-dialog-title"></DialogTitle>
                    <DialogContent>
                        <Typography>Would you like to delete this question?</Typography>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        No
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        
    );
}

export default DeleteQuestion;