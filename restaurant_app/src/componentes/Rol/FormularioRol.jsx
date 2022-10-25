import React from 'react'

const FormularioRol = ({rol, setRol, idRol, setIdRol, roles, setRoles, editarRol, setEditarRol}) => {

    const agregarRol = (e) => {
        e.preventDefault()
        
        //Validacion de datos
    
         
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                idRol : idRol, nom_rol : rol
            })
        }
        fetch('http://localhost:9000/api/rol/', requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        const arrayAgregado = [...roles, {idRol : idRol, nom_rol : rol}]

        setRoles(arrayAgregado)

        setEditarRol(false)
        setRol('')
        setIdRol('')
    
}   


const actualizarRol = (e) => {
    e.preventDefault()
    //Validacion de datos
   
      const requestInit = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            idRol : idRol, nom_rol : rol
        })
        }
        fetch('http://localhost:9000/api/rol/' + idRol, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))


        const arrayEditado = roles.map((item) => (item.idRol === idRol ? (
            {idRol: idRol, nom_rol: rol} 
        ) : item))

        setRoles(arrayEditado)

        setEditarRol(false)
        setRol('')
        setIdRol('')

    }

    const limpiarCasillas = () => {
        setEditarRol(false)
        setIdRol('')
        setRol('')
    }
  return (
    <div>

        <div>
        
{editarRol ? <div className='text-center'>
<button type="button" className="btn btn-success text-center mb-5" data-bs-toggle="modal" data-bs-target="#myModal">
    <h4>+ Editar rol</h4>
</button>
</div> : <div className='text-center'>
<button type="button" className="btn btn-success text-center mb-5" data-bs-toggle="modal" data-bs-target="#myModal">
    <h4>+ Agregar</h4>
</button>
</div>}







<div className="modal fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">

      
      <div className="modal-header">
        <h4 className="modal-title">{editarRol ? "Editar rol" : "Agregar rol"}</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form onSubmit={editarRol ? actualizarRol : agregarRol}>

      
      
      <div className="modal-body">
      {/* Alerta producto */}

      
      
        <input type="text"
        placeholder='Id del rol' 
        className='form-control mb-3 mt-3'
        onChange={(e) => setIdRol(e.target.value)}
        value={idRol}
        
        //required
       />


      {/* Alerta cantidad */}

     
        
        <input type="text"
        placeholder='Rol' 
        className='form-control mt-3'
        onChange={(e) => setRol(e.target.value)}
        value={rol}
        //required
        />
      </div>

      
      <div className="modal-footer">

        {editarRol ? <button className='btn btn-warning' type='submit'>Editar rol</button> :
        <button className='btn btn-success' type='submit'>Agregar rol</button>}
        

        
        <button onClick={limpiarCasillas} type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
      </div>
      </form>
        </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default FormularioRol