import React from "react";
import Navbar from "./componentes/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Productos from './componentes/Paginas/Productos/Productos';
// import Reportes from './componentes/Paginas/Reportes/Reportes';
import Roles from './componentes/Paginas/Rol/Roles';
import Ayuda from './componentes/Paginas/Ayuda/Ayuda';
import Inicio from './componentes/Paginas/Inicio/Inicio';
import Mesas from './componentes/Paginas/Mesas/Mesas';
import Empleados from './componentes/Paginas/Empleados/Empleados';
import Reservas from './componentes/Paginas/Reservas/Reservas';
import Proveedores from './componentes/Paginas/Proveedores/Proveedores';
import Recetas from "./componentes/Paginas/Recetas/Recetas";
import Pedidos from "./componentes/Paginas/Pedidos/Pedidos";
import PedidosCocina from "./componentes/Paginas/Pedidos/PedidosCocina";
import PedidoProvider from "./componentes/Paginas/context/PedidoProvider";
import Usuarios from "./componentes/Paginas/Usuarios/Usuarios";
import Boletas from "./componentes/Paginas/Boletas/Boletas";
import Solicitudes from "./componentes/Paginas/Solicitudes/Solicitudes";
import SolicitudProvider from "./componentes/Paginas/context/SolicitudProvider";
import FormularioSolicitud from "./componentes/Paginas/Solicitudes/FormularioSolicitud";


const App = () => {
  return (
    <div>
      {/* <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Inicio} />
          <Route path='/reservas' component={Reservas} />
          <Route path='/productos' component={Productos} />
          <Route path='/recetas' component={Recetas} />
          <Route path='/empleados' component={Empleados} />
          <Route path='/rol' component={Roles} />
          <Route path='/mesas' component={Mesas} />
          <Route path='/proveedores' component={Proveedores} />
          <PedidoProvider>
            <Route path='/pedidos' component={Pedidos} />
            <Route path='/pedidos-cocina' component={PedidosCocina} />    */}
            {/* Agregué pedidos cocina solo a la ruta, no lo enlacé con el nav-bar */}
          {/* </PedidoProvider>
        </Switch>
      </Router> */}

          {/* <PedidoProvider>

            

            <Pedidos />

          </PedidoProvider> */}


          {/* <Recetas/> */}

          

          <Usuarios/>
          {/* <Boletas/> */}

          

          {/* <SolicitudProvider> */}

          {/* <FormularioSolicitud/> */}
          {/* <Solicitudes/> */}
          {/* </SolicitudProvider> */}
    </div>
  );
}

export default (App);
