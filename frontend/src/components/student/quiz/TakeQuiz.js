import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';

const useStyles = makeStyles(theme =>({
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    questions: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        margin: '0 auto',
        border: '1px solid gray',
        borderRadius: '5px',
        marginTop: theme.spacing(2),
        flexGrow: 1,
        maxHeight: '60%',
        overflowY: 'scroll'
    },
    questionCard: {
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }
}));


const TakeQuiz = ({ userId, userType, token, loggedIn, location }) => {
    const classes = useStyles();
    const { formId } = location.state;
    const [quiz, setQuiz] = useState({
        title: '',
        description: '',
        questions: [],
        answers: []
    });

    useEffect(() => {
        async function getQuiz() {
            console.log(formId, userId);
            const options = {
                method: 'POST', 
                url: 'http://localhost:3001/api/getForm', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }, 
                data: {
                    'form_id': formId,
                    'user_id': userId
                }
            };

            const result = await axios(options); 
            const quiz = result.data.quiz;
            console.log(quiz);
            let arr = [];

            quiz.questions.forEach(question => {
                let obj = {
                    question_id: question.question_id,
                    'answer_text': ''
                };
                arr.push(obj);
            });

            console.log(arr);
            setQuiz({
                ['title']: quiz.title,
                ['description']: quiz.description,
                ['questions']: quiz.questions,
                ['answers']: arr
            });
        }
        getQuiz()
    }, [])

    return(
        <Fragment>
            <Typography variant="h4" className={classes.pageTitle}>{quiz['title']}</Typography>

            <form className={classes.quizDetail} noValidate autoComplete='off'>
                <TextField
                    disabled
                    variant='outlined'
                    fullWidth={true}
                    value={quiz['description']}
                    multiline={true}
                />
            </form>

            <div className={classes.questions}>
                {quiz['questions'].map((question, index) => 
                    <Card variant='outlined' key={index} className={classes.questionCard}>
                        <CardContent>
                            <Typography>{question.question_text}</Typography>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Fragment>
        
    );
}

export default TakeQuiz;