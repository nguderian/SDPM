import React, { useState, Fragment, useRef } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import EditFreeResponse from './questions/EditFreeResponse';
import EditLikert from './questions/EditLikert';
import EditMultipleChoice from './questions/EditMultipleChoice';

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 300,
    },
    questionInput: {
        marginTop: theme.spacing(1)
    }
}));


const EditQuestion = ({ open, onClose, editQuestion, questionToEdit }) => {
    const classes = useStyles();
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    // event handlers
    const handleCancel = () => {
        onClose();
        editQuestion(false, questionToEdit);
    };

    const handleConfirm = () => {
        editQuestion(true, )
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Question</DialogTitle>
                <DialogContent>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} id="Question Type">
                            Question Type
                        </InputLabel>
                        <Select variant = 'standard'
                            labelId="Question Type"
                            id="Question Selector"
                            value={questionType}
                            onChange={handleChange}
                            labelWidth={labelWidth}
                            defaultValue={questionToEdit.questionType}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Free Response'}>Free Response</MenuItem>
                            <MenuItem value={'Multiple Choice'}>Multiple Choice</MenuItem>
                            <MenuItem value={'Likert Scale'}>Likert Scale</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        className={classes.questionInput}
                        autoFocus
                        id="name"
                        label="Enter Question Text"
                        fullWidth
                        defaultValue={questionToEdit.questionText}
                        onChange={handleTextFieldChange}
                    />
                    {questionToEdit.questionType === 'Free Response' && <EditFreeResponse possibleAnswers={storeFRQAnswers}/>}
                    {questionToEdit.questionType === 'Multiple Choice' && <EditMultipleChoice possibleAnswers={storeMCAnswers} correctAnswers={storeCorrectMCAnswers}/>}
                    {questionToEdit.questionType === 'Likert Scale' && <EditLikert thresholdValue={storeThreshold}/>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditQuestion;