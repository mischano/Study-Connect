import { Grid } from '@material-ui/core';
import React from 'react';
import '../App.css';

export default class Dashboard extends React.Component {
   render() {
      return (
         <div>
            <div>
               <div className="topBanner">
                  <h1 className="mainPageTitle"> Dashboard </h1>
                  <div className="bannerBlurb">
                     <h2 id="greeting">{getGreeting()}</h2>
                     <h4 id="didYouKnow">Did you know...</h4>
                     <p id="studyTip">{getStudyTip()}</p>
                  </div>
               </div>
            </div>
            <div className="groups">
               <Grid container
                  spacing={1}
                  direction="row"
                  justify="flex-start"
                  alignItems="stretch"
                  wrap="wrap">
                  <Grid item xs={12}> <h2 className="sectionHeader">Your Groups</h2></Grid>
                  <Grid item xs={12} sm={4} spacing={1}> {groupCard()} </Grid>
                  <Grid item xs={12} sm={4} spacing={1}> {groupCard()} </Grid>
                  <Grid item xs={12} sm={4} spacing={1}> {groupCard()} </Grid>
               </Grid>
            </div>

            <div className="resources">
               <Grid container
                  spacing={1}
                  direction="row"
                  justify="flex-start"
                  alignItems="stretch"
                  wrap="wrap">
                  <Grid item xs={12}> <h2 className="sectionHeader">Resources</h2></Grid>
                  <Grid item xs={12} sm={3} spacing={0}>{resourceCard("https://success.calpoly.edu/", "Mustang Success", "Academic Services")} </Grid>
                  <Grid item xs={12} sm={3} spacing={0}>{resourceCard("https://careerservices.calpoly.edu/", "Career Services", "Career Development")} </Grid>
                  <Grid item xs={12} sm={3} spacing={0}>{resourceCard("https://basicneeds.calpoly.edu/calfresh", "CalFresh", "Health and Wellbeing")} </Grid>
               </Grid>
            </div>
         </div>
      );
   }
}

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

/* update when database can be accessed with group schema*/
function groupCard(props) {
   return (
      // <a className="cardLink" href="">
      <div className="card">
         <div className="cardTitle">
            <h2>CHEM126 Lab Group</h2>
         </div>
         <div className="subTitle">
            <p>32 members</p>
         </div>
      </div>
      // </a>
   )
}

/* update when database can be accessed with resources*/
function resourceCard(link, name, descrip) {
   return (
      <a href={link} className="cardLink">
         <div className="card">
            <div className="cardTitle">
               <h2>{name}</h2>
            </div>
            <div className="subTitle">
               <p>{descrip}</p>
            </div>

         </div>
      </a>
   )
}
