import React from 'react'
import { nanoid } from 'nanoid'
import Swal from 'sweetalert2'
// import { SolicitudesContext } from '../context/SolicitudProvider'
import moment from 'moment'

const FormularioSolicitud = ({
    solicitudes, setSolicitudes,
    solicitud,setSolicitud,
    idUsuario, setIdUsuario,
    usuarios, setUsuarios
  }) => {

  // const {solicitudes, setSolicitudes, usuarios, setUsuarios} = React.useContext(SolicitudesContext)

    const [errorSolicitud, setErrorSolicitud] = React.useState(false)
    const [errorUsuario, setErrorUsuario] = React.useState(false)
    const [errorMinSolicitud, setErrorMinSolicitud] = React.useState(false)


    const agregarSolicitud = (e) => {
        e.preventDefault()

        if(!idUsuario.trim()){
          setErrorUsuario(true)
          console.log('Ingresa usu')
          return
      }
      setErrorUsuario(false)

        if(!solicitud.trim()){
            setErrorSolicitud(true)
            console.log('Ingresa soli')
            return
        }
        setErrorSolicitud(false)

        if(solicitud.length < 20){
          setErrorMinSolicitud(true)
          console.log('Debes ingresar un minimo de 20 caracteres')
          return
        }
        setErrorMinSolicitud(false)
        
        const fecha = moment()
        const randomId = nanoid(6)

        
        

        
            const requestInit = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id_solicitud : randomId, 
                    id_usuario : idUsuario,
                    solicitud : solicitud,
                    fecha_solicitud: fecha.format('YYYY-MM-DD'),
                    hora_solicitud: fecha.format('hh:mm:ss'),
                    estado: false

                })
            }
            fetch('http://localhost:9000/api/solicitud/', requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
    
            const arrayAgregado = [...solicitudes, { 
                id_solicitud : randomId, 
                id_usuario : idUsuario,
                solicitud : solicitud,
                fecha_solicitud: fecha.format('YYYY-MM-DD'),
                hora_solicitud: fecha.format('hh:mm:ss'),
                estado: false}]
    
            setSolicitudes(arrayAgregado)
    
           
            
            Swal.fire({
                title: 'Agregado',
                text: 'Proveedor agregado correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer:2000
            })
            
        
        
        
}  

const limpiarCasillas = () => {
    setIdUsuario('')
    setSolicitud('')
    setErrorMinSolicitud(false)
    setErrorSolicitud(false)
    setErrorUsuario(false)
}
  return (
    <div>
        <div>
        <button data-bs-toggle="modal"
                    data-bs-target="#myModal" className='mb-5'>Ingresar solicitud</button>
            <form onSubmit={agregarSolicitud} className='mt-5'>
                

                <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {/* <h4 className="modal-title">
                  {editarMesa ? "Editar Mesa" : "Agregar Mesa"}
                </h4> */}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              
                <div className="modal-body">
                  {/* Alerta producto */}

                  {errorUsuario && <div className='alert alert-danger'>
                    <p>Debes ingresar un Usuario</p>
                    </div>}
                    <select className='form-select mb-5' onChange={(e) => setIdUsuario(e.target.value)} >
                        <option value="">Selecciona un usuario</option>
                        {usuarios.map((u) => (
                            <option key={u.id_usuario} value={u.id_usuario}>{u.nom_usuario}</option>
                        ))}
                        
                    </select>
                    

                    {errorSolicitud && <div className='alert alert-danger'>
                      <p>Debes ingresar una solicitud</p>
                      </div>}
                    {errorMinSolicitud && <div className='alert alert-danger'>
                      <p>La cantidad de caracteres mínina es de 20</p>
                      </div>}
                     
                    <textarea 
                    onChange={(e) => setSolicitud(e.target.value)}
                     
                    placeholder='Detalla la solicitud' 
                    maxLength={1000} 
                    cols="40" 
                    rows="10"
                    value={solicitud}
                    ></textarea>
                    
                
                </div>
                <div className="modal-footer">
                  
                    <button type='submit' className='btn btn-success'>Enviar</button>
                  <button
                    onClick={limpiarCasillas}
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              
            </div>
          </div>
        </div>

            </form>
        </div>
    </div>
  )
}

export default FormularioSolicitud