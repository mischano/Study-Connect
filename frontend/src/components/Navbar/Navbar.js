import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Notif from './Notif/Notif';
import decode from 'jwt-decode';
import logo from '.././Assets/BLACK.png';
import * as api from '../../api/index';
import Sidebar from './Sidebar/Sidebar'; 
import{ 
   Nav,
   NavLink,
   NavMenu,
   NavBtn,
   NavBtnLink
} from './NavBarElements';


const Navbar = () => {
   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
   const [autoCompleteVal, setAutoCompleteVal] = useState(null);
   const [users, setUsers] = useState([]);
   const history = useHistory();
   const location = useLocation();
   const dispatch = useDispatch();

   const logout = () => {
      dispatch({ type: 'LOGOUT' });
      history.push('/');
      setUser(null);
   }

   useEffect(() => {
      const token = user?.token;

      //logouts the user if its been more than an hour
      if (token) {
         const decodedToken = decode(token);

         if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
      api.getProfiles().then(res => {
         res.data.map(person => setUsers(arr => [...arr, person]));
      })
      setUser(JSON.parse(localStorage.getItem('profile')));
   }, [location])

   const SearchBar = () => {
      return (
         <div style={{ width: 300 }}>
            <Autocomplete
               value={autoCompleteVal}
               id="users-search"
               options={users}
               getOptionLabel={(option) => option.name}
               onChange={(e, newVal) => {
                  setAutoCompleteVal(newVal);
               }}
               renderInput={(params) => (
                  <TextField
                     {...params}
                     label="Search..."
                     margin="dense"
                     variant="outlined"
                     onKeyDown={e => {
                        if (e.key === "Enter") {
                           window.location.assign(`/profile/${autoCompleteVal._id}`);
                        }
                     }}
                  />
               )}
            />
         </div>
      );
   }

   return (
      <>
         <Nav>
            <Sidebar />
            <NavLink to="/dashboard">
               <img id='logo' src={logo} alt='StudyConnect'></img>
               {/*/*</NavLink><img src={require('./Assets/logo.svg')}*/}
            </NavLink>
            <NavMenu>
               <NavLink to="/dashboard">Dashboard</NavLink>
               <NavLink to="/groups">Groups</NavLink>
               <Notif/>
               <NavLink to="/profile">
                  {user ? (user.result.name) : null}
               </NavLink>
               <SearchBar />
               <Button onClick={logout}>Logout</Button>
            </NavMenu>
            <NavBtn>
               {user ? (null) : <NavBtnLink to="/auth">Login</NavBtnLink>}
            </NavBtn>
         </Nav>
      </>
   );
}

export default Navbar;
