import React from 'react'


export const SolicitudesContext = React.createContext()
const SolicitudProvider = (props) => {

    const [solicitudes, setSolicitudes] = React.useState([]);
    const [usuarios, setUsuarios] = React.useState([]);
    const [idUsuario, setIdUsuario] = React.useState("");
    const [solicitud, setSolicitud] = React.useState("");
    

   

   
  
  return (
    <SolicitudesContext.Provider value={{solicitudes, setSolicitudes, usuarios, setUsuarios, idUsuario, setIdUsuario, solicitud, setSolicitud}}>
        {props.children}
    </SolicitudesContext.Provider>
  )
}

export default SolicitudProvider