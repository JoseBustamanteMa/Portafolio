import React from 'react'

const FormularioRol = ({rol, setRol, idRol, setIdRol, roles, setRoles, editarRol, setEditarRol}) => {


    const [rolIgualError, setRolIgualError] = React.useState(false)
    const [idIgualError, setIdIgualError] = React.useState(false)
    const [vacioId, setVacioId] = React.useState(false)
    const [vacioRol, setVacioRol] = React.useState(false)

    const agregarRol = (e) => {
        e.preventDefault()

        const strId = idRol.toString()
        if(!strId.trim()){
            setVacioId(true)
            return
        }
        setVacioId(false)

        if(!rol.trim()){
            setVacioRol(true)
            return
        }
        setVacioRol(false)
        
        //Validacion de datos
    
        if(!rolIgualError && !idIgualError){
            const requestInit = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id_rol : idRol, nom_rol : rol
                })
            }
            fetch('http://localhost:9000/api/rol/', requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
    
            const arrayAgregado = [...roles, {id_rol : idRol, nom_rol : rol}]
    
            setRoles(arrayAgregado)
    
            setEditarRol(false)
            setRol('')
            setIdRol('')
            
        
        }
        
}   



const actualizarRol = (e) => {
    e.preventDefault()
    //Validacion de datos

    const strId = idRol.toString()
    if(!strId.trim()){
        setVacioId(true)
        return
    }
    setVacioId(false)

    if(!rol.trim()){
        setVacioRol(true)
        return
    }
    setVacioRol(false)


    if(!rolIgualError && !idIgualError){
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id_rol : idRol, nom_rol : rol
            })
            }
            fetch('http://localhost:9000/api/rol/' + idRol, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
    
    
            const arrayEditado = roles.map((item) => (item.id_rol === idRol ? (
                {id_rol: idRol, nom_rol: rol} 
            ) : item))
    
            setRoles(arrayEditado)
    
            setEditarRol(false)
            setRol('')
            setIdRol('')

    }
    
     

    }

    const limpiarCasillas = () => {
        setEditarRol(false)
        setIdRol('')
        setRol('')
        setVacioId(false)
        setVacioRol(false)
    }


    const onBlurId = () =>{

        
        let idRolIgual = ''
        roles.forEach(item => {
            if(item.id_rol == idRol){
                console.log('estamos dentro del if')
                idRolIgual = item.id_rol
                setIdIgualError(true)
            }
        });

        if(!idRolIgual){
            setIdIgualError(false)
        }
   
    }

    const onBlurRol = () => {
        let rolIgual = ''

        const rolesFiltrado = roles.filter((item) => item.id_rol !== idRol)
        rolesFiltrado.forEach(item => {
            if(item.nom_rol === rol){
                console.log('estamos dentro del if')
                rolIgual = item.nom_rol
                setRolIgualError(true)
            }
        });

        if(!rolIgual){
            setRolIgualError(false)
        }
    }

    



  return (
    <div>
        <div>
            {editarRol ? 
            <div className='text-center'>
                <button type="button" className="btn btn-success text-center mb-5" data-bs-toggle="modal" data-bs-target="#myModal">
                    <h4>+ Editar rol</h4>
                </button>
            </div> : <div className='text-center'>
            <button type="button" className="btn btn-success text-center mb-5" data-bs-toggle="modal" data-bs-target="#myModal">
                <h4>+ Agregar rol</h4>
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

        
      {idIgualError ? <div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡Ya existe esa ID!
        </div> : <div></div>}

        {vacioId ? <div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡Debes ingresar una id!
        </div> : <div></div>}



        {editarRol ? (<input type="number"
        placeholder='Id del rol' 
        className='form-control mb-3 mt-3'
        onChange={(e) => setIdRol(e.target.value)}
        value={idRol}
        //onBlur={onBlurId}
        readOnly
        
        
        //required
       />) : 
       <input type="number"
        placeholder='Id del rol' 
        className='form-control mb-3 mt-3'
        onChange={(e) => setIdRol(e.target.value)}
        value={idRol}
        onBlur={onBlurId}
        //required
       />
       }
      {/* Alerta cantidad */}
        {rolIgualError ? <div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡Ese rol ya existe!
        </div> : <div></div>}

        {vacioRol ? <div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡Debes ingresar un rol!
        </div> : <div></div>}
        <input type="text"
        placeholder='Rol' 
        className='form-control mt-3'
        onChange={(e) => setRol(e.target.value)}
        value={rol}
        onBlur={onBlurRol}
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

export default FormularioRol;