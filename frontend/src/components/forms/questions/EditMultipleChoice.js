import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { 
    Typography,
    FormGroup, 
    FormControlLabel, 
    Checkbox, 
    TextField  
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    helperText: {
      marginTop: theme.spacing(2),
    },
    checkBox: {
        marginTop: theme.spacing(1)
    }
}));

const EditMultipleChoice = ({ possibleAnswers, correctAnswers, question }) => {
    const classes = useStyles();
    let previousAnswers = {
        answer1: false,
        answer2: false,
        answer3: false,
        answer4: false,
        answer5: false,
    }
    if(question.questionType === 'Multiple Choice') {
        previousAnswers.answer1 = question.correctQuestionAnswers.answer1;
        previousAnswers.answer2 = question.correctQuestionAnswers.answer2;
        previousAnswers.answer3 = question.correctQuestionAnswers.answer3;
        previousAnswers.answer4 = question.correctQuestionAnswers.answer4;
        previousAnswers.answer5 = question.correctQuestionAnswers.answer5;
    }
    const [isCorrectMCAnswer, setIsCorrectMCAnswer] = React.useState({
        answer1: previousAnswers.answer1,
        answer2: previousAnswers.answer2,
        answer3: previousAnswers.answer3,
        answer4: previousAnswers.answer4,
        answer5: previousAnswers.answer5,
    });

    // event handlers
    const handleCheckBoxChange = answerChoice => event => {
        setIsCorrectMCAnswer({...isCorrectMCAnswer, [answerChoice]: event.target.checked });
        correctAnswers(answerChoice, event.target.checked);
    };

    const handleTextFieldChange = answerChoice => event => {
        possibleAnswers(answerChoice, event.target.value);
    };

    // destructure
    const { 
        answer1, 
        answer2, 
        answer3, 
        answer4, 
        answer5 } = isCorrectMCAnswer;
    
    return (
        <div className={classes.root}>   
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography className={classes.helperText}>Check off correct answers</Typography>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={answer1} className={classes.checkBox} onChange={handleCheckBoxChange('answer1')} value="isCorrect"/>}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <TextField autoFocus id="answer1" label="Enter Answer" variant="outlined" fullWidth defaultValue={question.questionAnswer.answer1} onChange={handleTextFieldChange('answer1')}/>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={answer2} className={classes.checkBox} onChange={handleCheckBoxChange('answer2')} value="isCorrect"/>}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <TextField autoFocus id="answer2" label="Enter Answer" variant="outlined" fullWidth defaultValue={question.questionAnswer.answer2} onChange={handleTextFieldChange('answer2')}/>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={answer3} className={classes.checkBox} onChange={handleCheckBoxChange('answer3')} value="isCorrect"/>}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <TextField autoFocus id="answer3" label="Enter Answer" variant="outlined" fullWidth defaultValue={question.questionAnswer.answer3} onChange={handleTextFieldChange('answer3')}/>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={answer4} className={classes.checkBox} onChange={handleCheckBoxChange('answer4')} value="isCorrect"/>}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <TextField autoFocus id="answer4" label="Enter Answer" variant="outlined" fullWidth defaultValue={question.questionAnswer.answer4} onChange={handleTextFieldChange('answer4')}/>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={answer5} className={classes.checkBox} onChange={handleCheckBoxChange('answer5')} value="isCorrect"/>}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <TextField autoFocus id="answer5" label="Enter Answer" variant="outlined" fullWidth defaultValue={question.questionAnswer.answer5} onChange={handleTextFieldChange('answer5')}/>
                </Grid>
            </Grid>
        </div>
        
    );
}


export default EditMultipleChoice;