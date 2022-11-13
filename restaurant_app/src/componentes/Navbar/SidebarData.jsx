import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as HiIcons from "react-icons/hi2";
import * as GiIcons from "react-icons/gi";
import * as FiIcons  from "react-icons/fi";
import * as BsIcons  from "react-icons/bs";

export const SidebarData = [
    {
        tittle: 'Inicio',
        path:'/',
        icon: <FaIcons.FaHome/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Reservas',
        path:'/reservas',
        icon: <BsIcons.BsCalendar3/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Productos',
        path:'/Productos',
        icon: <FaIcons.FaBox/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Recetas',
        path: '/recetas',
        icon: <IoIcons.IoIosPaper/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Empleados',
        path: '/empleados',
        icon: <IoIcons.IoMdPeople/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Roles',
        path: '/rol',
        icon: <HiIcons.HiUserGroup/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Mesas',
        path: '/mesas',
        icon: <GiIcons.GiTable/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Proveedores',
        path: '/proveedores',
        icon: <FiIcons.FiTruck/>,
        cName: 'nav-text'
    },
    // {
    //     tittle: 'Correo',
    //     path: '/correo',
    //     icon: <FaIcons.FaEnvelopeOpenText/>,
    //     cName: 'nav-text'
    // },
    // {
    //     tittle: 'Ayuda',
    //     path: '/ayuda',
    //     icon: <IoIcons.IoMdHelpCircle/>,
    //     cName: 'nav-text'
    // }
]