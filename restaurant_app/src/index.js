import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import Comunas from './componentes/Paginas/Comuna/Comunas';
import Mesas from './componentes/Paginas/Mesa/Mesas';
import Proveedores from './componentes/Paginas/Proveedor/Proveedores';
import Roles from './componentes/Paginas/Rol/Roles';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    // <App />
    // <Roles/>
    // <Comunas/>
    // <Mesas/>
    <Proveedores/>
  
);

