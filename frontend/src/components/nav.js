import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component
{
   constructor(props) {
      super(props);
   }

   render() {
      const navStyle = {
      color: 'white'
      };
      return (
         <nav>
            <ul className="nav-links">
               <Link style={navStyle} to="/">
                  <li> Dashboard </li> 
               </Link>
               <Link style={navStyle} to="/messages">
                  <li> Messages </li> 
               </Link>
               <Link style={navStyle} to="/profile">
                  <li> Profile </li> 
               </Link>
               <Link style={navStyle} to="/groups">
                  <li> Groups </li> 
               </Link>
               <Link style={navStyle} to="/login">
                  <li> Login </li>
               </Link>
               <Link style={navStyle} to="/signup1">
                  <li> Signup 1 </li>
               </Link>
               <Link style={navStyle} to="/signup2">
                  <li> Signup 2 </li>
               </Link>
               <Link style={navStyle} to="/signup3">
                  <li> Signup 3 </li>
               </Link>
            </ul>
         </nav>
      );
   }
}