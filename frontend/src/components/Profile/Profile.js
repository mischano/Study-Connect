import { Grid } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core';
import React from 'react';
import FriendsList from './FriendsList';
import '../../App.css';

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
function groupCard(props) {
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

function classCard(props) {
   return (
      <div className='classCard'>
         <h2 className="courseTitle">{props.department + " " + props.number}</h2>
         <div className="classInfo">
            <p className='subTitle'>{props.startTime + "-" + props.endTime}</p>
            <p className='subTitle'>{props.weekDays}</p>
         </div>
      </div>
   )
}
const Profile = () => {
   let user = fetchUser();
   fetchClasses();

   return (
      <div>
         <div style={bannerTheme}>
            <Grid container style={bannerInfoStyle}>
               <div className='profileBanner' style={{ margin: 'auto' }}>
                  <h2>{user.name}</h2>
                  <h4>{user.gradDate}, {user.major}</h4>
               </div>
            </Grid>
         </div>

         <div className="profileBody">
            <div className="classes">
               <Grid container spacing={3}
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
               <Grid container zeroMinWidth
                  spacing={1}
                  direction="row"
                  justify="flex-start"
                  alignItems="stretch"
                  wrap="wrap" >
                  <Grid item xs={12}><h2 className="sectionHeader">Your Groups</h2></Grid>
                  <Grid item xs={12} sm={6} md={4} spacing={1}> {groupCard()} </Grid>
                  <Grid item xs={12} sm={6} md={4} spacing={1}> {groupCard()} </Grid>
                  <Grid item xs={12} sm={6} md={4} spacing={1}> {groupCard()} </Grid>
               </Grid>
            </div>
            <div className="friends">
               <FriendsList/></div>
         </div> 
      </div>
   );
}


export default Profile