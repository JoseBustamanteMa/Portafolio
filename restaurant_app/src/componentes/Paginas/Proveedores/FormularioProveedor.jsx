import React from 'react'
import { nanoid } from 'nanoid'
import Swal from 'sweetalert2'


const FormularioProveedor = ({provs, setProvs, id , setId ,nombre , setNombre, correo , setCorreo, 
    direccion, setDireccion, telefono , setTelefono, comuna, setComuna, editarProv , setEditarProv,
    comunas, setComunas}) => {
    
    const [vacioId, setVacioId] = React.useState()
    const [vacioNombre, setVacioNombre] = React.useState()
    const [vacioCorreo, setVacioCorreo] = React.useState()
    const [vacioDireccion, setVacioDireccion] = React.useState()
    const [vacioTelefono, setVacioTelefono] = React.useState()
    const [vacioComuna, setVacioComuna] = React.useState()
    const [nombreIgualError, setNombreIgualError] = React.useState()
    const [correoIgualError, setCorreoIgualError] = React.useState()
    
    

   


    const onBlurNombre = () => {
        let NombreIgual = ''

        const provsFiltrado = provs.filter((item) => item.id_proveedor !== id)

        provsFiltrado.forEach(item => {
            if(item.nom_proveedor === nombre){
                console.log('estamos dentro del if')
                NombreIgual = item.id_proveedor
                setNombreIgualError(true)
            }
        });

        if(!NombreIgual){
            setNombreIgualError(false)  
        }
    }

    const onBlurCorreo = () => {
        let CorreoIgual = ''

        const provsFiltrado = provs.filter((item) => item.id_proveedor !== id)

        provsFiltrado.forEach(item => {
            if(item.correo_prov === correo){
                console.log('estamos dentro del if')
                CorreoIgual = item.id_proveedor
                setCorreoIgualError(true)
            }
        });

        if(!CorreoIgual){
            setCorreoIgualError(false)  
        }
    }
    
    
    const agregarProveedor = (e) => {
        e.preventDefault()

        if(!nombre.trim()){
            setVacioNombre(true)
            return
        }
        setVacioNombre(false)

        if(!correo.trim()){
            setVacioCorreo(true)
            return
        }
        setVacioCorreo(false)

        if(!direccion.trim()){
            setVacioDireccion(true)
            return
        }
        setVacioDireccion(false)

        const strTelefono = telefono.toString()
        if(!strTelefono.trim()){
            setVacioTelefono(true)
            return
        }
        setVacioTelefono(false)
        
        if(!comuna.trim()){
            setVacioComuna(true)
            return
        }
        setVacioComuna(false)

        
        
        
        if(!nombreIgualError )
        {

            const randomId = nanoid(4)
            const requestInit = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id_proveedor : randomId, nom_proveedor : nombre, correo_prov: correo,
                    direccion : direccion, telefono_prov: telefono, id_comuna : comuna

                })
            }
            fetch('http://localhost:9000/api/proveedor/', requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
    
            const arrayAgregado = [...provs, { id_proveedor : randomId, nom_proveedor : nombre, 
                correo_prov: correo, direccion : direccion, telefono_prov: telefono, id_comuna : comuna}]
    
            setProvs(arrayAgregado)
    
           
            setId('')
            setNombre('')
            setCorreo('')
            setDireccion('')
            setTelefono('')
            setComuna('')
            setEditarProv(false)

            Swal.fire({
                title: 'Agregado',
                text: 'Proveedor agregado correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer:2000
            })
            
        
        }
        
}  

