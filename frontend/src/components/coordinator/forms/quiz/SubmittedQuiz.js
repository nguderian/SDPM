import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TakeFillBlank from '../../../student/quiz/questions/TakeFillBlank';
import TakeMultipleChoice from '../../../student/quiz/questions/TakeMultipleChoice';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TakeFreeResponse from '../../../student/quiz/questions/TakeFreeResponse';

const useStyles = makeStyles(theme => ({
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    quizDetail: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
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
        maxHeight: '70%',
        overflowY: 'scroll'
    },
    questionCard: {
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    progress: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '25%'
    },
    button: {
        textAlign: 'center',
        marginTop: theme.spacing(2)
    }
}))

const SubmittedQuiz = ({ userId, userType, token, loggedIn, location }) => {
    const classes = useStyles();
    const { instanceId } = location.state;
    const [quiz, setQuiz] = useState({
        title: '',
        description: '',
        grade: '',
        questions: []
    });

    useEffect(() => {
        async function getSubmission() {
            const options = {
                method: 'POST', 
                url: 'http://localhost:3001/api/getInstance', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }, 
                data: {
                    'user_id': userId,
                    'instance_id': instanceId
                }
            };
            
            const result = await axios(options);
            const quiz = result.data;
            console.log(quiz);
            setQuiz({
                title: quiz.title,
                description: quiz.description,
                grade: quiz.grade,
                questions: quiz.questions
            });
        }
        getSubmission()
    }, [token, instanceId, userId]);

    return (
        quiz.questions.length === 0 ? 
        <div className={classes.progress}>
            <CircularProgress />
        </div> :
        <Fragment>
            <Typography variant='h4' className={classes.pageTitle}>{quiz.title}</Typography>
            <form className={classes.quizDetail} noValidate autoComplete='off'>
                <TextField
                    disabled
                    variant='outlined'
                    value={quiz.description}
                    multiline={true}
                    fullWidth={true}
                />
            </form>

            <div className={classes.questions}>
                {quiz['questions'].map((question, index) => 
                    <Card variant='outlined' key={index} className={classes.questionCard}>
                        <CardContent>
                            <Typography>{question.question_text}</Typography>
                            {question.question_type === 'multiple_choice' && 
                                <TakeMultipleChoice 
                                    question={question}
                                    index={index}
                                    viewingSubmission={true}
                                />
                            }
                            {question.question_type === 'fill_blank' && 
                                <TakeFillBlank 
                                    question={question}
                                    index={index}
                                    viewingSubmission={true}
                                />
                            }
                            {question.question_type === 'free_response' && 
                                <TakeFreeResponse 
                                    question={question}
                                    index={index}
                                    viewingSubmission={true}
                                />
                            }
                        </CardContent>
                    </Card>
                )}
            </div>
            
            <div className={classes.button}>
                <Button
                    variant='contained'
                    color='primary'
                    component={Link}
                    to='/student/Quiz/ViewQuizzes'
                >
                    Go to forms
                </Button>
            </div>
        </Fragment>   
    );
}

export default SubmittedQuiz;