import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
    templateContainer: {
        marginLeft: theme.spacing(7)
    }
}));

const CreateSurvey = ({ userId, userType, token, loggedIn }) => {
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
    }, []);
    
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Button className={classes.createButton} variant="contained" color="primary" component={Link} to='/coordinator/Survey/NewSurvey'>
                        Create New
                    </Button>
                </Grid>
                <Grid item xs={12} className={classes.templateContainer}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">
                                Peer Review Templates
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateSurvey;