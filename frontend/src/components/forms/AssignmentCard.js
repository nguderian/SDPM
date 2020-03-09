import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    assignmentCard: {
        margin: theme.spacing(1)
    }
}));


const AssignmentCard = ({ assignment }) => {
    const classes = useStyles();

    return (
        <div>
            <Card 
                className={classes.assignmentCard} 
                variant="outlined"
                
            >
                <CardActionArea>
                    <CardContent>
                        <Typography>{assignment.formTitle}</Typography>
                    </CardContent>
                </CardActionArea>
                {/* <CardActions>
                    <Button
                        variant="contained"
                        component={Link}
                        to={`/student/viewAssignments/${assignment.formId}`}
                        >
                        Complete Assignment
                    </Button>
                </CardActions> */}
                <Link to={{ pathname: `/student/viewAssignments/${assignment.formId}`}}/>
            </Card>
            
        </div>
        
    );
}

export default AssignmentCard;