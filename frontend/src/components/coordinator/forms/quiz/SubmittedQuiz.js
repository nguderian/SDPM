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
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TakeFreeResponse from '../../../student/quiz/questions/TakeFreeResponse';
import PropTypes from 'prop-types';

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
    gridItem: {
        width: '70%',
        border: '1px solid gray',
        borderRadius: '5px',
        marginTop: theme.spacing(2),
        flexGrow: 1,
        maxHeight: '90%',
        overflowY: 'scroll',
        display: 'inline-block',
        textAlign: 'left'
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
    },
    gridContainer: {
        textAlign: 'center',
        overflow: 'hidden'
    },
    gridItemText: {
        display: 'inline-block',
        textAlign: 'left'
    },
}))

const SubmittedQuiz = ({ userId, userType, token, location }) => {
    const classes = useStyles();
    const { instanceId } = location.state;
    const [quiz, setQuiz] = useState({
        title: '',
        description: '',
        grade: '',
        questions: []
    });
    const [isLoading, setIsLoading] = useState(true);

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
            setQuiz({
                title: quiz.title,
                description: quiz.description,
                grade: quiz.grade,
                questions: quiz.questions
            });
        }
        async function stopLoading() {
            setIsLoading(false);
        }
        getSubmission();
        stopLoading();
    }, [token, instanceId, userId]);

    return (
        isLoading ? 
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

            <Typography variant='h5' className={classes.pageTitle}>Grade Received: {quiz.grade}</Typography>
            {userType === 'coordinator' ? 
                <Grid container spacing={3} className={classes.gridContainer}>
                    <Grid item xs={6}>
                        <Typography variant='h6' className={classes.gridItemText}>Submission</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h6' className={classes.gridItemText}>Correct Answers</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.gridItem}>
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
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.gridItem}>
                            {quiz['questions'].map((question, index) => 
                                <Card variant='outlined' key={index} className={classes.questionCard}>
                                    <CardContent>
                                        <Typography>{question.question_text}</Typography>
                                        {question.question_type === 'multiple_choice' && 
                                            <TakeMultipleChoice 
                                                question={question}
                                                index={index}
                                                viewingSubmission={true}
                                                userType={userType}
                                            />
                                        }
                                        {question.question_type === 'fill_blank' && 
                                            <TakeFillBlank 
                                                question={question}
                                                index={index}
                                                viewingSubmission={true}
                                                userType={userType}
                                            />
                                        }
                                        {question.question_type === 'free_response' && 
                                            <TakeFreeResponse 
                                                question={question}
                                                index={index}
                                                viewingSubmission={true}
                                                userType={userType}
                                            />
                                        }
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </Grid>
                </Grid> :
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
            }
            
            
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

SubmittedQuiz.propTypes = {
    userId: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired
}

export default SubmittedQuiz;