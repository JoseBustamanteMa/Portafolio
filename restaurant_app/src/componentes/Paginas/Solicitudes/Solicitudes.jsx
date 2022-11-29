import React from "react";
import FormularioSolicitud from "./FormularioSolicitud";
import Swal from "sweetalert2";
import Boletas from "../Boletas/Boletas";
import { SolicitudesContext } from "../context/SolicitudProvider";

import moment from "moment";
// import format from "date-fns/format";

const Solicitudes = () => {

  // const {solicitudes, setSolicitudes, usuarios, setUsuarios} = React.useContext(SolicitudesContext)


  
  
  const [idUsuario, setIdUsuario] = React.useState("");
  const [solicitud, setSolicitud] = React.useState("");
  const [solicitudes, setSolicitudes] = React.useState([]);
  const [usuarios, setUsuarios] = React.useState([]);


  React.useEffect(() => {
    const obtenerSolicitudes = async () => {
      const data = await fetch("http://localhost:9000/api/solicitud");
      const sol = await data.json();
      setSolicitudes(sol);
    };

    obtenerSolicitudes();
  }, []);
  React.useEffect(() => {
    const obtenerUsuarios = async () => {
      const data = await fetch("http://localhost:9000/api/usuario");
      const sol = await data.json();
      setUsuarios(sol);
    };

    obtenerUsuarios();
  }, []);


  const cambiarEstado = (p) => {
    let estado = 0
    
    if(p.estado === 1){
        estado = 0
      }

    if(p.estado === 0){
        estado = 1
     }

    
    
      const requestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
              id_solicitud: p.id_solicitud,
              id_usuario : p.id_usuario,
              solicitud: p.solicitud,
              fecha_solicitud: p.fecha_solicitud,
              hora_solicitud: p.hora_solicitud,
              estado: estado

        }),
      };
      fetch("http://localhost:9000/api/solicitud/" + p.id_solicitud , requestInit)
        .then((res) => res.text())
        .then((res) => console.log(res));

      const arrayEditado = solicitudes.map((item) =>
        item.id_solicitud === p.id_solicitud
          ? {
            id_solicitud: p.id_solicitud,
            id_usuario : p.id_usuario,
            solicitud: p.solicitud,
            fecha_solicitud: p.fecha_solicitud,
            hora_solicitud: p.hora_solicitud,
            estado: estado
            }
          : item
      );

        setSolicitudes(arrayEditado)

      

      if(estado === 1){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1200,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: '¡Solicitud respondida!'
          })
      }

    if(estado === 0){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1200,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'warning',
            title: '¡Solicitud devuelta!'
          })
     }

     
  };

  

  return (
    <div className="container">
      <div>
        <FormularioSolicitud
          solicitudes={solicitudes}
          setSolicitudes={setSolicitudes}
          solicitud={solicitud}
          setSolicitud={setSolicitud}
          idUsuario={idUsuario}
          setIdUsuario={setIdUsuario}
          usuarios={usuarios}
          setUsuarios={setUsuarios}
        />
      </div>


      <div className="container box1">
      <table className="table mb-5">
        <thead>
          <tr>
            <th className="col-2">Codigo solicitud</th>
            <th className="col-2">Usuario solicitante</th>
            <th className="col-6">Solicitud</th>
            <th className="col-2">Estado</th>
            <th className="col-2">Fecha</th>
          </tr>
        </thead>

        <tbody>
          {solicitudes.map(
            (s) =>
              s.estado == 0 && (
                <tr key={s.id_solicitud}>
                  <td>{s.id_solicitud}</td>
                  <td>{usuarios.map((u) => (
                    u.id_usuario === s.id_usuario && u.nom_usuario
                  ))}</td>
                  <td className="col-2">{s.solicitud}</td>
                  <td>
                    <button onClick={() => cambiarEstado(s)} className="btn btn-danger">Pendiente</button>
                  </td>
                  <td>{`Fecha: ${s.fecha_solicitud.split('T')[0]} Hora: ${s.hora_solicitud} `}</td>
                </tr>
              )
          )}
        </tbody>
      </table>

      </div>

    






      <div className="container box1">
      <table className="table mt-5">
        <thead>
          <tr>
            <th className="col-2">Codigo solicitud</th>
            <th className="col-2">Usuario solicitante</th>
            <th className="col-6">Solicitud</th>
            <th className="col-2">Estado</th>
            <th className="col-2">Fecha</th>
          </tr>
        </thead>

        <tbody>
          {solicitudes.map(
            (s) =>
              s.estado == 1 && (
                <tr key={s.id_solicitud}>
                  <td className="col-2">{s.id_solicitud}</td>
                  <td className="col-2">{usuarios.map((u) => (
                    u.id_usuario === s.id_usuario && u.nom_usuario
                  ))}</td>
                  <td className="col-2">{s.solicitud}</td>
                  <td className="col-2">
                    <button onClick={() => cambiarEstado(s)} className="btn btn-success">Listo</button>
                  </td>
                  <td className="col-2">{`Fecha: ${s.fecha_solicitud.split('T')[0]} Hora: ${s.hora_solicitud} `}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
      </div>
                    
    </div>
  );
};

export default Solicitudes;
