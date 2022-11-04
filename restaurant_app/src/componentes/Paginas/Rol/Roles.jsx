import React from "react";
import FormularioRol from "./FormularioRol";
import "./Roles.css";

const Roles = () => {
  const [rol, setRol] = React.useState("");
  const [idRol, setIdRol] = React.useState("");
  const [roles, setRoles] = React.useState([]);
  const [editarRol, setEditarRol] = React.useState(false);

  React.useEffect(() => {
    const obtenerRoles = async () => {
      const data = await fetch("http://localhost:9000/api/rol");
      const rols = await data.json();
      setRoles(rols);
    };
    obtenerRoles();
  }, []);

  const eliminarRol = (id) => {
    if (window.confirm("¿Desea Eliminar?")) {
      const requestInit = {
        method: "DELETE",
      };
      fetch("http://localhost:9000/api/rol/" + id, requestInit)
        .then((res) => res.text())
        .then((res) => console.log(res));
      const arrayEliminado = roles.filter((item) => item.id_rol !== id);

      setRoles(arrayEliminado);
    }
  };
  const editar = (item) => {
    setEditarRol(true);
    setIdRol(item.id_rol);
    setRol(item.nom_rol);
  };
  return (
    <div className="container col-12">
      <div className="container box1">
        <hr/>
        <h1 className="container text-center">Gestión de Roles</h1>
        <div className="container">
          <table className="table col-12 table-dark table-responsive table-hover box align-middle">
            <thead>
              <tr>
                <th>Id </th>
                <th>Rol</th>
                <th></th>
              </tr>
            </thead>
            {roles.map((item) => (
              <tbody className="container col-12" key={item.id_rol}>
                <tr className="align-middle">
                  <td className="col-1">{item.id_rol}</td>
                  <td className="col-4">{item.nom_rol}</td>
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
                      onClick={() => eliminarRol(item.id_rol)}
                      className="btn btn-2"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>

          <div className="col-12">
            <FormularioRol
              rol={rol}
              setRol={setRol}
              idRol={idRol}
              setIdRol={setIdRol}
              roles={roles}
              setRoles={setRoles}
              editarRol={editarRol}
              setEditarRol={setEditarRol}
              editar={editar}
            />
          </div>
          <hr></hr>
        </div>
      </div>
    </div>
  );
};
export default Roles;
