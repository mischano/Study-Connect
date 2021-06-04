import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { EditProfile } from './EditProfile';
import { CustomEditButton } from './Styles';
// import UserAvatar from './UserAvatar';
import EditIcon from '@material-ui/icons/Edit';
import LetterAvatars from './UserAvatar';
import FriendsList from './FriendsList';
import { classCard } from '../Cards'
import GroupsList from '../Groups/GroupsList.js'
import '../../App.css';

const bannerTheme = {
    width: '100%',
    // height: '100%',
    background: "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://blog-www.pods.com/wp-content/uploads/2020/05/SF-Neighborhoods-Feature-photo-.jpg)",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '2em',
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

const Profile = () => {
    const [userInfo, setUserInfo] = useState(fetchUser);
    const [clickEdit, setClickEdit] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (JSON.parse(localStorage.getItem('profile'))) {
                let user = (JSON.parse(localStorage.getItem('profile'))).result;
                setUserInfo(user);
            }
        }, 1500);
        return () => clearInterval(interval);
    });

    fetchClasses();

    const handleChange = () => {
        setClickEdit((prevVal) => !prevVal);
    }

    return (
        <div>
            <div style={bannerTheme}>
                {clickEdit && (handleChange)}
                    
                    
                    <div className='profileBanner'>
                    <LetterAvatars className="avi" props={userInfo}/>
                            <div className="userInfo">
                                <h2>{userInfo.name}</h2>
                                <h4>{userInfo.gradDate}, {userInfo.major}</h4>
                                <p className="bio">{userInfo.bio}</p>
                            </div>
                    </div>
                    <Grid style={{ width: "100px", height: "40px", marginTop: "30px" }}>
                        {/* <CustomEditButton startIcon={<EditIcon />} style={{ height: "35px", width: "140px", marginTop: "10px" }}
                            onClick={
                                handleChange
                            }>
                            Edit Profile
                        </CustomEditButton> */}
                        <Button variant="contained" color="primary" startIcon={<EditIcon />} size="small" style={{ fontSize: "12px", width: "135px", height: "35px" }} onClick={handleChange}>Edit Profile</Button>
                        {/* <Button variant="contained"  endIcon={<EditIcon />} color="primary" style={{ color: "tomato", width: "160px", marginTop: "10px"}}
                        onClick={
                            handleChange
                        }>
                            Edit Profile
                            </Button> */}
                        {clickEdit && (<EditProfile />)}
                    </Grid>
            </div>
            <div className="profileBody">
                <div className="classes">
                    <Grid container spacing={1}
                        direction={'column'} justify="flex-start">
                        <Grid item xs={12}><h2 className="sectionHeader">Your Classes</h2></Grid>
                        {userInfo.classes.map(course => (
                            <Grid item xs={12} spacing={1}>
                                {classCard(course)}
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className='groups'>
                    <h2 className="sectionHeader">Your Groups</h2>
                    <GroupsList user={userInfo}></GroupsList>
                </div>
                <div className="friends">
                <h2 className="sectionHeader">Your Friends</h2>
                    <FriendsList user={userInfo}/>
                </div>
            </div>
        </div>
    );
}

export default Profile;