const actualizarProveedor = (e) => {
    e.preventDefault()
    //Validacion de datos

    if(!nombre.trim()){
        setVacioNombre(true)
        return
    }
    setVacioNombre(false)

    if(!correo.trim()){
        setVacioCorreo(true)
        return
    }
    setVacioCorreo(false)

    if(!direccion.trim()){
        setVacioDireccion(true)
        return
    }
    setVacioDireccion(false)

    const strTelefono = telefono.toString()
    if(!strTelefono.trim()){
        setVacioTelefono(true)
        return
    }
    setVacioTelefono(false)
    
    if(!comuna.trim()){
        setVacioComuna(true)
        return
    }
    setVacioComuna(false)
    if(!nombreIgualError){
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id_proveedor : id, nom_proveedor : nombre, 
                correo_prov: correo, direccion : direccion, telefono_prov: telefono, id_comuna : comuna
            })
            }
            fetch('http://localhost:9000/api/proveedor/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
    
    
            const arrayEditado = provs.map((item) => (item.id_proveedor === id ? (
                {id_proveedor : id, nom_proveedor : nombre, 
                    correo_prov: correo, direccion : direccion, telefono_prov: telefono, id_comuna : comuna} 
            ) : item))
    
            setProvs(arrayEditado)
    
            
            setId('')
            setNombre('')
            setCorreo('')
            setDireccion('')
            setTelefono('')
            setComuna('')
            setEditarProv(false)

            Swal.fire({
                title: 'Actualizado',
                text: 'Proveedor actualizado correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer:2000
            })
            

    }
    
     

    }

    const limpiarCasillas = () => {
        
        setId('')
        setNombre('')
        setCorreo('')
        setDireccion('')
        setTelefono('')
        setComuna('')
        setEditarProv(false)
        setNombreIgualError(false)
    }
  return (
    <div>
        <div>
            {editarProv ? 
            <div className='text-center'>
                <button type="button" className="btn btn-success text-center mb-5" data-bs-toggle="modal" data-bs-target="#myModal">
                    <h4>+ Editar proveedor</h4>
                </button>
            </div> : <div className='text-center'>
            <button type="button" className="btn btn-success text-center mb-5" data-bs-toggle="modal" data-bs-target="#myModal">
                <h4>+ Agregar proveedor</h4>
            </button>
        </div>}







<div className="modal fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">

      
      <div className="modal-header">
        <h4 className="modal-title">{editarProv ? "Editar proveedor" : "Agregar proveedor"}</h4>
        <button onClick={limpiarCasillas} type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form onSubmit={editarProv ? actualizarProveedor : agregarProveedor}>

      
      
      <div className="modal-body">
      

        
      {nombreIgualError ? <div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡Ya existe ese proveedor!
        </div> : <div></div>}

        {vacioNombre ? <div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡Debes ingresar un nombre!
        </div> : <div></div>}
        <input 
        type="text"
        placeholder='Nombre del proveedor' 
        className='form-control mt-3'
        onChange={(e) => setNombre(e.target.value)}
        value={nombre}
        onBlur={onBlurNombre}/>



        {correoIgualError ? <div className="alert alert-danger mx-1 mb-0" role="alert">
        ¡Correo ya existe!
        </div> : <div></div>}
        {vacioCorreo ? <div className="alert alert-danger mx-1 mb-0" role="alert">
        ¡Debes ingresar un correo!
        </div> : <div></div>}
        <input type="email"
        placeholder='Correo de contacto' 
        className='form-control mt-3'
        onChange={(e) => setCorreo(e.target.value)}
        value={correo}
        onBlur={onBlurCorreo}
                
        //required
        />

        {vacioDireccion ? <div className="alert alert-danger mx-1 mb-0" role="alert">
        ¡Debes ingresar una direccion!
        </div> : <div></div>}
        <input type="text"
        placeholder='Direccion del proveedor' 
        className='form-control mt-3'
        onChange={(e) => setDireccion(e.target.value)}
        value={direccion}
                
        //required
        />

        {vacioTelefono ? <div className="alert alert-danger mx-1 mb-0" role="alert">
            ¡Debes ingresar un telefono!
        </div> : <div></div>}
        <input type="number"
        placeholder='Telefono de contacto' 
        className='form-control mt-3'
        onChange={(e) => setTelefono(e.target.value)}
        value={telefono}
                
        //required
        />

        {vacioComuna ? <div className="alert alert-danger mx-1 mb-0" role="alert">
            ¡Debes elegir    una comuna!
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

        
      </div>
      <div className="modal-footer">

        {editarProv ? <button className='btn btn-warning' type='submit'>Editar proveedor</button> :
        <button className='btn btn-success' type='submit'>Agregar proveedor</button>}
        
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

export default FormularioProveedor