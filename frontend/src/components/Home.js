import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Home extends Component {
    render() {
        return (
            <Button variant="contained" color="secondary">
                Create New Course
            </Button>
        );
    }
}

export default Home