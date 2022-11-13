import React from 'react'
import { nanoid } from 'nanoid';



const FormularioPedidoRecetas = ({idReceta, setIdReceta, idPedido, setIdPedido, recetas, setRecetas, pedidoRecetas, setPedidoRecetas}) => {

    const agregarRecetaAPedido = (e) => {
        e.preventDefault();
    
        let existeReceta = ''
        pedidoRecetas.forEach(item => {
            if(item.id_pedido === idPedido && item.id_receta === idReceta){
                
                existeReceta = 'existe'
                return
            }
        })
    
        if(existeReceta){
            alert("El producto ya existe en la receta")
            return
        }
    
        if(!idReceta.trim()){
            alert("Elige una receta")
            return
        }
    
        if(!existeReceta){
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
    
        setPedidoRecetas(arrayAgregado);
    
        }
    
        
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