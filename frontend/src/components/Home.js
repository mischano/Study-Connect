import React from 'react';
import '../App.css';
import logo from './Assets/WHITE.png';

const styling = {
   position: 'fixed',
   background: "linear-gradient( rgba(0, 100, 148, 0.7), rgba(0, 100, 148, 0.7) ), url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80')",
   backgroundSize: 'cover',
   height: '100%',
   width: '100%'
}

const contentStyle = {
   fontFamily: 'Lato',
   color: '#F2F0F0',
   textAlign: 'center',
   position: 'fixed',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%,-50%)',
   filter: 'drop-shadow(0 0 0.75rem rgb(0,0,0,0.4))'
}


export default class Home extends React.Component {
   render() {
      return (
         <div style={styling}>
            <div className='homeNav'>
               <img id='logo' src={logo} alt='StudyConnect'></img>
               <a href='/auth' style={{ color: '#F2F0F0' }}>
                  <div id='homeNavButton' className="callToAction">
                     <h3>Login + Sign Up</h3>
                  </div>
               </a>
            </div>
            <div className="getStartedBtn">
               <div style={contentStyle}>
                  <h1 id='homeHeading'>Study. Share. Schedule. <span style={{ fontWeight: '900' }}>Succeed.</span></h1>
                  <p id='homeBlurb'>StudyConnect is here to take the headache out of group
                  work. Schedule meetings, study together, and more.</p>
                  <a href='/auth' style={{ color: '#F2F0F0' }}>
                     <div className="callToAction">
                        <h3>Get Started for Free</h3>
                     </div>
                  </a>
               </div>
            </div>
         </div>
      );
   }
}