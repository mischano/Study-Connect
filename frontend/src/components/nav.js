import React from 'react';
import '../App.css';

import { Link } from 'react-router-dom';

function nav()
{
    return (
        <nav>
            <u1 className="nav-links">
            <Link to="/Dashboard">
                    <li>  Dashboard </li> 
                </Link>
                <Link to="/Messages">
                    <li>  Messages </li> 
                </Link>
                <Link to="/Profile">
                    <li>  Profile </li> 
                </Link>
                <Link to="/Groups">
                    <li> Groups</li> 
                </Link>
            </u1>
        </nav>
    );
}

export default nav;