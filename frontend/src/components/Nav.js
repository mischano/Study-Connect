import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import decode from 'jwt-decode';

const Nav = () => {
   const navStyle = {color: 'white'};
   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
   const dispatch = useDispatch();
   const history = useHistory();
   const location = useLocation();

   const logout = () => {
      dispatch({ type: 'LOGOUT' });
      history.push('/');
      setUser(null);
   }

   useEffect(() => {
      const token = user?.token;

      //logouts the user if its been more than an hour
      if(token) {
         const decodedToken = decode(token);

         if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }

      setUser(JSON.parse(localStorage.getItem('profile')))
      }, [location])

   return (
       <nav>
          <Button onClick={logout}>
             Logout
          </Button>
          <ul className="nav-links">
             <Link style={navStyle} to="/">
                <li> Dashboard</li>
             </Link>
             <Link style={navStyle} to="/auth">
                <li> Auth</li>
             </Link>
             <Link style={navStyle} to="/messages">
                <li> Messages</li>
             </Link>
             <Link style={navStyle} to="/profile">
                {user ? (
                    user.result.name
                    ) : null}
             </Link>
             <Link style={navStyle} to="/groups">
                <li> Groups</li>
             </Link>
             <Link style={navStyle} to="/login">
                <li> Login</li>
             </Link>
             <Link style={navStyle} to="/signup1">
                <li> Signup 1</li>
             </Link>
             <Link style={navStyle} to="/signup2">
                <li> Signup 2</li>
             </Link>
             <Link style={navStyle} to="/signup3">
                <li> Signup 3</li>
             </Link>
          </ul>
       </nav>
   );
}

export default Nav
