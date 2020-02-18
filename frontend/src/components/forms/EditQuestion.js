import React, { useState, Fragment, useRef } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


const EditQuestion = ({ open, onClose, editQuestion, questionToEdit }) => {
    const [openModal, setOpenModal] = useState(open);

    // event handlers
    const handleCancel = () => {
        onClose();
        editQuestion(false, questionToEdit);
    };

    const handleConfirm = () => {

    };
    return (
        <Dialog open={openModal} onClose={onClose} aria-labelledby="simple-dialog-title" >
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
                    {questionType === 'Free Response' && <NewFreeResponse possibleAnswers={storeFRQAnswers}/>}
                    {questionType === 'Multiple Choice' && <NewMultipleChoice possibleAnswers={storeMCAnswers} correctAnswers={storeCorrectMCAnswers}/>}
                    {questionType === 'Likert Scale' && <NewLikert thresholdValue={storeThreshold}/>}
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
    );
}

export default EditQuestion;