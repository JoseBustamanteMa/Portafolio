import React from "react";
import FormularioMesa from "./FormularioMesa";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import Swal from 'sweetalert2'

const Mesas = () => {
  const [mesas, setMesas] = React.useState([]);
  const [idMesa, setIdMesa] = React.useState("");
  const [minMesa, setMinMesa] = React.useState("");
  const [maxMesa, setMaxMesa] = React.useState("");
  const [editarMesa, setEditarMesa] = React.useState(false);

  React.useEffect(() => {
    const obtenerMesas = async () => {
      const data = await fetch("http://localhost:9000/api/mesa");
      const mes = await data.json();
      setMesas(mes);
    };

    obtenerMesas();
  }, []);

  const eliminarMesa = (id) => {

    Swal.fire({
      title: 'Eliminar',
      text: '¿Deseas eliminar la mesa?',
      icon: 'question',
      showDenyButton: true,
      denyButtonColor: '#01cc17',
      confirmButtonColor: '#f81e04',
      confirmButtonText: 'Sí'
    }).then(response => {
      if(response.isConfirmed){
        const requestInit = {
          method: "DELETE",
        };
        fetch("http://localhost:9000/api/mesa/" + id, requestInit)
          .then((res) => res.text())
          .then((res) => console.log(res));
  
        const arrayEliminado = mesas.filter((item) => item.id_mesa !== id);
  
        setMesas(arrayEliminado);
        Swal.fire({
          title: 'Eliminada',
          text: 'Mesa eliminada correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
      }
      
    }
      )
    
  };

  const editar = (item) => {
    setIdMesa(item.id_mesa);
    setMinMesa(item.cant_personas_min);
    setMaxMesa(item.cant_personas_max);
    setEditarMesa(true);
  };

  return (
    <div>
      <div className="container box1">
        <hr></hr>
        <h1 className="text-center">
            Gestión de Mesas
        </h1>
        <table id="1" className="table table-dark table-responsive table-hover box align-middle">
          <thead>
            <tr className="align-middle">
              <th>ID Mesa</th>
              <th>Personas minimo</th>
              <th>Personas maximo</th>
              <th>
                <div>
                    <ReactHtmlTableToExcel
                    id="btnExportExcelRol"
                    table="1"
                    className="btn btn-3"
                    filename="Mesas"
                    sheet="pagina 1"
                    buttonText="Imp.Excel"/>
                </div>
              </th>
            </tr>
          </thead>
          {mesas.map((item) => (
            <tbody key={item.id_mesa}>
              <tr>
                <td>{item.id_mesa}</td>
                <td>{item.cant_personas_min}</td>
                <td>{item.cant_personas_max}</td>
                <td className="col-1">
                  <button
                    onClick={() => editar(item)}
                    className="btn btn-1"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarMesa(item.id_mesa)}
                    className="btn btn-2 "
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div>
          <FormularioMesa
            mesas={mesas}
            setMesas={setMesas}
            idMesa={idMesa}
            setIdMesa={setIdMesa}
            minMesa={minMesa}
            setMinMesa={setMinMesa}
            maxMesa={maxMesa}
            setMaxMesa={setMaxMesa}
            editarMesa={editarMesa}
            setEditarMesa={setEditarMesa}
          />
        </div>
        <hr/>
      </div>
      
    </div>
  );
};

export default Mesas;
