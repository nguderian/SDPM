import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles(theme =>({
    pageTitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
}));


const Assignment = ({ match, location }) => {
    const classes = useStyles();
    const { form } = location.state;
    
    // form.questions.map((question, index) => {
    //     let obj = {
    //         questionID = question.questionId,
    //         answer = []
    //     };
    //     arr.push(obj);
    // });

    const [answers, setAnswers] = useState(arr);

    return(
        <Fragment>
            <Typography variant="h4" className={classes.pageTitle}>
                {form.formTitle}
            </Typography>
        </Fragment>
        
    );
}

export default Assignment;