import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Link } from 'react-router-dom'

// const CreateForm = () => {
//     return (
//         <Container maxWidth="xl">
//             <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
//             <Box p={10}>
//                 <Button variant="contained" color="primary">
//                     Create New
//                 </Button>
//             </Box>
//             <Container maxWidth="md">
//                 <Typography component="" style={{ backgroundColor: 'black', height: '100vh' }}/>
//             </Container>
//             </Typography>
//         </Container>
//     );
// }

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
  
const CreateForm = () => {
    const classes = useStyles();

    return (
        <Fragment className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Button className={classes.createButton} variant="contained" color="primary" component={Link} to='/NewForm'>
                        Create New
                    </Button>
                </Grid>
                <Grid item xs={12} className={classes.templateContainer}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">
                                Templates
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    );
}
export default CreateForm;