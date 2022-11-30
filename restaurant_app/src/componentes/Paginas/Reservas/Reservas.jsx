import moment from 'moment'
import React from 'react'
import FormularioReserva from './FormularioReserva'
import MomentUtils from '@date-io/moment'
import Swal from 'sweetalert2'

const Reservas = () => {

  const [reservas, setReservas] = React.useState([])
  const [usuarios, setUsuarios] = React.useState([])
  const [mesas, setMesas] = React.useState([])


  const [cantPersonas, setCantPersonas] = React.useState(0)
  const [idReserva, setIdReserva] = React.useState('')
  const [fechaReserva, setFechaReserva] = React.useState(null)
  const [horaReserva, setHoraReserva] = React.useState(null)
  const [fechaEfectuada, setFechaEfectuada] = React.useState(null)
  const [horaEfectuada, setHoraEfectuada] = React.useState(null)
  const [idMesa, setIdMesa] = React.useState('')
  const [idUsuario, setIdUsuario] = React.useState('')
  const [editarReserva, setEditarReserva] = React.useState(false)


  React.useEffect(() => {
    const obtenerReservas = async () => {
      const data = await fetch("http://localhost:9000/api/reserva");
      const sol = await data.json();
      setReservas(sol);
    };

    obtenerReservas();

    const obtenerUsuarios = async () => {
      const data = await fetch("http://localhost:9000/api/usuario");
      const sol = await data.json();
      setUsuarios(sol);
    };

    obtenerUsuarios();


    const obtenerMesas = async () => {
      const data = await fetch("http://localhost:9000/api/mesa");
      const mesa = await data.json();
      setMesas(mesa);
    };

    obtenerMesas();


  }, []);



  const eliminarReserva = (id) => {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Deseas eliminar la reserva?',
      icon: 'question',
      confirmButtonColor: '#f81e04',
      confirmButtonText: 'Sí',
      showDenyButton: true,
      denyButtonColor: '#01cc17'
    }).then(response => {
      if (response.isConfirmed) {
        const requestInit = {
          method: "DELETE",
        };
        fetch("http://localhost:9000/api/reserva/" + id, requestInit)
          .then((res) => res.text())
          .then((res) => console.log(res));
        const arrayEliminado = reservas.filter((item) => item.id_reserva !== id);

        setReservas(arrayEliminado);



        Swal.fire({
          title: 'Eliminado',
          text: 'Se ha eliminado correctamente',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        })
      }
    })


  };


  // const editar = (s) => {
  //   setIdReserva(s.id_reserva)
  //   setCantPersonas(s.cant_perso)
  //   //console.log(s.fecha_reserva.split('T')[0] +' ' + s.hora_reserva)
  //   setFechaReserva(s.fecha_reserva.split('T')[0] +'T' + s.hora_reserva)
  //   setIdMesa(s.id_mesa)
  //   setIdUsuario(s.id_usuario)
  //   setEditarReserva(true)
  // }

  return (
    <div className='container'>


      <div className='container box1 '>
        <br />
        <div className="text-center">
          <h1>Reservaciones</h1>
        </div>


        <FormularioReserva
          reservas={reservas} setReservas={setReservas}
          usuarios={usuarios} setUsuarios={setUsuarios}
          mesas={mesas} setMesas={setMesas}
          idReserva={idReserva} setIdReserva={setIdReserva}
          cantPersonas={cantPersonas} setCantPersonas={setCantPersonas}
          fechaReserva={fechaReserva} setFechaReserva={setFechaReserva}
          fechaEfectuada={fechaEfectuada} setFechaEfectuada={setFechaEfectuada}
          idMesa={idMesa} setIdMesa={setIdMesa}
          idUsuario={idUsuario} setIdUsuario={setIdUsuario}
          editarReserva={editarReserva} setEditarReserva={setEditarReserva}
        />
        <table className='table col-12 table-dark  table-hover box align-middle'>
          <thead>
            <tr>
              <th className='col-2'>Mesa</th>
              <th className='col-6'>Fecha</th>
              <th className='col-2'>Cantidad Personas</th>
              <th className='col-2'></th>
            </tr>
          </thead>
          {reservas.map(r => (
            <tbody>
              <tr>

                <td>
                  {r.id_mesa}
                </td>
                <td key={r.id_reserva}>
                  {r.fecha_reserva.split('T')[0]} {r.hora_reserva}
                </td>


                <td>{r.cant_perso}</td>
                <td><button className='btn btn-danger' onClick={() => eliminarReserva(r.id_reserva)}>Cancelar reserva</button>
                </td>



              </tr>
            </tbody>))}
            

        </table>
        <br />
      </div>

    </div >
  )
}

export default Reservas