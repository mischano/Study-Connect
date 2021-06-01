import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

function fetchUser() {
    if (JSON.parse(localStorage.getItem('profile'))) {
        let user = (JSON.parse(localStorage.getItem('profile'))).result;
        return user;
    } else {
        return null;
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(13),
        height: theme.spacing(13),
    },
}));

export default function LetterAvatars() {
    const user = fetchUser();
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Avatar className={classes.large} src={user.avatar || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}>
            </Avatar>
        </div>
    );
}

