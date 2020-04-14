import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    }, 
    answerCard: {
        marginTop: theme.spacing(2)
    }
}));

const TakeMultipleChoice = ({ question, handleChange, index, viewingSubmission, userType }) => {
    const classes = useStyles();
    let answer = '';
    if(viewingSubmission && userType === 'coordinator') {
        question.answers.forEach(answerChoice => {
            if(answerChoice.is_correct === 1) answer = answerChoice.key_text
        });
    }
    else if(viewingSubmission && userType === 'student') {
        answer = question.answer_text;
    }
    else {
        answer = question.answer_text
    }
    
    const [selected, setSelected] = useState();

    const handleAnswerChange = event => {
        setSelected(event.target.value)
        handleChange(event.target.value, index)
    };

    return (
        <div className={classes.root}>
            <FormControl component='fieldset'>
                <RadioGroup value={viewingSubmission ? answer : selected} onChange={handleAnswerChange}>
                    {question.answers.map((answer, index) => 
                        <FormControlLabel 
                            key={index}
                            value={answer.key_text} 
                            control={<Radio color='primary' />} 
                            label={answer.key_text}
                            disabled={viewingSubmission}
                        />
                    )}
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default TakeMultipleChoice;