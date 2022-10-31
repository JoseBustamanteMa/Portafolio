import React from 'react'
import FormularioRol from './FormularioRol'

const Roles = () => {

    const [rol, setRol] = React.useState('')
    const [idRol, setIdRol] = React.useState('')
    const [roles, setRoles] = React.useState([])
    const [editarRol, setEditarRol] = React.useState(false)
    

    
    React.useEffect(() => {
        const obtenerRoles  = async () => {
            const data = await fetch('http://localhost:9000/api/rol')
            const rols = await data.json()
            setRoles(rols)
        }
            
        
    
        obtenerRoles()
      }, [])

      const eliminarRol = id => {

        if(window.confirm()){
            const requestInit = {
                method: 'DELETE'
            }
            fetch('http://localhost:9000/api/rol/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))

            const arrayEliminado = roles.filter((item) => item.id_rol !== id)

            setRoles(arrayEliminado)




        }
    }

    const editar = (item) => {
        setEditarRol(true)
        setIdRol(item.id_rol)
        setRol(item.nom_rol)
    }



    
  return (
    <div>
        <div className='container'>
            <h1 className='text-center'>
                Roles
            </h1>
            <div>
                <FormularioRol rol={rol} setRol={setRol} idRol={idRol} setIdRol={setIdRol}
                roles={roles} setRoles={setRoles} editarRol={editarRol} setEditarRol={setEditarRol}
                editar={editar}/>
            </div>
            <div className='col-6 mx-auto'>
            <table className="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Rol</th>
                <th></th>
            </tr>
        </thead>
        {roles.map(item => (
            <tbody key={item.id_rol}>
            <tr>
                <td>{item.id_rol}</td>
                <td>{item.nom_rol}</td>
                <td className='col text-end'>
                <button onClick={() => editar(item)} className='col-3 btn btn-warning me-2' data-bs-toggle="modal" data-bs-target="#myModal">Editar</button>
                <button onClick={() => eliminarRol(item.id_rol)} className='col-3 btn btn-danger '>Eliminar</button>
                </td>
            </tr>
            
        </tbody>
        ))}
        
  </table>
            </div>
        </div>


    </div>
  )
}

export default Roles