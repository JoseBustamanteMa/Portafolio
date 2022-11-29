import { nanoid } from 'nanoid'
import React from 'react'
import Swal from 'sweetalert2'

const FormularioUsuario = ({pedidos,setPedidos,
    usuarios, setUsuarios,
    idUsuario, setIdUsuario ,
    nomUsuario , setNomUsuario,
    nom2Usuario , setNom2Usuario,
    apPaternoUsuario , setApPaternoUsuario,
    apMaternoUsuario, setApMaternoUsuario,
    direccion, setDireccion,
    idComuna ,setIdComuna,
    correoUsuario, setCorreoUsuario,
    passUsuario , setPassUsuario,
    passUsuario2 , setPassUsuario2,
    rol, setRol,
    roles, setRoles,
    comunas, setComunas,
    editarUsuario, setEditarUsuario

}) => {


    const [errornomUsuario, setErrorNomUsuario] = React.useState(false)
    const [errornom2Usuario, setErrorNom2Usuario] = React.useState(false)
    const [errorApPaternoUsuario, setErrorApPaternoUsuario] = React.useState(false)
    const [errorApMaternoUsuario, setErrorApMaternoUsuario] = React.useState(false)
    const [errorDireccion, setErrorDireccion] = React.useState(false)
    const [errorIdComuna, setErrorIdComuna] = React.useState(false)
    const [errorCorreoUsuario, setErrorCorreoUsuario] = React.useState(false)
    const [errorPassUsuario, setErrorPassUsuario] = React.useState(false)
    const [errorPassUsuario2, setErrorPassUsuario2] = React.useState(false)
    const [errorPassUsuarioCoincidencia, setErrorPassUsuarioCoincidencia] = React.useState(false)
    const [errorRol, setErrorRol] = React.useState(false)
    const [existeCorreo, setExisteCorreo] = React.useState(false)



    const agregarUsuario = (e) => {
        e.preventDefault()

        
        if(!nomUsuario.trim()){
            setErrorNomUsuario(true)
            return
        }
        setErrorNomUsuario(false)

        
        if(!apPaternoUsuario.trim()){
            setErrorApPaternoUsuario(true)
            return
        }
        setErrorApPaternoUsuario(false)

        
        if(!idComuna.trim()){
            setErrorIdComuna(true)
            return
        }
        setErrorIdComuna(false)



        
        
        
        if(!correoUsuario.trim()){
            setErrorCorreoUsuario(true)
            return
        }
        setErrorCorreoUsuario(false)

        if(!passUsuario.trim()){
            setErrorPassUsuario(true)
            return
        }
        setErrorPassUsuario(false)

        if(!passUsuario2.trim()){
            setErrorPassUsuario2(true)
            return
        }

        if(passUsuario !== passUsuario2){
            setErrorPassUsuarioCoincidencia(true)
            return
        }
        setErrorPassUsuarioCoincidencia(false)

        if(!rol.trim()){
            setErrorRol(true)
            return
        }
        setErrorRol(false)


        let existeCorreo = ''
        usuarios.forEach(u => {
            if(u.correo_usuario === correoUsuario){
                existeCorreo = u.correo_usuario
            }
        })

        if(existeCorreo){
            setExisteCorreo(true)
        }
        if(!existeCorreo){

            const randomId = nanoid()
            const requestInit = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id_usuario: randomId, 
                    nom_usuario: nomUsuario,
                    nom2_usuario: nom2Usuario,
                    ap_paterno: apPaternoUsuario,
                    ap_materno: apMaternoUsuario,
                    direccion: direccion,
                    id_comuna: idComuna,
                    correo_usuario: correoUsuario,
                    usuario_pass : passUsuario,
                    id_rol: rol
                })
            }
            fetch('http://localhost:9000/api/usuario/', requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
    
            const arrayAgregado = [...usuarios, 
                {id_usuario: randomId, 
                nom_usuario: nomUsuario,
                nom2_usuario: nom2Usuario,
                ap_paterno: apPaternoUsuario,
                ap_materno: apMaternoUsuario,
                direccion: direccion,
                id_comuna: idComuna,
                correo_usuario: correoUsuario,
                usuario_pass : passUsuario,
                id_rol: rol}]
    
            setUsuarios(arrayAgregado)
    
            // setEditarUsuario(false)
            
        }
       
        limpiarCasillas()
}   


