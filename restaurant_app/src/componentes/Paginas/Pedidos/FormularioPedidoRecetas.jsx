import React from 'react'
import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';
import Boletas from '../Boletas/Boletas';



const FormularioPedidoRecetas = ({idReceta, setIdReceta, idPedido, setIdPedido, recetas, setRecetas, 
  pedidoRecetas, setPedidoRecetas, pedidos, setPedidos, idUsuario,
  setIdUsuario,
  idMesa,
  setIdMesa,
  valorTotal,
  setValorTotal,
  estado,
  setEstado,
boletas,
setBoletas}) => {

    

    const agregarRecetaAPedido = (e) => {
        e.preventDefault();
    
        // let existeReceta = ''
        // pedidoRecetas.forEach(item => {
        //     if(item.id_pedido === idPedido && item.id_receta === idReceta){
                
        //         existeReceta = 'existe'
        //         return
        //     }
        // })
    
        // if(existeReceta){
        //     alert("El producto ya existe en la receta")
        //     return
        // }

        let existePedidoEnBoleta = ''
        
        pedidoRecetas.forEach(pr => {
          if(pr.id_pedido === idPedido){
            boletas.forEach(bl => {
              if(pr.id_pedido === bl.id_pedido){
                existePedidoEnBoleta = pr.id_pedido
              }
              
            })
          }
        })


        if(existePedidoEnBoleta){
          Swal.fire({
            title: 'Advertencia',
            text: 'Este pedido ya cuenta con una boleta, no puede ser modificado',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000
          })
        }

        if(!existePedidoEnBoleta)

        {if(!idReceta.trim()){
            Swal.fire({
              title: 'Advertencia',
              text: 'Debes elegir una receta',
              icon: 'warning',
              timer: 2000,
              showConfirmButton: false
            })
            return
        }
    
        // if(!existeReceta){
            const randomId = nanoid(10);
    
        const requestInit = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_ped_recetas: randomId,
            id_pedido: idPedido,
            id_receta: idReceta,
          }),
        };
        fetch("http://localhost:9000/api/pedido-recetas/", requestInit)
          .then((res) => res.text())
          .then((res) => console.log(res));
    
        const arrayAgregado = [
          ...pedidoRecetas,
          { id_ped_recetas: randomId,
            id_pedido: idPedido,
            id_receta: idReceta, },
        ];
    
        setPedidoRecetas(arrayAgregado);}
    
        // }

        

        //INICIO DE FUNCION PARA CALCULAR VALOR TOTAL
    //     let contador = 0
    //     pedidoRecetas.forEach(item => {
    //       if(item.id_pedido === idPedido){
    //         console.log("Existe")
    //       }
    //      if(item.id_pedido !== idPedido){
    //       console.log("No existe")
    //      }
    // })

    // console.log(contador)

    // const requestInit = {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     id_pedido: idPedido,
    //     id_usuario: idUsuario,
    //     id_mesa: idMesa,
    //     valor_total: contador,
    //     estado: estado,
    //   }),
    // };
    // fetch("http://localhost:9000/api/pedido/" + idPedido, requestInit)
    //   .then((res) => res.text())
    //   .then((res) => console.log(res));

    //   const arrayEditado = pedidos.map((item) =>
    //   item.id_pedido === idPedido
    //     ? {
    //       id_pedido: idPedido,
    //       id_usuario: idUsuario,
    //       id_mesa: idMesa,
    //       valor_total: contador,
    //       estado: estado,
    //       }
    //     : item
    // );

    // setPedidos(arrayEditado)
    
        
      };

      


      
  return (
    <div>
        <form onSubmit={agregarRecetaAPedido} className="row">
                <div className="col-6 mt-2">

                  <select  onChange={(e) => setIdReceta(e.target.value)} className="form-select" name="" id="">
                    <option value="">Selecciona una receta</option>
                    {recetas.map((r) => (
                        <option key={r.id_receta} value={r.id_receta}>{r.nom_receta}</option>
                    ))}
                    
                    
                  </select>
                  </div>
                  
                  <div className="col-5"> <button type="submit" className="btn btn-success mx-auto">+</button></div>
                 
                </form>
    </div>
  )
}

export default FormularioPedidoRecetas