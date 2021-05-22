import { Grid, Button, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import mongoose from 'mongoose';
import '../../App.css';
import { getUser } from '../../actions/auth';
import Box from '@material-ui/core/Box'

function fetchUser() {
    if (JSON.parse(localStorage.getItem('profile'))) {
        let user = (JSON.parse(localStorage.getItem('profile'))).result;
        return user;
    } else {
        return null;
    }
}
function fetchFriends() {
    let user = fetchUser();
    if (user) {
        let friends = user.friends;
        return friends;
    }
}
const useStyles = makeStyles((theme) => ({

}));

const FriendsList = () => {
    const friends = useStyles();
    let user = fetchUser();
    const [users, setUsers] = useState([]);

    const getFriends = async () => {
        user.friends.map(async friend => {
            await getUser(friend).then(res => {
                setUsers(users.concat(res.name))
            })
        })
    }

    useEffect(() => {
        getFriends();
    }, [])

    fetchFriends();

    const reptiles = ["alligator", "snake", "lizard"];

    const PrintStuff = () => {
        console.log(users);
    }
        // <ol>
        //     {reptiles.map((reptile) => (
        //         <li>{reptile}</li>
        //     ))}
        // </ol>

    return (
        console.log(users)
    );
}

export default FriendsList;