import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CompleteForm from '../../common/CompleteForm';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    divider: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }, 
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    quizList: {
        flexGrow: 1,
        maxHeight: '40%',
        overflowY: 'scroll',
        border: '1px solid gray',
        borderRadius: '5px',
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7), 
        marginBottom: theme.spacing(2)
    },
    quizCard: {
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }, 
    detailText: {
        marginLeft: theme.spacing(7),
        marginBottom: theme.spacing(2)
    }, 
    classSelector: {
        marginLeft: theme.spacing(7),
        marginBottom: theme.spacing(2), 
        minWidth: '15%'
    },
    options: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: theme.spacing(2)
    }
}))


const ViewQuizzes = ({ userId, token }) => {
    const classes = useStyles();
    const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const [activeClasses, setActiveClasses] = useState([]);
    const [inactiveClasses, setInactiveClasses] = useState([]);
    const [activeStudentId, setActiveStudentId] = useState('');
    const [inactiveStudentId, setInactiveStudentId] = useState('');
    const [quizToShow, setQuizToShow] = useState({
        showQuiz: false,
        quizAtIndex: '',
        upcoming: false,
        completed: false
    });

    useEffect(() => {
        async function getActiveClasses() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getAllClasses',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {
                    'user_id': userId,
                    'is_active': 1
                },
            };

            let result = await axios(options);
            console.log(result);
            setActiveClasses(result.data);
        }
        async function getInactiveClasses() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getAllClasses',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {
                    'user_id': userId,
                    'is_active': 0
                },
            };

            let result = await axios(options);
            setInactiveClasses(result.data);
        }
        getActiveClasses();
        getInactiveClasses();
    }, [token, userId])

    useEffect(() => {
        if(activeStudentId) {
            async function getUpcomingQuizzes() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getInstances',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'student_id': activeStudentId,
                        'type': 'quiz',
                        'is_complete': 0
                    }
                };
        
                let result = await axios(options);
                console.log(result);
                setUpcomingQuizzes(result.data);
            }
            async function getCompletedQuizzes() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getInstances',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'student_id': activeStudentId,
                        'type': 'quiz',
                        'is_complete': 1
                    }
                };
        
                let result = await axios(options);
                console.log(result);
                setCompletedQuizzes(result.data);
            }
            getUpcomingQuizzes();
            getCompletedQuizzes();
        }
    }, [activeStudentId, token]);

    const handleActiveClassChange = event => {
        setActiveStudentId(event.target.value);   
        setInactiveStudentId('');
    };

    const handleInactiveClassChange = event => {
        setInactiveStudentId(event.target.value);
        setActiveStudentId('');
    };
    
    const handleQuizCardClick = (index, type) => {
        if(type === 'upcoming') {
            setQuizToShow({ showQuiz: true, quizAtIndex: upcomingQuizzes[index], upcoming: true, completed: false });
        }
        else if(type === 'completed') {
            setQuizToShow({ showQuiz: true, quizAtIndex: completedQuizzes[index], upcoming: false, completed: true });
        }
    };

    return (
        <Fragment>
            <Typography variant="h4" className={classes.pageTitle}>Assignments</Typography>
            <Divider className={classes.divider} variant="fullWidth"/>
            
            <div className={classes.options}>
                <FormControl variant='outlined' className={classes.classSelector}>
                    <InputLabel>Select current class</InputLabel>
                    <Select
                        label='Class'
                        value={activeStudentId}
                        onChange={handleActiveClassChange}
                    >
                        {activeClasses.map((activeClass, index) => 
                            <MenuItem key={index} value={activeClass.student_id}>{activeClass.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl variant='outlined' className={classes.classSelector}>
                    <InputLabel>Select previous class</InputLabel>
                    <Select
                        label='Class'
                        value={inactiveStudentId}
                        disabled={inactiveClasses.length === 0 ? true : false}
                        onChange={handleInactiveClassChange}
                    >
                        {inactiveClasses.map((inactiveClass, index) => 
                            <MenuItem key={index} value={inactiveClass.student_id}>{inactiveClass.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
            
            <Typography className={classes.detailText} variant='h5'>Upcoming</Typography>
            <div className={classes.quizList}>
                <List component='nav'>
                    {upcomingQuizzes.length === 0 &&
                        <Card variant='elevation' className={classes.quizCard}>
                            <CardContent>
                                <Typography>No upcoming assignments. Please select a class</Typography>
                            </CardContent>
                        </Card>
                    }
                    {upcomingQuizzes.map((quiz, index) => 
                        <Card variant='outlined' key={index} className={classes.quizCard}>
                            <CardActionArea onClick={() => handleQuizCardClick(index, 'upcoming')}>
                                <CardContent>
                                    <Typography color='textSecondary' gutterBottom>
                                        {quiz.title}
                                    </Typography>
                                    <Typography>{quiz.description}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )}
                    
                </List>
            </div>
            
            <Typography className={classes.detailText} variant='h5'>Completed</Typography>
            <div className={classes.quizList}>
                <List component='nav'>
                    {completedQuizzes.length === 0 &&
                        <Card variant='elevation' className={classes.quizCard}>
                            <CardContent>
                                <Typography>No completed asignments. Please select a class</Typography>
                            </CardContent>
                        </Card>
                    }
                    {completedQuizzes.map((quiz, index) => 
                        <Card variant='outlined' key={index} className={classes.quizCard}>
                            <CardActionArea onClick={() => handleQuizCardClick(index, 'completed')}>
                                <CardContent>
                                    <Typography color='textSecondary' gutterBottom>
                                        {quiz.title}
                                    </Typography>
                                    <Typography>{quiz.description}</Typography>
                                    <Typography>Grade Received: {quiz.grade}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )}
                    
                </List>
            </div>

            {quizToShow.showQuiz && <CompleteForm 
                open={quizToShow.showQuiz}
                onClose={() => setQuizToShow({ showQuiz: false, quizAtIndex: '' })}
                formTitle={quizToShow.quizAtIndex.title}
                formDescription={quizToShow.quizAtIndex.description}
                buttonText={quizToShow.upcoming ? 'Take this quiz' : 'View this submission'}
                routeForward={{ 
                    pathname: quizToShow.upcoming ? `/student/Quiz/${quizToShow.quizAtIndex.title}` : `/viewSubmission/Quiz/${quizToShow.quizAtIndex.title}`, 
                    state: { 
                        formId: quizToShow.quizAtIndex.form_id, 
                        instanceId: quizToShow.quizAtIndex.instance_id, 
                        studentId: activeStudentId === '' ? inactiveStudentId : activeStudentId
                    }
                }}
            />}
        </Fragment>
        
    );
}

export default ViewQuizzes;