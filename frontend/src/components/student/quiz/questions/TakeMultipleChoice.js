import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'

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

    const handleAnswerChange = event => {
        handleChange(event.target.value, index)
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {question.answers.map((answer, index) =>
                    <Grid item xs={12} key={index}>
                        <Card variant='outlined' className={classes.answerCard}>
                            <CardContent>
                                <Typography>{answer.key_text}</Typography>
                            </CardContent>
                            
                        </Card>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default TakeMultipleChoice;