import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

import * as IconName from "react-icons/hi2";

export const SidebarData = [
    {
        tittle: 'Reportes',
        path: '/reportes',
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
        icon: <IconName.HiUserGroup/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Correo',
        path: '/correo',
        icon: <FaIcons.FaEnvelopeOpenText/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Finanzas',
        path: '/finanzas',
        icon: <AiIcons.AiFillBank/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Ayuda',
        path: '/support',
        icon: <IoIcons.IoMdHelpCircle/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Registro',
        path: '/registro',
        icon: <IoIcons.IoMdHelpCircle/>,
        cName: 'nav-text'
    }
]