import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { EditProfile } from './EditProfile';
import { CustomEditButton } from './Styles';
import UserAvatar from './UserAvatar';
import FriendsList from './FriendsList';
import { classCard } from '../Cards'
import '../../App.css';
import { editProfile } from '../../api';

const bannerTheme = {
    width: '100%',
    background: "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://blog-www.pods.com/wp-content/uploads/2020/05/SF-Neighborhoods-Feature-photo-.jpg)",
    backgroundSize: 'cover',
    padding: '2em'
}

const bannerInfoStyle = {
    direction: "row",
    justify: "center",
    alignItems: "center"
}

function fetchUser() {
    if (JSON.parse(localStorage.getItem('profile'))) {
        let user = (JSON.parse(localStorage.getItem('profile'))).result
        return user;
    } else {
        return null;
    }
}

function fetchClasses() {
    let user = fetchUser();
    if (user) {
        let classes = user.classes;
        return classes;
    }
}

/* placeholder group card */
function groupCard() {
    return (
        <a className="cardLink" href="">
            <div className="card">
                <div className="cardTitle">
                    <h2>CHEM126 Lab Group</h2>
                </div>
                <div className="subTitle">
                    <p>32 members</p>
                </div>
            </div>
        </a>
    )
}

const Profile = () => {
    const [userInfo, setUserInfo] = useState(fetchUser);
    const [clickEdit, setClickEdit] = useState(false);

    useEffect(() => {
            const interval = setInterval(() => {
                if (JSON.parse(localStorage.getItem('profile'))) {
                    let user = (JSON.parse(localStorage.getItem('profile'))).result;
                    setUserInfo(user);
                }
            }, 2000);
            return () => clearInterval(interval);
    });

    fetchClasses();

    const handleChange = () => {
        setClickEdit((prevVal) => !prevVal);
    }

    return (
        <div>
            <div style={bannerTheme}>
                <Grid container xs={10}>
                    <Grid container justify="flex-end" xs={5}>
                        <UserAvatar />
                    </Grid>
                    <Grid className='profileBanner' justify="center" style={{ height: "80px", width: "350px" }}>
                        <Grid container
                            direction="row" justify="flex-start" alignItems="center"
                            style={{ height: "80px", width: "350px" }}>
                            <Grid item style={{ width: "350px", textAlign: "start" }} >
                                <br></br>
                                <h2 style={{ fontSize: "32px", marginLeft: "14px" }}>{userInfo.name}</h2>
                                <h4 style={{ fontSize: "16px", marginLeft: "14px" }}>{userInfo.gradDate}, {userInfo.major}</h4>
                            </Grid>
                        </Grid>
                        <Grid container className='profileBanner' style={{ height: "90px", width: "670px" }}>
                            <Grid container direction="column" jusitfy="center" alignItems="fle-start" style={{ height: "90px", width: "670px" }}>
                                <h4 style={{ fontSize: "14px", marginLeft: "15px", marginTop: "10px", height: "90px" }}>{userInfo.bio}</h4>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid style={{ width: "100px", height: "40px", marginTop: "30px" }}>
                        <CustomEditButton style={{ height: "35px", width: "120px", marginTop: "10px" }}
                            onClick={
                                handleChange
                            }>
                            Edit Profile
                        </CustomEditButton>
                        {clickEdit && (<EditProfile />)}
                    </Grid>
                </Grid>
            </div>
            <div className="profileBody">
                <div className="classes">
                    <Grid container spacing={1}
                        direction={'column'} justify="flex-start">
                        <Grid item xs={12}><h2 className="sectionHeader">Your Classes</h2></Grid>
                        {userInfo.classes.map(course => (
                            <Grid item xs={12}>
                                {classCard(course)}
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className='groups'>
                    <Grid container
                        spacing={1}
                        direction="row"
                        justify="flex-start"
                        alignItems="stretch"
                        wrap="wrap">
                        <Grid item xs={12}><h2 className="sectionHeader">Your Groups</h2></Grid>
                        <Grid item xs={12} sm={6}> {groupCard()} </Grid>
                        <Grid item xs={12} sm={6}> {groupCard()} </Grid>
                        <Grid item xs={12} sm={6}> {groupCard()} </Grid>
                    </Grid>
                </div>
                <div className="friends">
                    <FriendsList />
                </div>
            </div>
        </div>
    );
}

export default Profile;
