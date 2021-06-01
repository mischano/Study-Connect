import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
// import { CustomEditButton, EditProfile } from './EditProfile';
import { EditProfile } from './EditProfile';
import { CustomEditButton } from './Styles';
import UserAvatar from './UserAvatar';
import FriendsList from './FriendsList';
import { classCard } from '../Cards'
import '../../App.css';

const bannerTheme = {
    width: '100%',
    background: "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://blog-www.pods.com/wp-content/uploads/2020/05/SF-Neighborhoods-Feature-photo-.jpg)",
    backgroundSize: 'cover',
    padding: '.5em'
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
    const [clickEdit, setClickEdit] = useState(false);
    let user = fetchUser();
    fetchClasses();

    const handleCustomButtonState = () => {
        setClickEdit((prevVal) => !prevVal);
    }

    return (
        <div>
            <div style={bannerTheme}>
                <Grid container style={bannerInfoStyle}>
                    <Grid item container display="flex" direction="row" justify="center">
                        <UserAvatar />
                    </Grid>
                    <div className='profileBanner' style={{ margin: 'auto' }}>
                        <Grid container display="flex" direction="row" justify="center">
                            <h2>{user.name}</h2>
                        </Grid>
                        <h4>{user.gradDate}, {user.major}</h4>
                        <Grid
                            container
                            display="flex"
                            direction="row"
                            justify="center"
                        >
                            <CustomEditButton variant="outlined" startIcon={<EditIcon />}
                                onClick={
                                    handleCustomButtonState
                                }>
                                Edit Profile
                            </CustomEditButton>
                            {clickEdit && (
                                <>
                                    <EditProfile />
                                    <handleCustomButtonState />
                                </>
                            )}
                        </Grid>
                    </div>
                </Grid>
            </div>

            <div className="profileBody">
                <div className="classes">
                    <Grid container spacing={1}
                        direction={'column'} justify="flex-start">
                        <Grid item xs={12}><h2 className="sectionHeader">Your Classes</h2></Grid>
                        {user.classes.map(course => (
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
