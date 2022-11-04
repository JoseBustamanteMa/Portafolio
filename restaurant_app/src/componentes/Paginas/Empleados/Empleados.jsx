import React from "react";
import FormularioEmpleado from "./FormularioEmpleado";
import ReactHtmlTableToExcel from "react-html-table-to-excel";

const Empleados = () => {
  const [idEmpleado, setIdEmpleado] = React.useState("");
  const [nomEmpleado, setNomEmpleado] = React.useState("");
  const [nom2Empleado, setNom2Empleado] = React.useState("");
  const [apPaterno, setApPaterno] = React.useState("");
  const [apMaterno, setApMaterno] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [comuna, setComuna] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  const [rol, setRol] = React.useState("");
  const [empleados, setEmpleados] = React.useState([]);
  const [comunas, setComunas] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [editarEmp, setEditarEmp] = React.useState(false);

  React.useEffect(() => {
    const obtenerEmpleados = async () => {
      const data = await fetch("http://localhost:9000/api/empleado");
      const resvs = await data.json();
      setEmpleados(resvs);
    };
    obtenerEmpleados();

    const obtenerComunas = async () => {
      const data = await fetch("http://localhost:9000/api/comuna");
      const coms = await data.json();
      setComunas(coms);
    };
    obtenerComunas();

    const obtenerRoles = async () => {
      const data = await fetch("http://localhost:9000/api/rol");
      const rols = await data.json();
      setRoles(rols);
    };
    obtenerRoles();
  }, []);

  const eliminarEmpleado = (id) => {
    if (window.confirm()) {
      const requestInit = {
        method: "DELETE",
      };
      fetch("http://localhost:9000/api/empleado/" + id, requestInit)
        .then((res) => res.text())
        .then((res) => console.log(res));

      const arrayEditado = empleados.filter((item) => item.id_empleado !== id);

      setEmpleados(arrayEditado);
    }
  };

  const editar = (item) => {
    setIdEmpleado(item.id_empleado);
    setNomEmpleado(item.nom_empleado);
    setNom2Empleado(item.nom2_empleado);
    setApPaterno(item.ap_paterno);
    setApMaterno(item.ap_materno);
    setDireccion(item.direccion);
    setComuna(item.id_comuna);
    setCorreo(item.correo_emp);
    setRol(item.id_rol);
    setEditarEmp(true);
  };
  return (
    <div>
      
      <div className="container box1">
        <hr/>
        <h1 className="text-center">
            Gestión de Empleados
        </h1>
        <table id="1" className="table col-12 table-dark table-responsive table-hover box align-middle">
          <thead>
            <tr className="align-middle">
              <th>Nombres empleado</th>
              <th>Apellidos</th>
              <th>Comuna</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>
              <div>
                <ReactHtmlTableToExcel
                id="btnExportExcelRol"
                table="1"
                className="btn btn-3"
                filename="Empleados"
                sheet="pagina 1"
                buttonText="Imp.Excel"/>
            </div>
              </th>
              
              
            </tr>
          </thead>
          {empleados.map((item) => (
            <tbody key={item.id_empleado}>
              <tr>
                <td>
                  {item.nom_empleado} {item.nom2_empleado}
                </td>
                <td>
                  {item.ap_paterno} {item.ap_materno}
                </td>
                {comunas.map(
                  (com) =>
                    item.id_comuna === com.id_comuna && (
                      <td key={com.id_comuna}>{com.nom_comuna}</td>
                    )
                )}
                <td>{item.correo_emp}</td>
                {roles.map(
                  (rols) =>
                    item.id_rol === rols.id_rol && (
                      <td key={rols.id_rol}>{rols.nom_rol}</td>
                    )
                )}
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
                    onClick={() => eliminarEmpleado(item.id_empleado)}
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
        <FormularioEmpleado
          idEmpleado={idEmpleado}
          setIdEmpleado={setIdEmpleado}
          nomEmpleado={nomEmpleado}
          setNomEmpleado={setNomEmpleado}
          nom2Empleado={nom2Empleado}
          setNom2Empleado={setNom2Empleado}
          apPaterno={apPaterno}
          setApPaterno={setApPaterno}
          apMaterno={apMaterno}
          setApMaterno={setApMaterno}
          direccion={direccion}
          setDireccion={setDireccion}
          comuna={comuna}
          setComuna={setComuna}
          correo={correo}
          setCorreo={setCorreo}
          rol={rol}
          setRol={setRol}
          empleados={empleados}
          setEmpleados={setEmpleados}
          editarEmp={editarEmp}
          setEditarEmp={setEditarEmp}
          comunas={comunas}
          setComunas={setComunas}
          roles={roles}
          setRoles={setRoles}
        />
      </div>
      <hr></hr>
      </div>
    </div>
  );
};

export default Empleados;
