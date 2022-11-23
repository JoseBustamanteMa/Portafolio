import React from 'react'
import {PedidosContext} from '../context/PedidoProvider'
import Swal from 'sweetalert2'

const PedidosCocina = () => {

    // const [estado, setEstado] = React.useState(false)

    const {pedidos, setPedidos, recetas, setRecetas, pedidoRecetas, setPedidoRecetas} = React.useContext(PedidosContext)
    

        React.useEffect( () => {
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

        },[])

        
   
   const cambiarEstado = (p) => {

    let estado = 0
    
    if(p.estado === 1){
        estado = 0
      }

    if(p.estado === 0){
        estado = 1
     }
    
      const requestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_pedido: p.id_pedido,
          id_usuario : p.id_usuario,
          id_mesa : p.id_mesa,
          valor_total: p.valor_total,
          estado: estado

        }),
      };
      fetch("http://localhost:9000/api/pedido/" + p.id_pedido , requestInit)
        .then((res) => res.text())
        .then((res) => console.log(res));

      const arrayEditado = pedidos.map((item) =>
        item.id_pedido === p.id_pedido
          ? {
            id_pedido: p.id_pedido,
            id_usuario : p.id_usuario,
            id_mesa : p.id_mesa,
            valor_total: p.valor_total,
            estado: estado
            }
          : item
      );

        setPedidos(arrayEditado)

      console.log(estado)

      if(estado === 1){
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

    if(estado === 0){
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
    <div className='container mt-5 mb-5'>

       


        <div className='row col-12 '>
            <h1 className='text-center mb-5 bg-secondary text-white'>Pedidos en espera</h1>
        {pedidos.map((p) => (
                p.estado === 0 &&
                <div className='card col-3 me-1 mb-5 border-secondary'> 
                    <div className='card-body'>
                        <div className='card-title'>
                            <button onClick={() => cambiarEstado(p)} className='btn btn-secondary'>{p.estado ? 'Listo' : 'En proceso'}</button>
                        </div>
                        
                        

                        <div className='card-text'>
                            {pedidoRecetas.map((pr) => (
                                p.id_pedido === pr.id_pedido &&
                                <div>
                                    
                                <ul>
                                    {recetas.map((r) => (
                                        pr.id_receta === r.id_receta && 
                                        <li className='list-group-item'>{r.nom_receta}</li>
                                    ))}
                                </ul>
                                </div> 
                                
                            ))}
                        </div>
                    </div>
                </div>
                ))}
            </div>

            <div className='row col-12 '>
            <h1 className='text-center mb-5 bg-success'>Pedidos listos</h1>
        {pedidos.map((p) => (
                p.estado === 1 &&
                <div className='card col-3 me-1 mb-5 border-secondary'> 
                    <div className='card-body'>
                        <div className='card-title'>
                            <button onClick={() => cambiarEstado(p)} className='btn btn-success'>{p.estado ? 'Listo' : 'En proceso'}</button>
                        </div>
                        

                        <div className='card-text'>
                            {pedidoRecetas.map((pr) => (
                                p.id_pedido === pr.id_pedido &&
                                <div>
                                    
                                <ul>
                                    {recetas.map((r) => (
                                        pr.id_receta === r.id_receta && 
                                        <li className='list-group-item'>{r.nom_receta}</li>
                                    ))}
                                </ul>
                                </div> 
                                
                            ))}
                        </div>
                    </div>
                </div>
                ))}
            </div>
        
    </div>
  )
}

export default PedidosCocina