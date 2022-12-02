import React from "react";
import Navbar from "./componentes/Navbar/Navbar";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
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
import FormularioLogin from "./componentes/Login/FormularioLogin"
import { ProtectedRoute } from "./componentes/Login/ProtectedRoute"


const App = () => {
  const [user, setUser] = React.useState(null)
  const [correo, setCorreo] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [usuarios, setUsuarios] = React.useState([])



  return (


    <div>
      {/* <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Inicio} />
          <Route path='/reservas' component={Reservas} />
          <Route path='/productos' component={Productos} />
          <Route path='/recetas' component={Recetas} />
          <Route path='/empleados' component={Empleados} />
          <Route path='/rol' component={Roles} />
          <Route path='/mesas' component={Mesas} />
          <Route path='/proveedores' component={Proveedores} />
          <Route path='/usuarios' component={Usuarios} />
          <Route path='/solicitudes' component={Solicitudes} />
          <PedidoProvider>
            <Route path='/pedidos' component={Pedidos} />
            <Route path='/pedidos-cocina' component={PedidosCocina} />   
          </PedidoProvider>
        </Switch>
      </Router> */}

      <>

        {/* <FormularioLogin 
user={user} setUser={setUser} correo={correo} setCorreo={setCorreo} pass={pass} 
setPass={setPass} usuarios={usuarios} setUsuarios={setUsuarios}/> */}
        <BrowserRouter>
          {/* <Navigation/> */}
          {/* {
    user ? <button>Cerrar sesión</button> : <button>Iniciar sesión</button>
  } */}

          <Navbar user={user} setUser={setUser} />

          <Routes>
            <Route path="*" element={<FormularioLogin user={user} setUser={setUser} correo={correo} setCorreo={setCorreo} pass={pass}
              setPass={setPass} usuarios={usuarios} setUsuarios={setUsuarios} />} />

            <Route element={<ProtectedRoute isAllowed={!!user} />}>


              {/* <Route path="/NavBar" element={<Navbar/>} /> */}
              <Route path='/productos' element={<Productos />} />
              <Route path='/solicitudes' element={<Solicitudes />} />

              <Route path="/reservas" element={<Reservas />} />
              <Route path='/recetas' element={<Recetas />} />
              <Route path='/empleados' element={<Empleados />} />
              <Route path='/rol' element={<Roles />} />
              <Route path='/mesas' element={<Mesas />} />
              <Route path='/proveedores' element={<Proveedores />} />
              <Route path='/usuarios' element={<Usuarios />} />
              <Route path='/pedidos' element={<Pedidos />} />
              <Route path='/Boletas' element={<Boletas />} />
              <Route path='/pedidos-cocina' element={<PedidosCocina />} />
            </Route>

            <Route element={<ProtectedRoute isAllowed={!!user && user.rol.includes('0003')} />}>
              <Route path='/pedidos' element={<Pedidos />} />
              <Route path='/pedidos-cocina' element={<PedidosCocina />} />
              <Route path='/recetas' element={<Recetas />} />
            </Route>
          </Routes>


        </BrowserRouter>




      </>
    </div>

  );

}
export default (App);
