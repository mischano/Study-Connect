import { Grid } from '@material-ui/core';
import React from 'react';
import '../App.css';

const bannerTheme = {
   width: '100%',
   background: "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://blog-www.pods.com/wp-content/uploads/2020/05/SF-Neighborhoods-Feature-photo-.jpg)",
   backgroundSize: 'cover',
   padding: '2em',
}

const bannerInfoStyle = {
   direction:"row",
   justify:"center",
   alignItems:"center",
}



function fetchUser(){
   if(JSON.parse(localStorage.getItem('profile'))){
      let user = (JSON.parse(localStorage.getItem('profile'))).result
      return user;
   } else{
      return null;
   }
}

/* update when classes route is working */
function fetchClasses(){
   let user = fetchUser();
   if(user){
      let classes = user.classes;
      return classes;
   }
}

export default class Profile extends React.Component
{
   constructor(props) {
      super(props);
   }
   
   render() {
      let user = fetchUser();
      fetchClasses();
      return (
         <div>
            <div style = {bannerTheme}>
               <Grid container style={bannerInfoStyle}>
                  <div className='profileBanner' style={{margin: 'auto'}}>
                     <h2>{user.name}</h2>
                     <h4>{user.school}</h4>
                     <h4>{user.gradDate}, {user.major}</h4>
                  </div>
               </Grid>
            </div>
            <Grid className="classes">
                  <h2 className="sectionHeader">Your Classes</h2>
                  <h2 className="sectionHeader">Your Groups</h2>
               </Grid>
         </div>
      );
   }
}