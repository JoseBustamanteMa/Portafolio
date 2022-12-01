import React from 'react'
import Swal from 'sweetalert2';
// import { HookUser } from './HookUser';

const FormularioLogin = ({user, setUser, correo, setCorreo, pass, setPass, usuarios, setUsuarios}) => {

  const EstadoDeUsuario = () => {
    
  }

    React.useEffect(() => {
        const obtenerUsuarios = async () => {
          const data = await fetch("http://localhost:9000/api/usuario");
          const rols = await data.json();
          setUsuarios(rols);
        };
        obtenerUsuarios();
      }, [])


      const iniciarSesion = (e) => {
        e.preventDefault()
        let Existe = ''
        let nombre = ''
        usuarios.forEach( u => {
            if(u.correo_usuario === correo && u.usuario_pass === pass){
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
                  timer:1000,
                  showConfirmButton: false
                })

                
            }

            
         })

         if(!Existe){
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
          showConfirmButton:false
        })
      
        
      }
  return (
    
    

    <div>
      
      <form onSubmit={user ? logout : iniciarSesion}>
        <input type="email"
        placeholder='Ingresa email'
        onChange={(e) => setCorreo(e.target.value)}
        value={correo}
        
        />

        <input type="password"
        placeholder='Ingresa la clave'
        onChange={(e) => setPass(e.target.value)}
        value={pass}
        />


    {user ? <button type='submit'>Cerrar sesión</button> :  <button type='submit'>Iniciar sesión</button>}
      </form>
        <button onClick={mostrar}>Mostrar</button>
   

    
      
    </div>
  )
}

export default FormularioLogin

