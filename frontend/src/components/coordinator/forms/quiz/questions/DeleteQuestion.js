import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const DeleteQuestion = ({ open, onClose, deleteQuestion }) => {
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
            <Dialog open={open} onClose={onClose} aria-labelledby="simple-dialog-title" disableBackdropClick disableEscapeKeyDown>
                <DialogTitle id="simple-dialog-title">Delete question</DialogTitle>
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

DeleteQuestion.PropTypes = {
    open: PropTypes.bool.isRequired,
    onclose: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func
}

export default DeleteQuestion;