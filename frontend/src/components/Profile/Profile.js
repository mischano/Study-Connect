import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { EditProfile } from './EditProfile';
import EditIcon from '@material-ui/icons/Edit';
import LetterAvatars from './UserAvatar';
import FriendsList from './FriendsList';
import { classCard } from '../Cards'
import GroupsList from '../Groups/GroupsList.js'
import '../../App.css';
import { fetchUser } from '../GetUser.js';

// styling for top banner 
const bannerTheme = {
   width: '100%',
   background: "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://blog-www.pods.com/wp-content/uploads/2020/05/SF-Neighborhoods-Feature-photo-.jpg)",
   backgroundSize: 'cover',
   backgroundPosition: 'center',
   padding: '2em',
}

const Profile = () => {
   const [userInfo, setUserInfo] = useState(fetchUser);
   const [clickEdit, setClickEdit] = useState(false);

   /* Fetches the user data from database every 1.5 second interval */
   useEffect(() => {
      const interval = setInterval(() => {
         if (JSON.parse(localStorage.getItem('profile'))) {
            let user = (JSON.parse(localStorage.getItem('profile'))).result;
            setUserInfo(user); // store newly fetched data to state hook array
         }
      }, 1500);
      return () => clearInterval(interval); // clear the interval
   });

   /* Triggered on edit button click */
   const handleChange = () => {
      setClickEdit((prevVal) => !prevVal);
   }

   return (
      <div>
         <div style={bannerTheme}>
            {clickEdit && (handleChange)}
            <div className='profileBanner'>
               <LetterAvatars className="avi" props={userInfo} />
               <div className="userInfo">
                  <h2>{userInfo.name}</h2>
                  <h4>{userInfo.gradDate}, {userInfo.major}</h4>
                  <p className="bio">{userInfo.bio}</p>
               </div>
            </div>
            <Grid style={{ width: "100px", height: "40px", marginTop: "30px" }}>
               <Button variant="contained" color="primary" startIcon={<EditIcon />} size="small" style={{ fontSize: "12px", width: "135px", height: "35px" }} onClick={handleChange}>Edit Profile</Button>
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
               <FriendsList user={userInfo} />
            </div>
         </div>
      </div>
   );
}

export default Profile;
