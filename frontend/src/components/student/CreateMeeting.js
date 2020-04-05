import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
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
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    templateText: {
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7)
    },
    meetingList: {
        flexGrow: 1,
        maxHeight: 500,
        overflowY: 'scroll',
        // border: '2px solid gray',
        // borderRadius: '5px',
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7)
    },
    meetingTitle: {
        fontSize: 14
    }
}));

const CreateMeeting = ({ userId, userType, token, loggedIn }) => {
    const classes = useStyles();
    const [allMeetings, setAllMeetings] = useState([]);

    useEffect(() => {
        async function getAllMeetings() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/getAllForms',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }, 
                data: {
                    'user_id': userId,
                    'type': 'meeting'
                }
            };
            
            let result = await axios(options);
            console.log(result);
            setAllMeetings(result.data);
        }
        getAllMeetings();
    }, [])

    return (
        <div className={classes.root}>
            <Button className={classes.createButton} variant="contained" color="primary" component={Link} to={{ pathname: '/student/Meeting/NewMeeting', state: { formId: '' }}}>
                Create New
            </Button>
            <Typography className={classes.templateText} variant='h5'>Meeting Templates</Typography>
            <Divider className={classes.templateContainer}/>

            <div className={classes.meetingList}>
                <List component='nav'>
                    {allMeetings.map((meeting, index) => 
                        <Card variant='outlined' key={index} className={classes.templateContainer}>
                            <CardActionArea component={Link} to={{ pathname: `/meeting/${meeting.title}`, state : { formId: meeting.form_id  }}}>
                                <CardContent>
                                    <Typography color='textSecondary' gutterBottom>
                                        {meeting.title}
                                    </Typography>
                                    <Typography className={classes.meetingTitle}>{meeting.description}</Typography>
                                    <Typography>{meeting.form_id}</Typography>
                                </CardContent>
                            </CardActionArea>

                        </Card>
                    )}
                </List>
            </div>
        </div>
    )
}

export default CreateMeeting;