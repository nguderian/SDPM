import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    createButton: {
      margin: theme.spacing(7),
      textAlign: 'center',
    },
    templateText: {
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7)
    },
    templateContainer: {
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    quizDescription: {
        fontSize: 14
    },
    formListWrapper: {
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    },
    quizList: {
        flexGrow: 1,
        maxHeight: 500,
        overflowY: 'scroll',
        // border: '2px solid gray',
        // borderRadius: '5px',
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7)
    }
}));
  
const CreateQuiz = ({ userId, userType, token, loggedIn }) => {
    const classes = useStyles();
    const [allQuizzes, setAllQuizzes] = useState([]);

    useEffect(() => {
        async function getAllQuizzes() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getAllForms',
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
            setAllQuizzes(result.data);
        }
        getAllQuizzes();
    }, [token, userId])

    return (
        <div className={classes.root}>
            <Button className={classes.createButton} variant="contained" color="primary" component={Link} to={{ pathname: `/coordinator/Quiz/New`, state: { formId: '' }}}>
                Create New
            </Button>
            
            <Typography className={classes.templateText} variant='h5'>Previously Made</Typography>
            <Divider className={classes.templateContainer}/>
            
            <div className={classes.quizList}>
                <List component='nav'>
                    {allQuizzes.map((quiz, index) =>
                        <Card variant='outlined' key={index} className={classes.templateContainer}>
                        <CardActionArea component={Link} to={{ pathname: `/coordinator/Quiz/${quiz.title}`, state: { formId: quiz.form_id }}}>
                            <CardContent>
                                <Typography color='textSecondary' gutterBottom>
                                    {quiz.title}
                                </Typography>
                                <Typography className={classes.quizDescription}>{quiz.description}</Typography>
                                <Typography>{quiz.form_id}</Typography>
                            </CardContent>
                        </CardActionArea>
                            
                        </Card>
                    )}
                </List>
            </div>
            
            
            
            {/* <Pagination 
                page={page}
                count={10}
                onChange={handlePageChange}
            >
            {allForms.map((form, index) => 
                <PaginationItem>
                        <Card variant='outlined' key={index} className={classes.templateContainer}>
                        <CardContent>
                            <Typography className={classes.formTitle} color='textSecondary' gutterBottom>
                                {form.title}
                            </Typography>
                            <Typography>{form.description}</Typography>
                        </CardContent>
                    </Card>
                </PaginationItem>
            )}
            
            </Pagination> */}
        </div>
    );
}
export default CreateQuiz;