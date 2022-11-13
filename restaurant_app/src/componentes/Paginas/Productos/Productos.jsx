import React from "react";
//import { nanoid } from 'nanoid'
import FormularioProducto from "./FormularioProducto";
import ReactHtmlTableToExcel from "react-html-table-to-excel";

const Productos = () => {
  const [producto, setProducto] = React.useState("");
  const [estado, setEstado] = React.useState(true);
  const [proveedor, setProveedor] = React.useState("");
  const [productos, setProductos] = React.useState([]);
  //const [estadoModal, setEstadoModal] = React.useState(false)
  const [estadoEditar, setEstadoEditar] = React.useState(false);
  const [id, setId] = React.useState("");
  const [provs, setProvs] = React.useState([]);

  React.useEffect(() => {
    const obtenerProductos = async () => {
      const data = await fetch("http://localhost:9000/api/producto");
      const users = await data.json();
      setProductos(users);
    };

    obtenerProductos();

    const obtenerProveedores = async () => {
      const data = await fetch("http://localhost:9000/api/proveedor");
      const coms = await data.json();
      setProvs(coms);
    };
    obtenerProveedores();
  }, []);

  const editar = (item) => {
    setEstadoEditar(true);
    setProducto(item.nom_producto);
    setEstado(item.estado);
    setProveedor(item.id_proveedor);
    setId(item.id_producto);
  };

  const eliminarProducto = (id) => {
    if (window.confirm()) {
      const requestInit = {
        method: "DELETE",
      };
      fetch("http://localhost:9000/api/producto/" + id, requestInit)
        .then((res) => res.text())
        .then((res) => console.log(res));

      const arrayEditado = productos.filter((item) => item.id_producto !== id);

      setProductos(arrayEditado);
    }
  };

  return (
    <>
      <div className="container">
        <div className="container box1">
          <div className="col-12">
            <hr />
            <h1 className="text-center">Productos</h1>
            <div className="container col-12">
              <div className=" text-center">
                <table
                  id="1"
                  className="table col-12 table-dark table-responsive table-hover box align-middle"
                >
                  <thead>
                    <tr className="align-middle">
                      <th className="col-4">Producto</th>
                      <th className="col-4">Disponibilidad</th>
                      <th className="col-4">Proveedor</th>
                      <th className="col-1">
                        <div>
                          <ReactHtmlTableToExcel
                            id="btnExportExcelRol"
                            table="1"
                            className="btn btn-3"
                            filename="Productos"
                            sheet="pagina 1"
                            buttonText="Imp.Excel"
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  {productos.map((item) => (
                    <tbody key={item.id_producto}>
                      <tr>
                        <td>{item.nom_producto}</td>
                        <td>
                          {item.estado ? (
                            <p className="text-success ">Disponible</p>
                          ) : (
                            <p className="text-danger">No disponible</p>
                          )}
                        </td>
                        {provs.map(
                          (prov) =>
                            item.id_proveedor === prov.id_proveedor && (
                              <td key={prov.id_proveedor}>
                                {prov.nom_proveedor}
                              </td>
                            )
                        )}
                        {/* <td>{item.id_proveedor}</td> */}
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
                            onClick={() => eliminarProducto(item.id_producto)}
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
                  <FormularioProducto
                    productos={productos}
                    setProductos={setProductos}
                    producto={producto}
                    setProducto={setProducto}
                    estado={estado}
                    setEstado={setEstado}
                    proveedor={proveedor}
                    setProveedor={setProveedor}
                    id={id}
                    setId={setId}
                    estadoEditar={estadoEditar}
                    setEstadoEditar={setEstadoEditar}
                    provs={provs}
                    setProvs={setProvs}
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productos;
