import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as HiIcons from "react-icons/hi2";
import * as GiIcons from "react-icons/gi";
import * as FiIcons  from "react-icons/fi";
import * as BsIcons  from "react-icons/bs";

export const SidebarDataBodega = [
   
    
    
    {
        tittle: 'Productos',
        path:'/Productos',
        icon: <FaIcons.FaBox/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Solicitud',
        path: '/solicitudes',
        icon: <IoIcons.IoMdPeople/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Proveedores',
        path: '/proveedores',
        icon: <FiIcons.FiTruck/>,
        cName: 'nav-text'
    }
]