const actualizarUsuario = (e) => {
    e.preventDefault()
    //Validacion de datos

    if(!nomUsuario.trim()){
        setErrorNomUsuario(true)
        return
    }
    setErrorNomUsuario(false)

    
    if(!apPaternoUsuario.trim()){
        setErrorApPaternoUsuario(true)
        return
    }
    setErrorApPaternoUsuario(false)

    
    if(!idComuna.trim()){
        setErrorIdComuna(true)
        return
    }
    setErrorIdComuna(false)



    
    
    
    if(!correoUsuario.trim()){
        setErrorCorreoUsuario(true)
        return
    }
    setErrorCorreoUsuario(false)

    if(!passUsuario.trim()){
        setErrorPassUsuario(true)
        return
    }
    setErrorPassUsuario(false)

    if(!passUsuario2.trim()){
        setErrorPassUsuario2(true)
        return
    }

    if(passUsuario !== passUsuario2){
        setErrorPassUsuarioCoincidencia(true)
        return
    }
    setErrorPassUsuarioCoincidencia(false)

    if(!rol.trim()){
        setErrorRol(true)
        return
    }
    setErrorRol(false)



    let existeCorreo = ''
    usuarios.forEach(u => {
        if(u.correo_usuario === correoUsuario){
            existeCorreo = 'si'
        }
    })

    if(existeCorreo){
        setExisteCorreo(true)
    }
    if(!existeCorreo){
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id_usuario: idUsuario, 
                nom_usuario: nomUsuario,
                nom2_usuario: nom2Usuario,
                ap_paterno: apPaternoUsuario,
                ap_materno: apMaternoUsuario,
                direccion: direccion,
                id_comuna: idComuna,
                correo_usuario: correoUsuario,
                usuario_pass : passUsuario,
                id_rol: rol
            })
            }
            fetch('http://localhost:9000/api/usuario/' + idUsuario, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
    
    
            const arrayEditado = usuarios.map((item) => (item.id_usuario === idUsuario ? (
                { id_usuario: idUsuario, 
                    nom_usuario: nomUsuario,
                    nom2_usuario: nom2Usuario,
                    ap_paterno: apPaternoUsuario,
                    ap_materno: apMaternoUsuario,
                    direccion: direccion,
                    id_comuna: idComuna,
                    correo_usuario: correoUsuario,
                    usuario_pass : passUsuario,
                    id_rol: rol} 
            ) : item))
    
            setUsuarios(arrayEditado)
    
           

    }

    limpiarCasillas()
    
     

    }

    const limpiarCasillas = () => {
        setIdUsuario('')
        setNomUsuario('')
        setNom2Usuario('')
        setApPaternoUsuario('')
        setApMaternoUsuario('')
        setCorreoUsuario('')
        setIdComuna('')
        setPassUsuario('')
        setPassUsuario2('')
        setRol('')
        setDireccion('')
        setEditarUsuario(false)

        setErrorNomUsuario(false)
        setErrorNom2Usuario(false)
        setErrorApPaternoUsuario(false)
        setErrorApMaternoUsuario(false)
        setErrorCorreoUsuario(false)
        setErrorIdComuna(false)
        setErrorPassUsuario(false)
        setErrorPassUsuario2(false)
        setErrorRol(false)
        setErrorDireccion(false)
        
    }

  return (
    <div>
      <div>
        <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#myModal">+ Agregar Usuario</button>
      </div>


      <div className="modal fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">

      
      <div className="modal-header">
        <h4 className="modal-title">{editarUsuario ? 'Editar Usuario' : 'Agregar Usuario'}</h4>
        
      </div>
      <form onSubmit={editarUsuario ? actualizarUsuario : agregarUsuario}>

      
      
      <div className="modal-body">
      {/* Alerta producto */}
      {/* div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡Ya existe esa ID!
        </div> */}

        {errornomUsuario && 
        <div className="alert alert-danger mx-1 mb-0" role="alert">
            <p>Ingresa un nombre de usuario</p>
        </div>}
        <input 
        type="text"
        placeholder='Ingresa el nombre de usuario'
        onChange={(e) => setNomUsuario(e.target.value)}
        value={nomUsuario}
        className='form-control mt-3'
        />


        <input 
        type="text"
        placeholder='Ingresa el segundo nombre de usuario'
        onChange={(e) => setNom2Usuario(e.target.value)}
        value={nom2Usuario}
        className='form-control mt-3'
        />



{errorApPaternoUsuario && 
        <div className="alert alert-danger mx-1 mb-0" role="alert">
            <p>Ingresa un apellido paterno</p>
        </div>}
        <input 
        type="text"
        placeholder='Ingresa el apellido paterno de usuario'
        onChange={(e) => setApPaternoUsuario(e.target.value)}
        value={apPaternoUsuario}
        className='form-control mt-3'
        />

        <input 
        type="text"
        placeholder='Ingresa el apellido materno de usuario'
        onChange={(e) => setApMaternoUsuario(e.target.value)}
        value={apMaternoUsuario}
        className='form-control mt-3'
        />

        
        <input 
        type="text"
        placeholder='Ingresala direccion'
        onChange={(e) => setDireccion(e.target.value)}
        value={direccion}
        className='form-control mt-3'
        />


        {errorIdComuna && 
        <div className="alert alert-danger mx-1 mb-0" role="alert">
            <p>Selecciona una comuna</p>
        </div>}
        <select className='form-control mt-3' onChange={(e) => setIdComuna(e.target.value)}>
            <option value="">Selecciona la comuna</option>
            {comunas.map((c) => (
                <option key={c.id_comuna} value={c.id_comuna}>{c.nom_comuna}</option>
            ))}
        </select>


        {errorCorreoUsuario && 
        <div className="alert alert-danger mx-1 mb-0" role="alert">
            <p>Ingresa un correo de usuario</p>
        </div>}
        <input 
        type="email"
        placeholder='Ingresa el correo del usuario'
        onChange={(e) => setCorreoUsuario(e.target.value)}
        value={correoUsuario}
        className='form-control mt-3'
        />

{errorPassUsuario && 
        <div className="alert alert-danger mx-1 mb-0" role="alert">
            <p>Ingresa una contraseña</p>
        </div>}

        <input 
        type="password"
        placeholder='Ingresa la contraseña del usuario'
        onChange={(e) => setPassUsuario(e.target.value)}
        value={passUsuario}
        className='form-control mt-3'
        />

        
    {errorPassUsuario2 && 
        <div className="alert alert-danger mx-1 mb-0" role="alert">
            <p>Ingresa una contraseña</p>
        </div>}
        <input 
        type="password"
        placeholder='Ingresa nuevamente la contraseña'
        onChange={(e) => setPassUsuario2(e.target.value)}
        value={passUsuario2}
        className='form-control mt-3'
        />

        {errorPassUsuarioCoincidencia && <div className="alert alert-danger mx-1 mb-0" role="alert">
            <p>Las contraseñas no coinciden</p>
        </div>}




{errorRol && 
        <div className="alert alert-danger mx-1 mb-0" role="alert">
            <p>Ingresa un rol para el usuario</p>
        </div>}
        <select className='form-select mt-3' onChange={(e) => setRol(e.target.value)}>
            <option value="">Selecciona el rol</option>
            {roles.map((r) => (
                <option value={r.id_rol}>{r.nom_rol}</option>
            ))}
        </select>
        





        
      
      </div>
      <div className="modal-footer">

        <button className={editarUsuario ? 'btn btn-warning' : 'btn btn-success'}>{editarUsuario ? 'Editar' : 'Agregar'}</button>
        
        <button onClick={limpiarCasillas} type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
      </div>
      </form>
        </div>
    </div>
    </div>
    </div>
  )
}

export default FormularioUsuario
