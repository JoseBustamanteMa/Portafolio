import React from 'react'
import { PedidosContext } from '../context/PedidoProvider'
import Swal from 'sweetalert2'

const PedidosCocina = () => {

  // const [estado, setEstado] = React.useState(false)

  // const { pedidos, setPedidos, recetas, setRecetas, pedidoRecetas, setPedidoRecetas } = React.useContext(PedidosContext)

  const [recetas, setRecetas] = React.useState([]);
    const [pedidos, setPedidos] = React.useState([]);
    const [pedidoRecetas, setPedidoRecetas] = React.useState([]);
    const [mesas, setMesas] = React.useState([]);
    const [usuarios, setUsuarios] = React.useState([]);
    const [boletas, setBoletas] = React.useState([]);


  React.useEffect(() => {
    const obtenerPedidos = async () => {
      const data = await fetch("http://localhost:9000/api/pedido");
      const ped = await data.json();
      setPedidos(ped);
    };
    obtenerPedidos();


    const obtenerRecetas = async () => {
      const data = await fetch("http://localhost:9000/api/receta");
      const rec = await data.json();
      setRecetas(rec);
    };

    obtenerRecetas();


    const obtenerPedidoRecetas = async () => {
      const data = await fetch("http://localhost:9000/api/pedido-recetas");
      const pr = await data.json();
      setPedidoRecetas(pr);
    };
    obtenerPedidoRecetas();

  }, [])



  const cambiarEstado = (p) => {

    let estado = 0

    if (p.estado === 1) {
      estado = 0
    }

    if (p.estado === 0) {
      estado = 1
    }

    const requestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_pedido: p.id_pedido,
        id_usuario: p.id_usuario,
        id_mesa: p.id_mesa,
        valor_total: p.valor_total,
        estado: estado

      }),
    };
    fetch("http://localhost:9000/api/pedido/" + p.id_pedido, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    const arrayEditado = pedidos.map((item) =>
      item.id_pedido === p.id_pedido
        ? {
          id_pedido: p.id_pedido,
          id_usuario: p.id_usuario,
          id_mesa: p.id_mesa,
          valor_total: p.valor_total,
          estado: estado
        }
        : item
    );

    setPedidos(arrayEditado)

    console.log(estado)

    if (estado === 1) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: '¡Pedido listo!'
      })
    }

    if (estado === 0) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'warning',
        title: '¡Pedido devuelto!'
      })
    }


  };

  return (

    <div className="container box1">
      <div className="col-12">
        <hr />
        <h1 className="text-center">Pedidos</h1>
        <div className="container col-12 align-middle">

          <div className="container">


            <table className='table col-12 table-dark box'>
              <thead>
                <tr>
                  <th className='col-6'> En Espera</th>
                  <th className='col-6'> Terminado</th>
                </tr>
              </thead>
              <tbody>
                <tr>



                  <td className='col-6'>{pedidos.map((p) => (
                    p.estado == 0 &&
                    <table className='table table-success  table-hover box align-middle '>
                      <thead>

                        <th className='col-9'></th>
                        <th className='col-3'></th>

                      </thead>


                      <tbody>
                        <tr>
                          <td className=''>
                            {pedidoRecetas.map((pr) => (
                              p.id_pedido === pr.id_pedido &&
                              recetas.map((r) => (
                                pr.id_receta === r.id_receta &&
                                <li className=''>{r.nom_receta}</li>
                              ))
                            ))}
                          </td>
                          <td>

                            <button onClick={() => cambiarEstado(p)} className='btn btn-secondary'>{p.estado ? 'Listo' : 'En proceso'}</button>
                          </td>
                        </tr>
                      </tbody>




                    </table>))}
                  </td>

                  <td className='col-6'>
                    {pedidos.map((p) => (
                      p.estado == 1 &&
                      <table className='table table-success  table-hover box align-middle '>
                        <thead>

                          <th className='col-9'></th>
                          <th className='col-3'></th>

                        </thead>


                        <tbody>
                          <tr>
                            <td className=''>
                              {pedidoRecetas.map((pr) => (
                                p.id_pedido === pr.id_pedido &&
                                recetas.map((r) => (
                                  pr.id_receta === r.id_receta &&
                                  <li className=''>{r.nom_receta}</li>
                                ))
                              ))}
                            </td>
                            <td>

                              <button onClick={() => cambiarEstado(p)} className='btn btn-success'>{p.estado ? 'Listo' : 'En proceso'}</button>
                            </td>
                          </tr>
                        </tbody>

                      </table>))}
                  </td>
                </tr>
              </tbody>
            </table>


            <br />
          </div>
        </div>
      </div>
    </div >

  )
}

export default PedidosCocina