import React from 'react';
import '../App.css';

export default class Dashboard extends React.Component
{
   constructor(props) {
      super(props);
   }

   render() {
      return (
        <div className="topBanner">
            <h1 className="mainPageTitle"> Dashboard </h1>
            <div className = "bannerBlurb">
               <h2>{getGreeting()}</h2>
               <h4 id="didYouKnow">Did you know...</h4>
               <p id="studyTip">{getStudyTip()}</p>
            </div>
        </div>
      );
   }
}

function getStudyTip(){
   let tip1 = `Changing up where you study keeps things fresh, 
               helps you focus, and improves retention. Instead of spending hours in one place, 
               move around to different rooms. Try going to a café or the library!`
   let tip2 = `Studies show “cramming” hinders retention and makes it difficult to process information. 
               Instead of studying for a long block of time, break it into shorter sessions with frequent 
               breaks in between to refresh and refocus.`
   let tips = [tip1,tip2,'dolor','amet'];
   const randomTip = tips[Math.floor(Math.random() * tips.length)];
   return randomTip;
}

function getGreeting(){
   let today = new Date();
   let currentHour = today.getHours();
   let userName = (JSON.parse(localStorage.getItem('profile'))).result.name;
   if(userName){ }
   if(currentHour >= 5 && currentHour < 12){
      return("Good morning, " + userName + "!");
   } else if (currentHour >= 12 && currentHour < 17){
      return("Good afternoon, " + userName + "!");
   } else if(currentHour >= 17 || currentHour < 5){
      return("Good evening, " + userName + "!");
   }

}