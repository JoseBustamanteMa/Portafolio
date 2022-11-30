import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from "react-router-dom";
import {SidebarData} from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

function Navbar() {
  
  const [sidebar, setSidebar]= useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const { logout } = useAuth0();

  return (
    <>
    <IconContext.Provider value={{color: '#fff'}}>
      <div className='navbar mb-5'>
        <Link to="#" className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar}/>
        </Link>
        
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        
        <ul className='nav-menu-items container' onClick={showSidebar} >
          
          <li className="navbar-toggle">
            
            
            <Link to="#" className='menu-bars container'>
            
              <AiIcons.AiOutlineClose/>
            </Link>
          </li>
          <div className='container col-12'>

          {SidebarData.map((item, index) => {
            return(
              <li key={index}  className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.tittle}</span>
                </Link>
              </li>
            )
          })}
          <button className='btn' onClick={logout}>Logout</button>
          </div>
        </ul>
        
      </nav>
    </IconContext.Provider>
    
    </>
    
  )
}

export default (Navbar)