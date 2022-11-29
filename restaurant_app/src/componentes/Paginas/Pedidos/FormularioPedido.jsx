import React from "react";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";

const FormularioPedido = ({
  idPedido,
  setIdPedido,
  idUsuario,
  setIdUsuario,
  idMesa,
  setIdMesa,
  valorTotal,
  setValorTotal,
  estado,
  setEstado,
  recetas,
  setRecetas,
  pedidos,
  setPedidos,
  mesas,
  setMesas,
  usuarios,
  setUsuarios,
  estadoEditar,
  setEstadoEditar
}) => {


  const [errorMesa, setErrorMesa] = React.useState(false)
  const [errorUsuario, setErrorUsuario] = React.useState(false)

  const agregarProducto = (e) => {
    e.preventDefault();

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

    const requestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_pedido: randomId,
        id_usuario: idUsuario,
        id_mesa: idMesa,
        valor_total: valorTotal,
        estado: estado,
      }),
    };
    fetch("http://localhost:9000/api/pedido/", requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    const arrayAgregado = [
      ...pedidos,
      {
        id_pedido: randomId,
        id_usuario: idUsuario,
        id_mesa: idMesa,
        valor_total: valorTotal,
        estado: estado,
      },
    ];

    setPedidos(arrayAgregado);
    Swal.fire({
      title: 'Agregado',
      text: 'Pedido agregado correctamente',
      icon: 'success',
      showDenyButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer:1500


    })
    

    limpiarCasillas()
  };

  const actualizarPedido = (e) => {
    e.preventDefault();

    if(!idMesa.trim()){
      alert('Debes agregar una mesa')
      setErrorMesa(true)
      return
    }
    setErrorMesa(false)

    if(!idUsuario.trim()){
      alert('Debes ingresar un usuario')
      setErrorUsuario(true)
      return
    }
    setErrorUsuario(false)

    const requestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_pedido: idPedido,
        id_usuario: idUsuario,
        id_mesa: idMesa,
        valor_total: valorTotal,
        estado: estado,
      }),
    };
    fetch("http://localhost:9000/api/pedido/" + idPedido, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    const arrayEditado = pedidos.map((item) =>
      item.id_pedido === idPedido
        ? {
          id_pedido: idPedido,
          id_usuario: idUsuario,
          id_mesa: idMesa,
          valor_total: valorTotal,
          estado: estado,
          }
        : item
    );

    Swal.fire({
      title: 'Actualizado',
      text: 'Pedido actualizado correctamente',
      icon: 'success',
      showDenyButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer:1500


    })

    setPedidos(arrayEditado);
    

    limpiarCasillas()
  };

  const limpiarCasillas = () => {
    setIdPedido('')
    setIdUsuario('')
    setIdMesa('')
    setValorTotal(0)
    setEstadoEditar(false)
    setErrorMesa(false)
    setErrorUsuario(false)
  }

  return (
    <div>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{estadoEditar ? "Editar pedido" : "Agregar pedido"}</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form onSubmit={estadoEditar ?  actualizarPedido : agregarProducto}>
              <div className="modal-body">
                {errorMesa && 
                <div className="alert alert-danger mx-1 mb-0" role="alert">
                  <p>¡Debes ingresar una mesa!</p>
                </div>}
                <select
                  onChange={(e) => setIdMesa(e.target.value)}
                  name="mesas"
                  className="form-control mt-3"
                >
                  <option value={""}>Elige una mesa</option>
                  {mesas.map((item) => (
                    <option key={item.id_mesa} value={item.id_mesa}>
                      {item.id_mesa}
                    </option>
                  ))}
                </select>
                {errorUsuario && 
                <div className="alert alert-danger mx-1 mb-0" role="alert">
                  <p>¡Debes ingresar un usuario!</p>
                </div>}
                <select
                  onChange={(e) => setIdUsuario(e.target.value)}
                  name="usuarios"
                  className="form-control mt-3"
                >
                    <option value="">Elige un usuario...</option>
                  {usuarios.map((u) => (
                    <option key={u.id_usuario} value={u.id_usuario}>
                      {u.nom_usuario}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-footer">
                {estadoEditar ? <button type="submit" className="btn btn-warning">
                  Modificar pedido
                </button> : <button type="submit" className="btn btn-success">
                  Confirmar pedido
                </button>}
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={limpiarCasillas}
                >
                  Cerrar
                </button>
              </div>
            </form>

            <form>
              {/* <select
                onChange={(e) => setProducto(e.target.value)}
                name="productos"
                className="form-control mt-3"
              >
                <option value={""}>Elige un producto</option>
                {productos.map((item) => (
                  <option key={item.id_producto} value={item.id_producto}>
                    {item.nom_producto}
                  </option>
                ))}
              </select> */}

              {/* <button className="btn btn-success">Agregar producto</button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioPedido;
