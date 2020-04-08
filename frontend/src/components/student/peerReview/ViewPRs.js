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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    classSelector: {
        marginLeft: theme.spacing(7),
        marginBottom: theme.spacing(2), 
        minWidth: '15%'
    },
    detailText: {
        marginLeft: theme.spacing(7),
        marginBottom: theme.spacing(2)
    },
    prCard: {
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    prList: {
        flexGrow: 1,
        maxHeight: '40%',
        overflowY: 'scroll',
        border: '1px solid gray',
        borderRadius: '5px',
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7), 
        marginBottom: theme.spacing(2)
    },
    divider: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }, 
}));

const ViewPRs = ({ userId, userType, token, loggedIn }) => {
    const classes = useStyles();
    const [allPRs, setAllPRs] = useState([]);
    const [classList, setClassList] = useState([]);
    const [studentId, setStudentId] = useState('');

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
            setClassList(result.data);
        }
        getAllClasses();
    }, []);

    useEffect(() => {
        if(studentId) {
            async function getAllPRs() {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:3001/api/getInstances',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        'student_id': studentId,
                        'type': 'survey'
                    }
                };
        
                let result = await axios(options);
                console.log(result);
                setAllPRs(result.data);
            }
            getAllPRs();
        }
    }, [studentId]);

    const handleClassChange = event => {
        setStudentId(event.target.value);   
    };

    return (
        <Fragment>
            <Typography variant="h4" className={classes.pageTitle}>Group Peer Reviews</Typography>
            <Divider className={classes.divider} variant="fullWidth"/>
            <FormControl variant='outlined' className={classes.classSelector}>
                <InputLabel>Select Class</InputLabel>
                <Select
                    label='Class'
                    value={studentId}
                    onChange={handleClassChange}
                >
                    {classList.map((classItem, index) => 
                        <MenuItem key={index} value={classItem.student_id}>{classItem.name}</MenuItem>
                    )}
                </Select>
            </FormControl>

            <Typography className={classes.detailText} variant='h5'>Upcoming</Typography>
            <div className={classes.prList}>
                <List component='nav'>
                    {allPRs.length === 0 &&
                        <Card variant='elevation' className={classes.prCard}>
                            <CardContent>
                                <Typography>No upcoming peer reviews. Please select a class</Typography>
                            </CardContent>
                        </Card>
                    }
                    {allPRs.map((pr, index) => 
                        <Card variant='outlined' key={index} className={classes.prCard}>
                            <CardActionArea component={Link} to={{ pathname: `/student/Quiz/${pr.title}`, state: { formId: pr.form_id, instanceId: pr.instance_id, studentId: studentId }}}>
                                <CardContent>
                                    <Typography color='textSecondary' gutterBottom>
                                        {pr.title}
                                    </Typography>
                                    <Typography>{pr.description}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )}
                    
                </List>
            </div>
            
            <Typography className={classes.detailText} variant='h5'>Completed</Typography>
            <div className={classes.prList}>
                <List component='nav'>
                    {allPRs.length === 0 &&
                        <Card variant='elevation' className={classes.prCard}>
                            <CardContent>
                                <Typography>No completed peer reviews. Please select a class</Typography>
                            </CardContent>
                        </Card>
                    }
                    {allPRs.map((pr, index) => 
                        <Card variant='outlined' key={index} className={classes.prCard}>
                            <CardActionArea component={Link} to={{ pathname: `/student/Quiz/${pr.title}`, state: { formId: pr.form_id, instanceId: pr.instance_id, studentId: studentId }}}>
                                <CardContent>
                                    <Typography color='textSecondary' gutterBottom>
                                        {pr.title}
                                    </Typography>
                                    <Typography>{pr.description}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )}
                    
                </List>
            </div>

        </Fragment>
    )
}

export default ViewPRs;