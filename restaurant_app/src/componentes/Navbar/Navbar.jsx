import React, {useState} from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
import { Link } from "react-router-dom";
import {SidebarData} from './SidebarData';
import { SidebarDataCocina } from './SideDataCocina';
import { SidebarDataBodega } from './SidebarDataBodega';
import { SidebarMesero } from './SidebarMesero';
import { SidebarCliente } from './SidebarCliente';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';


// 
// import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as HiIcons from "react-icons/hi2";
import * as GiIcons from "react-icons/gi";
import * as FiIcons  from "react-icons/fi";
import * as BsIcons  from "react-icons/bs";
import Swal from 'sweetalert2';





// 

// import {logout} from '../Login/FormularioLogin';

function Navbar({user, setUser}) {
  
  
  const [sidebar, setSidebar]= useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  // const { logout } = useAuth0();
  const logout = (e) => {
    e.preventDefault()
    setUser(null)

    Swal.fire({
      title: 'Sesión cerrada',
      text: 'Has finalizado la sesión',
      icon: 'info',
      timer: 1000,
      showConfirmButton:false
    })
  
  
  }

  return (
    <>
    {user && 
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
          

          {/* Inicio de SideBar administrador */}
          {user.rol.includes('0001') &&

          <>
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
          </>
          
          
          }

          {/* Inicio de sideBar Cocina */}

{user.rol.includes('0003') &&

<>
 {SidebarDataCocina.map((item, index) => {
  return(
    <li key={index}  className={item.cName}>
      <Link to={item.path}>
        {item.icon}
        <span>{item.tittle}</span>
      </Link>
    </li>
  )
})}
</>


}

{user.rol.includes('0004') &&

<>
 {SidebarDataBodega.map((item, index) => {
  return(
    <li key={index}  className={item.cName}>
      <Link to={item.path}>
        {item.icon}
        <span>{item.tittle}</span>
      </Link>
    </li>
  )
})}
</>


}

{user.rol.includes('0002') &&

<>
 {SidebarMesero.map((item, index) => {
  return(
    <li key={index}  className={item.cName}>
      <Link to={item.path}>
        {item.icon}
        <span>{item.tittle}</span>
      </Link>
    </li>
  )
})}

 
</>
}
{user.rol.includes('0005') &&

<>
 {SidebarCliente.map((item, index) => {
  return(
    <li key={index}  className={item.cName}>
      <Link to={item.path}>
        {item.icon}
        <span>{item.tittle}</span>
      </Link>
    </li>
  )
})}

 
</>
}
         
          <button className='btn' onClick={logout}>Logout</button>
          </div>
        </ul>
        
      </nav>
    </IconContext.Provider>
    </>}
    
    
    </>
    
  )
}

export default (Navbar)