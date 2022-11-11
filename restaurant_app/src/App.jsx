import React from "react";
import Navbar from "./componentes/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Productos from './componentes/Paginas/Productos/Productos';
import Reportes from './componentes/Paginas/Reportes/Reportes';
import Roles from './componentes/Paginas/Rol/Roles';
import Ayuda from './componentes/Paginas/Ayuda/Ayuda';
import Inicio from './componentes/Paginas/Inicio/Inicio';
import Mesas from './componentes/Paginas/Mesas/Mesas';
import Empleados from './componentes/Paginas/Empleados/Empleados';
import Reservas from './componentes/Paginas/Reservas/Reservas';
import Proveedores from './componentes/Paginas/Proveedores/Proveedores';
import Recetas from "./componentes/Paginas/Recetas/Recetas";

const App =() => {
  return (
    <div>
      {/* <Router>
        <Navbar/> 
        <Switch>
          <Route path='/' exact component={Inicio}/>
          <Route path='/reservas' component={Reservas}/>
          <Route path='/productos' component={Productos}/>
          <Route path='/reportes' component={Reportes}/>
          <Route path='/empleados' component={Empleados}/>
          <Route path='/rol' component={Roles}/>
          <Route path='/mesas' component={Mesas}/>
          <Route path='/proveedores' component={Proveedores}/>
          <Route path='/ayuda' component={Ayuda}/>
       </Switch>
      </Router> */}
      {/* <Proveedores/> */}
      {/* <Productos/> */}
      <Recetas/>
      
    </div>
  );
}

export default (App);
