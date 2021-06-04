import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData'; 
import './Sidebar.css';
import { IconContext } from 'react-icons'

function Sidebar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
        <IconContext.Provider value={{color: '#006494'}}>
            <div className="sidebar">
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
            </div>
        </IconContext.Provider> 

            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className= 'nav-menu-items' onClick={showSidebar}>
                    <li className= 'navbar-toggle' >
                    <IconContext.Provider value={{color: '#E67350'}}>
                        <Link to='#' className='menu-close'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </IconContext.Provider>
                    </li>
                    {SidebarData.map((item, index) => {
                        return ( 
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}
                        
                </ul>
                </nav>          
        </>
    );
}

export default Sidebar
