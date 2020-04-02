import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
    formTitle: {
        fontSize: 14
    }, 
}));
  
const CreateQuiz = ({ userId, userType, token, logedIn}) => {
    const classes = useStyles();
    const [allForms, setAllForms] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function getAllForms() {
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
            setAllForms(result.data);
        }
        getAllForms();
    }, [])

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Fragment className={classes.root}>
            <Button className={classes.createButton} variant="contained" color="primary" component={Link} to={{ pathname: `/coordinator/Quiz/New`, state: { formId: '' }}}>
                Create New
            </Button>
            
            <Typography className={classes.templateText} variant='h5'>Quiz Templates</Typography>
            <Divider className={classes.templateContainer}/>
            <List component='nav'>
                {allForms.map((form, index) =>
                    <Card variant='outlined' key={index} className={classes.templateContainer}>
                    <CardActionArea component={Link} to={{ pathname: `/coordinator/Quiz/${form.title}`, state: { formId: form.form_id }}}>
                        <CardContent>
                            <Typography color='textSecondary' gutterBottom>
                                {form.title}
                            </Typography>
                            <Typography className={classes.formTitle}>{form.description}</Typography>
                            <Typography>{form.form_id}</Typography>
                        </CardContent>
                    </CardActionArea>
                        
                    </Card>
                )}
            </List>
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
        </Fragment>
    );
}
export default CreateQuiz;