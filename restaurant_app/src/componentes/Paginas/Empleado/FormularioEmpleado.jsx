import React from 'react'
import { nanoid } from 'nanoid'

const FormularioEmpleado= ({idEmpleado, setIdEmpleado,
  nomEmpleado, setNomEmpleado,
  nom2Empleado, setNom2Empleado,
  apPaterno, setApPaterno,
  apMaterno, setApMaterno,
  direccion, setDireccion,
  comuna, setComuna,
  correo, setCorreo,
  rol, setRol,
  empleados, setEmpleados,
  editarEmp, setEditarEmp,
  comunas, setComunas,
  roles, setRoles
  
}) => {

  const [vacioNombre, setVacioNombre] = React.useState(false)
  const [vacioNombre2, setVacioNombre2] = React.useState(false)
  const [vacioApellido, setVacioApellido] = React.useState(false)
  const [vacioApellido2, setVacioApellido2] = React.useState(false)
  const [vacioDireccion, setVacioDireccion] = React.useState(false)
  const [vacioComuna, setVacioComuna] = React.useState(false)
  const [vacioCorreo, setVacioCorreo] = React.useState(false)
  const [vacioRol, setVacioRol] = React.useState(false)
  const [correoIgualError, setCorreoIgualError] = React.useState(false)



  const onBlurCorreo = () => {
    let CorreoIgual = ''

    const empleadosFiltrado = empleados.filter((item) => item.id_empleado !== idEmpleado)

    empleadosFiltrado.forEach(item => {
        if(item.correo_emp === correo){
            console.log('estamos dentro del if')
            CorreoIgual = item.id_empleado
            setCorreoIgualError(true)
        }
    });

    if(!CorreoIgual){
        setCorreoIgualError(false)  
    }
}

  const agregarEmpleado = (e) => {
    e.preventDefault()
    

    if(!nomEmpleado.trim()){
        setVacioNombre(true)
        return
    }
    setVacioNombre(false)

    

    if(!apPaterno.trim()){
        setVacioApellido(true)
        return
    }
    setVacioApellido(false)
    
    if(!comuna.trim()){
        setVacioComuna(true)
        return
    }
    setVacioComuna(false)
    

    
    if(!correo.trim()){
        setVacioCorreo(true)
        return
    }
    setVacioCorreo(false)
    
    if(!rol.trim()){
        setVacioRol(true)
        return
    }
    setVacioRol(false)
    


    if(!correoIgualError )
    {

        const randomId = nanoid(6)
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id_empleado : randomId, nom_empleado : nomEmpleado, nom2_empleado: nom2Empleado,
                ap_paterno : apPaterno, ap_materno: apMaterno, direccion : direccion,
                id_comuna: comuna, correo_emp : correo, id_rol: rol

            })
        }
        fetch('http://localhost:9000/api/empleado/', requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        const arrayAgregado = [...empleados, {  id_empleado : randomId, nom_empleado : nomEmpleado, nom2_empleado: nom2Empleado,
          ap_paterno : apPaterno, ap_materno: apMaterno, direccion : direccion,
          id_comuna: comuna, correo_emp : correo, id_rol: rol}]

        setEmpleados(arrayAgregado)

       
        setIdEmpleado('')
        setNomEmpleado('')
        setNom2Empleado('')
        setApPaterno('')
        setApMaterno('')   
        setDireccion('')
        setComuna('')
        setCorreo('')
        setRol('')
        setEditarEmp(false)
        
    
    }
    
}  

const actualizarEmpleado = (e) => {
  e.preventDefault()
  //Validacion de datos

  if(!nomEmpleado.trim()){
    setVacioNombre(true)
    return
}
setVacioNombre(false)



if(!apPaterno.trim()){
    setVacioApellido(true)
    return
}
setVacioApellido(false)



if(!correo.trim()){
    setVacioCorreo(true)
    return
}
setVacioCorreo(false)

  if(!correoIgualError){
      const requestInit = {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id_empleado: idEmpleado, nom_empleado : nomEmpleado, nom2_empleado: nom2Empleado,
            ap_paterno : apPaterno, ap_materno: apMaterno, direccion : direccion,
            id_comuna: comuna, correo_emp : correo, id_rol: rol
          })
          }
          fetch('http://localhost:9000/api/empleado/' + idEmpleado, requestInit)
          .then(res => res.text())
          .then(res => console.log(res))
  
  
          const arrayEditado = empleados.map((item) => (item.id_empleado === idEmpleado ? (
              {id_empleado : idEmpleado, nom_empleado : nomEmpleado, nom2_empleado: nom2Empleado,
                ap_paterno : apPaterno, ap_materno: apMaterno, direccion : direccion,
                id_comuna: comuna, correo_emp : correo, id_rol: rol} 
          ) : item))
  
          setEmpleados(arrayEditado)
  
          setIdEmpleado('')
          setNomEmpleado('')
          setNom2Empleado('')
          setApPaterno('')
          setApMaterno('')   
          setDireccion('')
          setComuna('')
          setCorreo('')
          setRol('')
          setEditarEmp(false)
          

  }
  
   

  }

