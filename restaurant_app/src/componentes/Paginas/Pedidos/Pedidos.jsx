import React from "react";
import FormularioPedido from "./FormularioPedido";
import FormularioPedidoRecetas from "./FormularioPedidoRecetas";

const Pedidos = () => {
  const [idPedido, setIdPedido] = React.useState("");
  const [idUsuario, setIdUsuario] = React.useState("");
  const [idReceta, setIdReceta] = React.useState("");
  const [idMesa, setIdMesa] = React.useState("");
  const [valorTotal, setValorTotal] = React.useState(0);
  const [estado, setEstado] = React.useState(false);


  const [recetas, setRecetas] = React.useState([]);
  const [pedidos, setPedidos] = React.useState([]);
  const [pedidoRecetas, setPedidoRecetas] = React.useState([]);
  const [mesas, setMesas] = React.useState([]);
  const [usuarios, setUsuarios] = React.useState([]);

  React.useEffect(() => {
    const obtenerRecetas = async () => {
      const data = await fetch("http://localhost:9000/api/receta");
      const rec = await data.json();
      setRecetas(rec);
    };

    obtenerRecetas();

    const obtenerPedidos = async () => {
      const data = await fetch("http://localhost:9000/api/pedido");
      const ped = await data.json();
      setPedidos(ped);
    };
    obtenerPedidos();

    const obtenerPedidoRecetas = async () => {
      const data = await fetch("http://localhost:9000/api/pedido-recetas");
      const pr = await data.json();
      setPedidoRecetas(pr);
    };
    obtenerPedidoRecetas();

    const obtenerMesas = async () => {
        const data = await fetch("http://localhost:9000/api/mesa");
        const mes = await data.json();
        setMesas(mes);
      };
      obtenerMesas();

      const obtenerUsuarios = async () => {
        const data = await fetch("http://localhost:9000/api/usuario");
        const usu = await data.json();
        setUsuarios(usu);
      };
      obtenerUsuarios();
  }, []);

  const eliminarRecetaDePedido = (idRec, idPed) => {
    let idPedRec = "";
    pedidoRecetas.forEach((item) => {
      if (item.id_receta === idRec && item.id_pedido === idPed) {
        idPedRec = item.id_ped_recetas;
      }
    });

    if (idPedRec) {
      if (window.confirm("¿Deseas eliminar la receta del pedido?")) {
        const requestInit = {
          method: "DELETE",
        };
        fetch(
          "http://localhost:9000/api/pedido-recetas/" + idPedRec,
          requestInit
        )
          .then((res) => res.text())
          .then((res) => console.log(res));

        const arrayEditado = pedidoRecetas.filter(
          (item) => item.id_ped_recetas !== idPedRec
        );

        setPedidoRecetas(arrayEditado);
      }
    }
  };

  
  return (
    <div className="container">
       
        <FormularioPedido
        idPedido={idPedido} setIdPedido={setIdPedido}
        idUsuario={idUsuario} setIdUsuario={setIdUsuario}
        idMesa={idMesa} setIdMesa={setIdMesa}
        valorTotal={valorTotal} setValorTotal={setValorTotal}
        estado={estado} setEstado={setEstado}
        recetas={recetas} setRecetas={setRecetas}
        pedidos={pedidos} setPedidos={setPedidos}
        mesas={mesas} setMesas={setMesas}
        usuarios={usuarios} setUsuarios={setUsuarios}
        
        />
      <h1 className="text-center">Pedidos</h1>
      <div>
        <div className="mt-5">
        <button
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                >
                  Agregar receta
                </button>
          {pedidos.map((p) => (
            <div key={p.id_pedido} className="card container">
              <div className="mb-5 row mt-3">
                <h1 className="mb-5 col-9">
                  Folio del pedido: {p.id_pedido}
                </h1>
                
                <div onClick={() => setIdPedido(p.id_pedido)} className="col-3 row">
                  {/* Acá va el formulario de pedidoRecetas */}
                
                  <FormularioPedidoRecetas 
                  idReceta={idReceta} setIdReceta={setIdReceta}
                  idPedido={idPedido} setIdPedido={setIdPedido}
                  recetas={recetas} setRecetas={setRecetas}
                  pedidoRecetas={pedidoRecetas} setPedidoRecetas={setPedidoRecetas}/>

                
                
                {/* Acá termina el formulario de pedidoRecetas */}
              </div>
              <h3>Mesa: {p.id_mesa} - {usuarios.map((u) => (
                    u.id_usuario === p.id_usuario ? <div key={u.id_usuario}>Usuario: {u.nom_usuario}</div>  : "Sin usuario asignado"
                  ))}</h3>
              </div>
              

              

              {pedidoRecetas.map((pr) => (
                <div key={pr.id_ped_recetas}>

                  {p.id_pedido === pr.id_pedido && 
                    <div>
                        {recetas.map((r) => (
                    <div key={r.id_receta} className="">
                      {pr.id_receta === r.id_receta && (
                        <div className="row">
                          <li className="list-group-item text-center col-6 mx-auto my-2">
                            <div className="row">
                              <div className="col-6">
                                {r.nom_receta} - {r.precio_receta}
                              </div>

                              <div className="col-6 ms-auto">
                                <button
                                  onClick={() =>
                                    eliminarRecetaDePedido(
                                      r.id_receta,
                                      p.id_pedido
                                    )
                                  }
                                  className="btn btn-danger "
                                >
                                  Eliminar
                                </button>
                              </div>

                              <div></div>
                            </div>
                          </li>
                        </div>
                      )}
                    </div>
                  ))}
                    </div>}
                  
                </div>
              ))}

              <div className="container">
                <p>Valor total: {p.valor_total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
