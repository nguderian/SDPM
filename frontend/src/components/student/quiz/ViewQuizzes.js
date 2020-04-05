import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import { Link } from 'react-router-dom';


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
    }
}))


const ViewQuizzes = ({ userId, userType, token, loggedIn }) => {
    const classes = useStyles();
    const [allQuizzes, setAllQuizzes] = useState([]);

    useEffect(() => {
        async function getAllQuizzes() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getInstances',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {
                    'user_id': userId,
                    'type': 'quiz'
                }
            };

            let result = await axios(options);
            console.log(result);
            setAllQuizzes(result.data)
        }
        getAllQuizzes();
    }, []);

    
    return (
        <div>
            <Typography variant="h4" className={classes.pageTitle}>Quizzes</Typography>
            <Divider className={classes.divider} variant="fullWidth"/>
            <Typography className={classes.detailText} variant='h5'>Upcoming</Typography>
            <div className={classes.quizList}>
                <List component='nav'>
                    {allQuizzes.map((quiz, index) => 
                        <Card variant='outlined' key={index} className={classes.quizCard}>
                            <CardActionArea component={Link} to={{ pathname: `/student/Quiz/${quiz.title}`, state: { formId: quiz.form_id, instanceId: quiz.instance_id }}}>
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