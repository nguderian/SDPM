import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TakeFillBlank from './questions/TakeFillBlank';
import TakeMultipleChoice from './questions/TakeMultipleChoice';
import Button from '@material-ui/core/Button';
import FormSubmitted from '../../common/FormSubmitted';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import TakeFreeResponse from './questions/TakeFreeResponse';
import PropTypes from 'prop-types';

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
        maxHeight: '70%',
        overflowY: 'scroll'
    },
    questionCard: {
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }, 
    quizDetail: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }, 
    submitButton: {
        textAlign: 'center',
        marginTop: theme.spacing(2)
    }, 
    progress: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '25%'
    },
}));


const TakeQuiz = ({ userId, token, location }) => {
    const classes = useStyles();
    const { formId, instanceId, studentId } = location.state;
    const [quiz, setQuiz] = useState({
        title: '',
        description: '',
        questions: [],
        answers: []
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        async function getQuiz() {
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
            
            let arr = [];

            quiz.questions.forEach(question => {
                let obj = {
                    question_id: question.question_id,
                    'answer_text': ''
                };
                arr.push(obj);
            });
            
            setQuiz({
                title: quiz.title,
                description: quiz.description,
                questions: quiz.questions,
                answers: arr
            });
        }
        getQuiz()
    }, [formId, token, userId])

    const captureAnswer = (answer, index) => {
        quiz.answers[index].answer_text = answer;
        setQuiz({ ...quiz })
    };

    const handleCloseSubmittedDialog = () => {
        setSubmitted(false);
    };

    async function submitQuiz () {
        const body = {
            "form_id": formId,
            "instance_id": instanceId,
            "student_id": studentId,
            "results": quiz['answers'], 
            "user_id": userId
        };

        const options = {
            method: 'POST', 
            url: 'http://localhost:3001/api/submitForm',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }, 
            data: body
        };

        let response = await axios(options);
        let responseOK = response && response.status === 200 && response.statusText === 'OK';
        let success = true;
        if(responseOK) {
            success = success && true;
        }
        else {
            success = success && false;
        }

        setSubmitted(success);
    }

    return(
        quiz.questions.length === 0 ? 
        <div className={classes.progress}>
            <CircularProgress />
        </div> :
        <Fragment>
            <Typography variant="h4" className={classes.pageTitle}>{quiz['title']}</Typography>

            <form className={classes.quizDetail} noValidate autoComplete='off'>
                <TextField
                    disabled
                    variant='outlined'
                    value={quiz['description']}
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
                                    handleChange={captureAnswer}
                                    index={index}
                                    viewingSubmission={false}
                                />
                            }
                            {question.question_type === 'fill_blank' && 
                                <TakeFillBlank 
                                    question={question}
                                    handleChange={captureAnswer}
                                    index={index}
                                    viewingSubmission={false}
                                />
                            }
                            {question.question_type === 'free_response' && 
                                <TakeFreeResponse 
                                    question={question}
                                    handleChange={captureAnswer}
                                    index={index}
                                    viewingSubmission={false}
                                />
                            }
                        </CardContent>
                    </Card>
                )}
            </div>
            <div className={classes.submitButton}>
                <Button 
                    variant='contained' 
                    color='primary'
                    onClick={submitQuiz}
                >
                    Submit
                </Button>
            </div>              
            
            {submitted && <FormSubmitted 
                open={submitted}
                onClose={() => handleCloseSubmittedDialog()}
                confirmationText={`${quiz['title']} submitted!`}
                submittedText='Quiz Submitted'
                routeBack='/student/Quiz/ViewQuizzes'
            />}
        </Fragment>
        
    );
}

TakeQuiz.propTypes = {
    userId: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired
}

export default TakeQuiz;