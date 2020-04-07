import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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
        marginRight: theme.spacing(7)
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
        display: 'flex',
        flexDirection: 'row',
        marginLeft: theme.spacing(7),
        marginBottom: theme.spacing(2), 
        flexGrow: 1
    }, 
    classButton: {
        marginRight: theme.spacing(2)
    }
}))


const ViewQuizzes = ({ userId, userType, token, loggedIn }) => {
    const classes = useStyles();
    const [allQuizzes, setAllQuizzes] = useState([]);
    const [classList, setAllClasses] = useState([]);

    useEffect(() => {
        async function getAllClasses() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getAllClasses',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {
                    'user_id': userId,
                },
            };

            let result = await axios(options);
            console.log(result);
            setAllClasses(result.data);
        }
        getAllClasses();
    }, [])

    async function getAllQuizzes(studentId) {
        const options = {
            method: 'POST',
            url: 'http://localhost:3001/api/getInstances',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
                'student_id': studentId,
                'type': 'quiz'
            }
        };

        let result = await axios(options);
        console.log(result);
        setAllQuizzes(result.data);
    };

    return (
        <div>
            <Typography variant="h4" className={classes.pageTitle}>Assignments</Typography>
            <Divider className={classes.divider} variant="fullWidth"/>
            <div className={classes.classSelector}>
                {classList.map((classItem, index) => 
                    <Button 
                        key={index}
                        variant='outlined'
                        color={classItem.is_active === 1 ? 'primary': 'secondary'}
                        onClick={() => getAllQuizzes(classItem.student_id)}
                    >
                        {classItem.name}
                    </Button>
                )}
            </div>
            <Typography className={classes.detailText} variant='h5'>Upcoming</Typography>
            <div className={classes.quizList}>
                <List component='nav'>
                    {allQuizzes.length === 0 &&
                        <Card variant='elevation' className={classes.quizCard}>
                            <CardContent>
                                <Typography>No results. Please select a class</Typography>
                            </CardContent>
                        </Card>
                    }
                    {allQuizzes.map((quiz, index) => 
                        <Card variant='outlined' key={index} className={classes.quizCard}>
                            <CardActionArea component={Link} to={{ pathname: `/student/Quiz/${quiz.title}`, state: { formId: quiz.form_id, instanceId: quiz.instance_id  }}}>
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
            
        </div>
        
    );
}

export default ViewQuizzes;