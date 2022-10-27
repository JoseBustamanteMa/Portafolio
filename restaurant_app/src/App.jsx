import React from "react";
import Navbar from "./componentes/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './componentes/Paginas/Home/Home';
import Productos from './componentes/Paginas/Producto/Productos';
import Reportes from './componentes/Paginas/Reportes/Reportes';
import Login from './componentes/Login/Login';
import Roles from './componentes/Paginas/Rol/Roles';
import Registro from './componentes/Paginas/Registro/Registro';

function App() {

  // function requireAuth(nextState, replace, next) {
  //   if (!authenticated) {
  //     replace({
  //       pathname: "/login",
  //       state: {nextPathname: nextState.location.pathname}
  //     });
  //   }
  //   next();
  // }

  return (
    <div>
      <Router>
        <Navbar/> 
        <Login/>
        <Switch>
          <Route path='/productos' exact component={Productos}/>
          <Route path='/reportes' component={Reportes}/>
          <Route path='/reportes' component={Reportes}/>
          <Route path='/rol' component={Roles}/>
          <Route path='/registro' component={Registro}/>
       </Switch>
      </Router>
    </div>
  );
}

export default App;
