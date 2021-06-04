import React, { useEffect, useState } from 'react';
import '../App.css';
import { getUser, removeFriend } from '../actions/auth';
import { Button, Grid } from '@material-ui/core';
import { classCard } from './Cards';
import { sendFriendReq } from '../actions/friendreqs';
import { getAvailableTimes } from './ScheduleMatch';
import * as api from '../api/index';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LetterAvatars from './Profile/UserAvatar';
import GroupsList from './Groups/GroupsList'
import FriendsList from './Profile/FriendsList'

// const useStyles = makeStyles((theme) => ({
//     root: {
//         /* minWidth: 275,
//         padding: 5,
//         backgroundColor: "white",
//         border: "1px solid blue",
//          width: "33%",
//         borderRadius: 20,
//         marginTop: theme.spacing(3),
//         marginLeft: theme.spacing(10) */
//     },
//     title: {
//         fontSize: 25,
//         color: 'blue',
//         fontWeight: "fontWeightBold"
//     },
//     pos: {
//         marginBottom: 25,
//         fontSize: 20,
//         color: 'blue',
//         fontWeight: "fontWeightBold"
//     },
// }));

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
                            <div className='profileBanner'>
                                <LetterAvatars className="avi" props={otherUser}/>
                                <div className="userInfo">
                                    <h2>{otherUser.name}</h2>
                                    <h4>{otherUser.gradDate}, {otherUser.major}</h4>
                                    <p className='bio'>{otherUser.bio}</p>
                                </div>
                            </div>
                            <Grid container>
                                {!friends.includes(otherUser._id) ?
                                    <Button variant="contained" color="primary" startIcon={<PersonAddIcon />} size="small" style={{ fontSize: "12px" }} onClick={sendReq}>Add Friend</Button> :
                                    <Button variant="outlined" color="secondary" startIcon={<PersonAddIcon />} size="small" style={{ fontSize: "12px" }} onClick={deleteFriend}>Remove Friend</Button>}
                            </Grid>
                    </div>
                    
                    <div className = "profileBody">
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

                    <div className="classes">
                        <h2 className="sectionHeader">{otherUser.name}'s Classes</h2>
                        <Grid container spacing={1} direction={'column'} justify="flex-start">
                            {otherUser.classes.map(course => (
                                <Grid item xs={12}>
                                    {classCard(course)}
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    </div>
                    <div className='groups'>
                    <h2 className="sectionHeader">Groups</h2>
                    <GroupsList user={otherUser}></GroupsList>
                </div>
                <div className="friends">
                    <h2 className="sectionHeader">Friends</h2>
                    <FriendsList user={otherUser}/>
                </div>
                </>
            )}
        </div>
    );
}

export default OtherUser;