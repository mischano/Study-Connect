import React, { useEffect, useState } from 'react';
import '../App.css';
import { getUser, removeFriend } from '../actions/auth';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { classCard } from './Cards';
import { sendFriendReq } from '../actions/friendreqs';
import { getAvailableTimes } from './ScheduleMatch';
import * as api from '../api/index';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LetterAvatars from './Profile/UserAvatar';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        padding: 5,
        backgroundColor: "white",
        border: "1px solid blue",
        width: "33%",
        borderRadius: 20,
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(10)
    },
    title: {
        fontSize: 25,
        color: 'blue',
        fontWeight: "fontWeightBold"
    },
    pos: {
        marginBottom: 25,
        fontSize: 20,
        color: 'blue',
        fontWeight: "fontWeightBold"
    },
}));

const bannerTheme = {
    width: '100%',
    background: "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://blog-www.pods.com/wp-content/uploads/2021/06/resized_FI_Getty_Atlantic-City-NJ.jpg)",
    backgroundSize: 'cover',
    padding: '2em'
}

const OtherUser = ({ match }) => {
    const [otherUser, setOtherUser] = useState(null);
    const friends = fetchUser().friends;
    const dispatch = useDispatch();
    const history = useHistory();
    const user = fetchUser();

    function fetchUser() {
        if (JSON.parse(localStorage.getItem('profile'))) {
            let curUser = (JSON.parse(localStorage.getItem('profile'))).result;
            return curUser;
        } else {
            return null;
        }
    }

    useEffect(() => {
        getOtherUser();
    }, []);

    const getOtherUser = async () => {
        const other = await getUser(match.params.id);
        setOtherUser(other);
    }
    const sendReq = async () => {
        sendFriendReq({ requester: fetchUser()._id, recipient: otherUser._id, status: 1 });
    }
    const deleteFriend = async () => {
        dispatch(removeFriend(user._id, { data: otherUser._id }, history));
        api.removeFriend(otherUser._id, { data: user._id });
    }
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    var weekDayIdx = 0;

    return (
        <div>
            {otherUser && (
                <>
                    <div style={bannerTheme}>
                        <Grid container xs={10}>
                            <h1 style={{ height: "40px", width: "100px", marginLeft: "60px", fontSize: "38px", color: "whitesmoke" }}>Profile</h1>
                            <Grid container justify="flex-end" style={{ width: "146px", marginLeft: "200px" }}>
                                <LetterAvatars props={otherUser} />
                            </Grid>
                            <Grid className='profileBanner' justify="center" style={{ height: "80px", width: "350px" }}>
                                <Grid container
                                    direction="row" justify="flex-start" alignItems="center"
                                    style={{ height: "80px", width: "350px" }}>
                                    <Grid item style={{ width: "350px", textAlign: "start" }} >
                                        <br></br>
                                        <h2 style={{ fontSize: "32px", marginLeft: "14px" }}>{otherUser.name}</h2>
                                        <h4 style={{ fontSize: "16px", marginLeft: "16px" }}>{otherUser.gradDate}, {otherUser.major}</h4>
                                    </Grid>
                                </Grid>
                                <Grid container className='profileBanner' style={{ height: "90px", width: "670px" }}>
                                    <Grid container direction="column" jusitfy="center" alignItems="fle-start" style={{ height: "90px", width: "670px" }}>
                                        <h4 style={{ fontSize: "14px", marginLeft: "15px", marginTop: "10px", height: "90px" }}>{otherUser.bio}</h4>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container style={{height: "40px", width: "154px", marginTop: "30px" }}>
                                {!friends.includes(otherUser._id) ?
                                    <Button variant="contained" color="primary" startIcon={<PersonAddIcon />} size="small" style={{ fontSize: "12px" }} onClick={sendReq}>Add Friend</Button> :
                                    <Button variant="outlined" color="secondary" startIcon={<PersonAddIcon />} size="small" style={{ fontSize: "12px" }} onClick={deleteFriend}>Remove Friend</Button>}
                            </Grid>
                        </Grid>
                    </div>

                    <Grid container direction="row" xs={12} align="center" justify="center">
                        {getAvailableTimes([fetchUser(), otherUser]).map(weekday => {
                            return (
                                <>
                                    <Grid item xs={1}>
                                        {weekDays[weekDayIdx++]}
                                        {weekday.map(slot => {
                                            return <Grid item>{slot[0] + " - " + slot[1]}</Grid>
                                        })}
                                    </Grid>
                                </>
                            )
                        })}
                    </Grid>


                    <Grid className="classes">
                        <h2 className="sectionHeader">Classes</h2>
                        <Grid container spacing={4} direction={'column'} justify="space-evenly">
                            {otherUser.classes.map(course => (
                                <Grid item xs={12}>
                                    {classCard(course)}
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </>
            )}
        </div>
    );
}

export default OtherUser;