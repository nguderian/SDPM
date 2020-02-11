import React, { useState, Fragment, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NewFreeResponse from './NewFreeResponse';
import NewLikert from './NewLikert';
import NewMultipleChoice from './NewMultipleChoice';

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 300,
    },
    questionInput: {
        marginTop: theme.spacing(1)
    }
}));


const NewQuestion = ({ open, onClose }) => {
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(open);
    const [questionType, setQuestionType] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [frqAnswers, setFrqAnswers] = useState('');
    const [frqHasCorrect, setFrqHasCorrect] = useState('');
    const [threshold, setThreshold] = useState('');

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    // event handlers
    const handleChange = event => {
        setQuestionType(event.target.value);
    };

    const handleClose = () => {
        setOpenModal(false);
        onClose();
    };

    const handleTextFieldChange = event => {
        setQuestionText(event.target.value);
    };

    const storeFRQAnswers = answers => {
        setFrqAnswers(answers);
    };

    const correctFRQAnswer = correct => {
        setFrqHasCorrect(correct);
    };

    const storeThreshold = value => {
        setThreshold(value);
    };
    
    return (
        <Fragment>
            <Dialog open={openModal} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                        onChange={handleTextFieldChange}
                    />
                    {questionType === 'Free Response' && <NewFreeResponse possibleAnswers={storeFRQAnswers} hasCorrect={correctFRQAnswer}/>}
                    {questionType === 'Multiple Choice' && <NewMultipleChoice />}
                    {questionType === 'Likert Scale' && <NewLikert thresholdValue={storeThreshold}/>}
                    {console.log(threshold)}
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default NewQuestion;