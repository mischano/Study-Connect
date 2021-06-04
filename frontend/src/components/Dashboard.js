import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import '../App.css';
import GroupsList from './Groups/GroupsList.js';
import { fetchUser } from './GetUser.js';

const Dashboard = () => {
   const [user, setUser] = useState(fetchUser());

   return (
      <div>
         <div>
            <div className="topBanner">
               <h1 className="mainPageTitle"> Dashboard </h1>
               <img className="heroImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Books_with_Apple_Flat_Icon_Vector.svg/1200px-Books_with_Apple_Flat_Icon_Vector.svg.png" alt="Books"></img>
               <div className="bannerBlurb">
                  <h2 id="greeting">{getGreeting()}</h2>
                  <h4 id="didYouKnow">Did you know...</h4>
                  <p id="studyTip">{getStudyTip()}</p>
               </div>
            </div>
         </div>
         <div className="groups">
            <h2 className="sectionHeader">Your Groups</h2>
            <GroupsList user={user}></GroupsList>
         </div>

         <div className="resources">
            <Grid container
               spacing={1}
               direction="row"
               justify="flex-start"
               alignItems="stretch"
               wrap="wrap">
               <Grid item xs={12}><h2 className="sectionHeader">Resources</h2></Grid>
               <Grid item xs={12} sm={4} spacing={1}>{resourceCard("https://success.calpoly.edu/", "Mustang Success Center", "Academic Services")}</Grid>
               <Grid item xs={12} sm={4} spacing={1}>{resourceCard("https://careerservices.calpoly.edu/", "Career Services", "Career Development")}</Grid>
               <Grid item xs={12} sm={4} spacing={1}>{resourceCard("https://basicneeds.calpoly.edu/calfresh", "CalFresh", "Health and Wellbeing")}</Grid>
               <Grid item xs={12} sm={4} spacing={1}>{resourceCard("https://chw.calpoly.edu/health/health-services", "Cal Poly Health Services", "Health and Wellbeing")}</Grid>
            </Grid>
         </div>
      </div>
   );
}


export default Dashboard;

// returns a random study tip

function getStudyTip() {
   let tip1 = `Changing up where you study keeps things fresh, 
               helps you focus, and improves retention. Instead of spending hours in one place, 
               move around to different rooms. Try going to a café or the library!`
   let tip2 = `Studies show “cramming” hinders retention and makes it difficult to process information. 
               Instead of studying for a long block of time, break it into shorter sessions with frequent 
               breaks in between to refresh and refocus.`
   let tips = [tip1, tip2];
   return tips[Math.floor(Math.random() * tips.length)];
}

// returns proper time of day greeting on banner
function getGreeting() {
   let today = new Date();
   let currentHour = today.getHours();
   if (JSON.parse(localStorage.getItem('profile'))) {
      let userName = (JSON.parse(localStorage.getItem('profile'))).result.name;
      if (currentHour >= 5 && currentHour < 12) {
         return ("Good morning, " + userName + "!");
      } else if (currentHour >= 12 && currentHour < 17) {
         return ("Good afternoon, " + userName + "!");
      } else if (currentHour >= 17 || currentHour < 5) {
         return ("Good evening, " + userName + "!");
      }
   } else {
      if (currentHour >= 5 && currentHour < 12) {
         return ("Good morning!");
      } else if (currentHour >= 12 && currentHour < 17) {
         return ("Good afternoon!");
      } else if (currentHour >= 17 || currentHour < 5) {
         return ("Good evening!");
      }
   }
}

/* update when database can be accessed with resources*/
function resourceCard(link, name, description) {
   return (
      <a href={link} className="cardLink">
         <div className="card">
            <div className="cardTitle">
               <h2>{name}</h2>
            </div>
            <div className="subTitle">
               <p>{description}</p>
            </div>

         </div>
      </a>
   )
}
