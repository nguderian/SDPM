import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
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

const TakeMultipleChoice = ({ question, handleChange, index }) => {
    const classes = useStyles();
    const [selected, setSelected] = useState();

    const handleAnswerChange = event => {
        setSelected(event.target.value)
        handleChange(event.target.value, index)
    };

    return (
        <div className={classes.root}>
            <FormControl component='fieldset'>
                <RadioGroup value={selected} onChange={handleAnswerChange}>
                    {question.answers.map((answer, index) => 
                        <FormControlLabel 
                            key={index}
                            value={answer.key_text} 
                            control={<Radio color='primary' />} 
                            label={answer.key_text}
                        />
                    )}
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default TakeMultipleChoice;