import React from "react";
import FormularioProveedor from "./FormularioProveedor";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import Swal from 'sweetalert2'

const Proveedores = () => {
  const [provs, setProvs] = React.useState([]);
  const [id, setId] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [comuna, setComuna] = React.useState("");
  const [editarProv, setEditarProv] = React.useState(false);
  const [comunas, setComunas] = React.useState([]);
  const [productos, setProductos] = React.useState([]);

  React.useEffect(() => {
    const obtenerProveedores = async () => {
      const data = await fetch("http://localhost:9000/api/proveedor");
      const proves = await data.json();
      setProvs(proves);
    };
    obtenerProveedores();

    const obtenerComunas = async () => {
      const data = await fetch("http://localhost:9000/api/comuna");
      const coms = await data.json();
      setComunas(coms);
    };
    obtenerComunas();

    const obtenerProductos = async () => {
      const data = await fetch("http://localhost:9000/api/producto");
      const users = await data.json();
      setProductos(users);
    };
    obtenerProductos();
  }, []);

  const eliminarProveedor = (id) => {
    let existeId = "";

    productos.forEach((item) => {
      if (id === item.id_proveedor) {
        existeId = "existe";
        return;
      }
    });

    if (!existeId) {

      Swal.fire({
        title: 'Eliminar',
        text: '¿Deseas eliminar al proveedor?',
        icon: 'question',
        showDenyButton: true,
        denyButtonColor:'#01cc17',
        confirmButtonColor: '#f81e04',
        confirmButtonText: 'Sí'
      }).then(response => {
        if(response.isConfirmed){
          const requestInit = {
            method: "DELETE",
          };
          fetch("http://localhost:9000/api/proveedor/" + id, requestInit)
            .then((res) => res.text())
            .then((res) => console.log(res));
  
          const arrayEliminado = provs.filter((item) => item.id_proveedor !== id);
  
          setProvs(arrayEliminado);
          Swal.fire({
            title: 'Eliminado',
            text:  "Eliminado correctamente",
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })
  
        }
      })

     
    }
    if (existeId) {

      Swal.fire({
        title: 'Advertencia',
        text:  "¡No puedes eliminar el proveedor, porque está asignado a un producto!",
        icon: 'warning',
        showConfirmButton: false,
        timer: 2000
      })

    }
  };

  const editar = (item) => {
    setId(item.id_proveedor);
    setNombre(item.nom_proveedor);
    setCorreo(item.correo_prov);
    setTelefono(item.telefono_prov);
    setDireccion(item.direccion);
    setComuna(item.id_comuna);
    setEditarProv(true);
  };

  return (
    <div>
     
      <div className="container">
        <div className="container box1 ">
            <hr/>
            <h2 className="container text-center">
                Gestión De Proveedores
            </h2>
            <table id="1" className="table table-dark table-responsive table-hover box align-middle">
            <thead>
                <tr className="align-middle">
                <th className="col-3">Nombre proveedor</th>
                <th className="col-2">Correo proveedor</th>
                <th className="col-2">Telefono proovedor</th>
                <th className="col-2" >Comuna</th>
                <th>
                <div>
                    <ReactHtmlTableToExcel
                    id="btnExportExcelRol"
                    table="1"
                    className="btn btn-3"
                    filename="Proveedores"
                    sheet="pagina 1"
                    buttonText="Imp.Excel"/>
                </div>
                </th>
                </tr>
            </thead>
            {provs.map((item) => (
                <tbody key={item.id_proveedor}>
                <tr>
                    <td className="col-2 ">{item.nom_proveedor}</td>
                    <td className="col-4 ">{item.correo_prov}</td>
                    <td className="col-2">{item.telefono_prov}</td>
                    {comunas.map(
                    (com) =>
                        item.id_comuna === com.id_comuna && (
                        <td key={com.id_comuna}>{com.nom_comuna}</td>
                        )
                    )}
                    <td className="container col-1">
                    <button
                        onClick={() => editar(item)}
                        className="btn btn-1"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => eliminarProveedor(item.id_proveedor)}
                        className="btn btn-2"
                    >
                        Eliminar
                    </button>
                    </td>
                </tr>
                </tbody>
            ))}
            </table>
            
            <div>
            <FormularioProveedor
            provs={provs}
            setProvs={setProvs}
            id={id}
            setId={setId}
            nombre={nombre}
            setNombre={setNombre}
            correo={correo}
            setCorreo={setCorreo}
            direccion={direccion}
            setDireccion={setDireccion}
            telefono={telefono}
            setTelefono={setTelefono}
            comuna={comuna}
            setComuna={setComuna}
            editarProv={editarProv}
            setEditarProv={setEditarProv}
            comunas={comunas}
            setComunas={setComunas}
            />
        </div>
        <hr/>
        </div>
        </div>
    </div>
  );
};

export default Proveedores;