const limpiarCasillas = () => {
  setIdEmpleado('')
  setNomEmpleado('')
  setNom2Empleado('')
  setApPaterno('')
  setApMaterno('')   
  setDireccion('')
  setComuna('')
  setCorreo('')
  setRol('')
  setEditarEmp(false)
  setCorreoIgualError(false)
}

  return (
    <div>
      <div>
            {editarEmp ? 
            <div className='text-center'>
                <button type="button" className="btn btn-success text-center mb-5" data-bs-toggle="modal" data-bs-target="#myModal">
                    <h4>+ Editar empleado</h4>
                </button>
            </div> : <div className='text-center'>
            <button type="button" className="btn btn-success text-center mb-5" data-bs-toggle="modal" data-bs-target="#myModal">
                <h4>+ Agregar empleado</h4>
            </button>
        </div>}







<div className="modal fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">

      
      <div className="modal-header">
        <h4 className="modal-title">{editarEmp ? "Editar empleado" : "Agregar empleado"}</h4>
        <button onClick={limpiarCasillas} type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form onSubmit={editarEmp ? actualizarEmpleado : agregarEmpleado}>

      
      
      <div className="modal-body">
      

        
      

        {vacioNombre ? <div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡Debes ingresar un nombre!
        </div> : <div></div>}
        <input 
        type="text"
        placeholder='Nombre del empleado' 
        className='form-control mt-3'
        onChange={(e) => setNomEmpleado(e.target.value)}
        value={nomEmpleado}
        />

        
        <input type="text"
        placeholder='Segundo nombre' 
        className='form-control mt-3'
        onChange={(e) => setNom2Empleado(e.target.value)}
        value={nom2Empleado}
                
        //required
        />

        {vacioApellido ? <div className="alert alert-danger mx-1 mb-0" role="alert">
        ¡Debes ingresar un apellido!
        </div> : <div></div>}
        <input type="text"
        placeholder='Apellido paterno' 
        className='form-control mt-3'
        onChange={(e) => setApPaterno(e.target.value)}
        value={apPaterno}
                
        //required
        />

        
        <input type="text"
        placeholder='Apellido materno' 
        className='form-control mt-3'
        onChange={(e) => setApMaterno(e.target.value)}
        value={apMaterno}
                
        //required
        />
        
        <input type="text"
        placeholder='Direccion' 
        className='form-control mt-3'
        onChange={(e) => setDireccion(e.target.value)}
        value={direccion}
                
        //required
        />

        {vacioComuna? <div className="alert alert-danger mx-1 mb-0" role="alert">
        ¡Debes seleccionar una comuna!
        </div> : <div></div>}
        <select onChange={(e) => setComuna(e.target.value)} name="comunas"
        className='form-control mt-3'
        
        >
            <option value={''}>Elige una comuna</option> 
          {comunas.map((item) => (
            <option 
            key={item.id_comuna} 
            value={item.id_comuna} 
            
            >
                {item.nom_comuna}
            </option>
          ))} 
        </select>

        {correoIgualError && <div className="alert alert-danger mx-1 mb-0 mt-1" role="alert">
          ¡Ya existe ese correo!
        </div>}

        {vacioCorreo ? <div className="alert alert-danger mx-1 mb-0" role="alert">
        ¡Debes ingresar un correo!
        </div> : <div></div>}
        <input type="email"
        placeholder='Correo empleado' 
        className='form-control mt-3'
        onChange={(e) => setCorreo(e.target.value)}
        value={correo}
        onBlur={onBlurCorreo}
                
        //required
        />

        {vacioRol ? <div className="alert alert-danger mx-1 mb-0" role="alert">
        ¡Debes seleccionar un rol!
        </div> : <div></div>}
        <select onChange={(e) => setRol(e.target.value)} name="roles"
        className='form-control mt-3'
        
        >
            <option value={''}>Elige un rol</option> 
          {roles.map((item) => (
            <option 
            key={item.id_rol} 
            value={item.id_rol} 
            
            >
                {item.nom_rol}
            </option>
          ))} 
        </select>



        
      </div>
      <div className="modal-footer">

        {editarEmp ? <button className='btn btn-warning' type='submit'>Editar empleado</button> :
        <button className='btn btn-success' type='submit'>Agregar empleado</button>}
        
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

export default FormularioEmpleado