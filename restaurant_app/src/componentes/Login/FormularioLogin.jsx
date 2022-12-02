import React from 'react'
import Swal from 'sweetalert2';
// import { HookUser } from './HookUser';
import FormularioCliente from './FormularioCliente';


const FormularioLogin = ({ user, setUser, correo, setCorreo, pass, setPass, usuarios, setUsuarios }) => {


  const [pedidos, setPedidos] = React.useState([])
  // const [usuarios, setUsuarios] = React.useState([])
  const [comunas, setComunas] = React.useState([])
  const [roles, setRoles] = React.useState([])


  const [idUsuario, setIdUsuario] = React.useState('')
  const [nomUsuario, setNomUsuario] = React.useState('')
  const [nom2Usuario, setNom2Usuario] = React.useState('')
  const [apPaternoUsuario, setApPaternoUsuario] = React.useState('')
  const [apMaternoUsuario, setApMaternoUsuario] = React.useState('')
  const [direccion, setDireccion] = React.useState('')
  const [idComuna, setIdComuna] = React.useState('')
  const [correoUsuario, setCorreoUsuario] = React.useState('')
  const [passUsuario, setPassUsuario] = React.useState('')
  const [passUsuario2, setPassUsuario2] = React.useState('')
  const [rol, setRol] = React.useState('')

  const EstadoDeUsuario = () => {

  }

  // React.useEffect(() => {
  //   const obtenerUsuarios = async () => {
  //     const data = await fetch("http://localhost:9000/api/usuario");
  //     const rols = await data.json();
  //     setUsuarios(rols);
  //   };
  //   obtenerUsuarios();
  // }, [])
  

  
  React.useEffect(() => {
    const obtenerUsuarios = async () => {
      const data = await fetch("http://localhost:9000/api/usuario");
      const usu = await data.json();
      setUsuarios(usu);
    };
    obtenerUsuarios();

    const obtenerPedidos = async () => {
      const data = await fetch("http://localhost:9000/api/pedido");
      const usu = await data.json();
      setPedidos(usu);
    };
    obtenerPedidos();

    const obtenerComunas = async () => {
      const data = await fetch("http://localhost:9000/api/comuna");
      const usu = await data.json();
      setComunas(usu);
    };
    obtenerComunas();

    const obtenerRoles = async () => {
      const data = await fetch("http://localhost:9000/api/rol");
      const usu = await data.json();
      setRoles(usu);
    };
    obtenerRoles();


  }, []);

  

  const iniciarSesion = (e) => {
    e.preventDefault()
    let Existe = ''
    let nombre = ''
    usuarios.forEach(u => {
      if (u.correo_usuario === correo && u.usuario_pass === pass) {
        nombre = u.nom_usuario
        setUser({
          id: u.id_usuario,
          nombre: u.nom_usuario,
          apellido: u.ap_paterno,
          rol: u.id_rol
        })

        Existe = 'Si existe'
        Swal.fire({
          title: 'Sesión iniciada',
          text: `Bienvenido ${nombre}`,
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        })


      }


    })

    if (!Existe) {
      Swal.fire({
        title: 'Error',
        text: 'Credenciales erroneas',
        icon: 'error'
      })
    }



  }

  const mostrar = () => {
    console.log(user)
  }

  const logout = (e) => {
    e.preventDefault()
    setUser(null)

    Swal.fire({
      title: 'Sesión cerrada',
      text: 'Has finalizado la sesión',
      icon: 'info',
      timer: 1000,
      showConfirmButton: false
    })


  }


  return (
    <div className='container box col-md-4  col-12'>
      <br />
      <div className='text-center'>
        <h1>Iniciar Sesión</h1>
      </div>
      <br />
      <form onSubmit={user ? logout : iniciarSesion}>
        <div className='container col-12'>
          <h5>Correo:</h5>
          <input
            className=' input mb-4'
            type="email"
            placeholder='Ingrese su email'
            onChange={(e) => setCorreo(e.target.value)}
            value={correo}
          />
          <br />
          <h5>Contraseña:</h5>
          <input
            className='input'
            type="password"
            placeholder='Ingrese su contraseña'
            onChange={(e) => setPass(e.target.value)}
            value={pass}

          />
        </div>
        <div>
          <a
            data-bs-toggle="modal"
            data-bs-target="#myModal"
          >
            <FormularioCliente
              pedidos={pedidos} setPedidos={setPedidos}
              usuarios={usuarios} setUsuarios={setUsuarios}
              idUsuario={idUsuario} setIdUsuario={setIdUsuario}
              nomUsuario={nomUsuario} setNomUsuario={setNomUsuario}
              nom2Usuario={nom2Usuario} setNom2Usuario={setNom2Usuario}
              apPaternoUsuario={apPaternoUsuario} setApPaternoUsuario={setApPaternoUsuario}
              apMaternoUsuario={apMaternoUsuario} setApMaternoUsuario={setApMaternoUsuario}
              direccion={direccion} setDireccion={setDireccion}
              idComuna={idComuna} setIdComuna={setIdComuna}
              correoUsuario={correoUsuario} setCorreoUsuario={setCorreoUsuario}
              passUsuario={passUsuario} setPassUsuario={setPassUsuario}
              passUsuario2={passUsuario2} setPassUsuario2={setPassUsuario2}
              rol={rol} setRol={setRol}
              roles={roles} setRoles={setRoles}
              comunas={comunas} setComunas={setComunas}


            />
            ¿Desea registrarse?
          </a>
        </div>
        <div className='container col-6'>
          {!user && <button className='btn btn-primary' type='submit'>Iniciar sesión</button>}</div>
      </form>
      <br />
    </div>
  )
}

export default FormularioLogin

