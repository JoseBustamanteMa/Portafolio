import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as HiIcons from "react-icons/hi2";
import * as GiIcons from "react-icons/gi";
import * as FiIcons  from "react-icons/fi";
import * as BsIcons  from "react-icons/bs";


export const SidebarDataCocina = [
    
    
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
        tittle: 'Recetas',
        path: '/recetas',
        icon: <IoIcons.IoIosPaper/>,
        cName: 'nav-text'
    },
]