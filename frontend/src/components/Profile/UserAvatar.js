import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

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
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
      },
}));

export default function LetterAvatars() {
    const user = fetchUser();
    const classes = useStyles();

    let name = user.name;
    return (
        <div className={classes.root}>
            {user.avatar &&
                <Avatar className={classes.large} src={user.avatar}>
                </Avatar>}
            {!user.avatar &&
                <Avatar className={`${classes.large} ${classes.orange}`}>
                    {name.split(" ")[0].charAt(0)}
                    {name.split(" ")[1] && name.split(" ")[1].charAt(0)}
                </Avatar>}
        </div>
    );
}

