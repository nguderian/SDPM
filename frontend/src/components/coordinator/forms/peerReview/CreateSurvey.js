import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import CardActionArea from '@material-ui/core/CardActionArea';

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
    surveyList: {
        flexGrow: 1,
        maxHeight: 500,
        overflowY: 'scroll',
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7)
    },
    surveyDescription: {
        fontSize: 14
    },
    progress: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '25%'
    },
}));

const CreateSurvey = ({ userId, token }) => {
    const classes = useStyles();
    const [allSurveys, setAllSurveys] = useState([]);

    useEffect(() => {
        async function getAllSurveys() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getAllForms',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }, 
                data: {
                    'user_id': userId,
                    'type': 'survey'
                }
            };

            let result = await axios(options);
            console.log(result);
            setAllSurveys(result.data);
        }
        getAllSurveys();
    }, [token, userId]);
    
    return (
        <div className={classes.root}>
            <Button className={classes.createButton} variant="contained" color="primary" component={Link} to='/coordinator/Survey/NewSurvey'>
                Create New
            </Button>

            <Typography className={classes.templateText} variant='h5'>Previously Made</Typography>
            <Divider className={classes.templateContainer}/>

            <div className={classes.surveyList}>
                {allSurveys.length === 0 ?
                    <div className={classes.progress}>
                        <CircularProgress />
                    </div> :
                    <List component='nav'>
                        {allSurveys.map((survey, index) => 
                            <Card variant='outlined' key={index} className={classes.templateContainer}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography color='textSecondary' gutterBottom>
                                            {survey.title}
                                        </Typography>
                                        <Typography className={classes.surveyDescription}>{survey.description}</Typography>
                                        <Typography>{survey.form_id}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )}
                    </List>
                }
            </div>
        </div>
    )
}

export default CreateSurvey;