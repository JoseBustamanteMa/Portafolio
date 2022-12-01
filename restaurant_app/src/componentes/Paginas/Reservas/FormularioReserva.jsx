import React from "react";
import { nanoid } from "nanoid";
import moment from "moment";
import DateMomentUtils from '@date-io/moment';

import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


const FormularioReserva = ({
  reservas,
  setReservas,
  usuarios,
  setUsuarios,
  mesas,
  setMesas,
  idReserva,
  setIdReserva,
  cantPersonas,
  setCantPersonas,
  fechaReserva,
  setFechaReserva,
  fechaEfectuada,
  setFechaEfectuada,
  idMesa,
  setIdMesa,
  idUsuario,
  setIdUsuario,
  editarReserva,
  setEditarReserva,
}) => {

    const [errorCantPersonas, setErrorCantPersonas] = React.useState(false)
    const [errorFechaReserva, setErrorFechaReserva] = React.useState(false)
    const [errorMesa, setErrorMesa] = React.useState(false)
    const [errorUsuario, setErrorUsuario] = React.useState(false)
    

    //const minimo = moment().format('YYYY-MM-DD 08:00') 




  const agregarReserva = (e) => {
    e.preventDefault();


    
    if(cantPersonas == 0){
        setErrorCantPersonas(true)
    }
    setErrorCantPersonas(false)

    
    
    if(!fechaReserva ){
        setErrorFechaReserva(true)
        return
    }
    setErrorFechaReserva(false)

    if(!idMesa.trim()){
        setErrorMesa(true)
        return
    }
    setErrorMesa(false)

    if(!idUsuario.trim()){
        setErrorUsuario(true)
        return
    }
    setErrorUsuario(false)



    const randomId = nanoid(10);
    const fecha= moment()
    const fechaActual = fecha.format('YYYY-MM-DD')
    const horaActual = fecha.format('hh:mm')




    // if(!rolIgualError && !idIgualError){
    const requestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_reserva: randomId,
        cant_perso: cantPersonas,
        fecha_reserva: fechaReserva,
        hora_reserva: fechaReserva,
        fecha_reserva_efectuada: fechaActual,
        hora_reserva_efectuada: horaActual,
        id_mesa: idMesa,
        id_usuario: idUsuario,
      }),
    };
    fetch("http://localhost:9000/api/reserva/", requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    const arrayAgregado = [
      ...reservas,
      {
        id_reserva: randomId,
        cant_perso: cantPersonas,
        fecha_reserva: fechaActual,
        hora_reserva: horaActual,
        fecha_reserva: fechaReserva._d.toLocaleDateString(),
        hora_reserva: fechaReserva._d.toLocaleTimeString(),
        id_mesa: idMesa,
        id_usuario: idUsuario,
      },
    ];

    setReservas(arrayAgregado);

    console.log(fechaReserva._d.toLocaleDateString())
    // limpiarCasillas();

    // }
  };


  const limpiarCasillas = () => {
    setIdReserva("");

    setCantPersonas("");

    setFechaReserva(null);

    setFechaEfectuada(null);

    setIdMesa("");

    setIdUsuario("");
    setEditarReserva(false);
  };

  const handleDateChange = (date) => {
    setFechaReserva(date)
    console.log(date._d.toLocaleTimeString())
  }

  return (
    <div>

        <div>
            <button className="btn btn-success mt-5" data-bs-toggle="modal" data-bs-target="#myModal">
                Reservar
            </button>
        </div>
    
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                {"Reservar 🛎"}
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form onSubmit={agregarReserva}>
              <div className="modal-body">
                {/* Alerta producto */}

                {/*          
      <div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡Debes ingresar un rol!
        </div> */}

        {errorCantPersonas && <div className="alert alert-danger mx-1 mb-0" role="alert">
            Ingresa una cantidad de personas
        </div>}

                <input
                  type="number"
                  placeholder="Elige cantidad de personas"
                  className="form-control mt-3"
                  onChange={(e) => setCantPersonas(e.target.value)}
                  value={cantPersonas}
                />

{errorFechaReserva && <div className="alert alert-danger mx-1 mb-0" role="alert">
            Selecciona una fecha
        </div>}

                    <MuiPickersUtilsProvider utils={DateMomentUtils}>
                        <DateTimePicker 
                        ampm={false}
                        disableToolbar 
                        autoOk
                        autoSave=""
                        value={fechaReserva} 
                        onChange={handleDateChange} 
                        format="YYYY-MM-DD hh:mm"
                        placeholder="Elige la fecha"
                        />
                    </MuiPickersUtilsProvider>|
                

                
                    {errorMesa && <div className="alert alert-danger mx-1 mb-0" role="alert">
            Selecciona una mesa
        </div>}
                

                <select className="form-select mt-3" onChange={(e) => setIdMesa(e.target.value)}>
                    <option value="">Elige una mesa...</option>
                    {mesas.map(m => (
                        <option key={m.id_mesa} value={m.id_mesa}>Mesa numero: {m.id_mesa} ... Min: {m.cant_personas_min} - Max:{m.cant_personas_max}</option>
                    ))}
                </select>

                

                {errorUsuario && <div className="alert alert-danger mx-1 mb-0" role="alert">
            Selecciona un usuario
        </div>}

                <select className="form-select mt-3" onChange={(e) => setIdUsuario(e.target.value)}>
                    <option value="">Elige un usuario...</option>
                    {usuarios.map(u=> (
                        <option key={u.id_usuario} value={u.id_usuario}>{u.nom_usuario}</option>
                    ))}
                </select>

                
              </div>
              <div className="modal-footer">
                
                  <button className="btn btn-success" type="submit">
                    Reservar
                  </button>
                

                <button
                  onClick={limpiarCasillas}
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioReserva;
