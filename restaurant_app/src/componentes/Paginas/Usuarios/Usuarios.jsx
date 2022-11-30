import React from 'react'
import Swal from 'sweetalert2';
import FormularioUsuario from './FormularioUsuario';

const Usuarios = () => {

  const [pedidos, setPedidos] = React.useState([])
  const [usuarios, setUsuarios] = React.useState([])
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





  const [editarUsuario, setEditarUsuario] = React.useState(false)


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



  const eliminarUsuario = (id) => {

    let existe = ''

    pedidos.forEach(p => {
      if (p.id_usuario === id) {
        existe = 'existe'
      }
    })

    if (existe) {
      Swal.fire({
        title: 'Advertencia',
        text: 'No se puede eliminar este usuario, ya que está siendo asignado',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500
      })
    }

    if (!existe) {
      Swal.fire({
        title: '¿Eliminar?',
        text: '¿Deseas eliminar el usuario?',
        icon: 'question',
        confirmButtonColor: '#f81e04',
        showDenyButton: true,
        denyButtonColor: '#01cc17',
        denyButtonText: 'No'
      }).then(response => {
        if (response.isConfirmed) {
          const requestInit = {
            method: "DELETE",
          };
          fetch("http://localhost:9000/api/usuario/" + id, requestInit)
            .then((res) => res.text())
            .then((res) => console.log(res));
          const arrayEliminado = usuarios.filter((item) => item.id_usuario !== id);

          setUsuarios(arrayEliminado);

        }
      })
    }


  };
  const editar = (item) => {
    setEditarUsuario(true);
    setIdUsuario(item.id_usuario);
    setNomUsuario(item.nom_usuario)
    setNom2Usuario(item.nom2_usuario)
    setApPaternoUsuario(item.ap_paterno)
    setApMaternoUsuario(item.ap_materno)
    setDireccion(item.direccion)
    setIdComuna(item.id_comuna)
    setCorreoUsuario(item.correo_usuario)
    setPassUsuario(item.usuario_pass)
    setRol(item.id_rol)

  }
  return (
    <div className="container">
      <div className="container box1">
        <div className="col-12">
          <hr />
          <h1 className="text-center">Usuarios</h1>
          <div className="container col-12 align-middle">

            <div className="align-middle">
              <FormularioUsuario
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
                editarUsuario={editarUsuario} setEditarUsuario={setEditarUsuario}

              />
            </div>

            <table className='table col-12 table-dark  table-hover box align-middle'>
              <thead>
                <tr>
                  <th className='col-6'>Nombre</th>
                  <th className='col-5'>Id</th>
                  <th className='col-1'></th>
                </tr>
              </thead>
              {usuarios.map((u) => (

                <tbody key={u.id_usuario}>
                  <tr>
                    <td>
                      {u.nom_usuario}
                    </td>
                    <td>
                      <p>{u.id_rol}</p>
                    </td>
                    <td>
                      <button className='btn btn-1' onClick={() => eliminarUsuario(u.id_usuario)}>Eliminar usuario</button>
                      <button className='btn btn-2' onClick={() => editar(u)} data-bs-toggle="modal" data-bs-target="#myModal">Editar</button>
                    </td>
                  </tr>
                </tbody>

              ))
              }
            </table>

          </div>


        </div>    </div>
    </div>
  )
}

export default Usuarios
