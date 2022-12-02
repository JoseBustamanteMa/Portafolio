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
        tittle: 'Reservas',
        path:'/reservas',
        icon: <BsIcons.BsCalendar3/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Pedidos',
        path:'/pedidos',
        icon: <BsIcons.BsCalendar3/>,
        cName: 'nav-text'
    },
    {
        tittle: 'PedidosCocina',
        path:'/pedidos-cocina',
        icon: <BsIcons.BsCalendar3/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Productos',
        path:'/productos',
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
        tittle: 'Solicitud',
        path: '/solicitudes',
        icon: <IoIcons.IoMdPeople/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Boletas',
        path: '/boletas',
        icon: <IoIcons.IoMdPeople/>,
        cName: 'nav-text'
    },
    {
        tittle: 'Usuario',
        path: '/usuarios',
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
    }
]