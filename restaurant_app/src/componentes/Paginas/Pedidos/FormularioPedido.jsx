import React from "react";
import { nanoid } from "nanoid";

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
}) => {
  const agregarProducto = (e) => {
    e.preventDefault();

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
        id_mesa: idMesa,
        valor_total: valorTotal,
        estado: estado,
      },
    ];

    setPedidos(arrayAgregado);
  };

  return (
    <div>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Agregar pedido</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form onSubmit={agregarProducto}>
              <div className="modal-body">
                <select
                  onChange={(e) => setIdMesa(e.target.value)}
                  name="mesas"
                  className="form-control mt-3"
                >
                  <option value={""}>Elige un producto</option>
                  {mesas.map((item) => (
                    <option key={item.id_mesa} value={item.id_mesa}>
                      {item.id_mesa}
                    </option>
                  ))}
                </select>

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
                <button type="submit" className="btn btn-success">
                  Confirmar pedido
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
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
