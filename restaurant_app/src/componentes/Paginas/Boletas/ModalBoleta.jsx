import React from 'react'
import { nanoid } from 'nanoid';
// import Moment from 'react-moment';
import moment from 'moment'

const ModalBoleta = ({idBoleta, setIBoleta, totalPagar, setTotalPagar, fechaBoleta, setFechaBoleta,
  idUsuario, setIdUsuario
  // ,pedidoRecetas, setPedidoRecetas, 
  //   pedidos, setPedidos, recetas, setRecetas
  }) => {

    
  return (
    <div>

      
        
        <div className="modal fade" id="myModalBoleta">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title mx-auto">Boleta</h4>
              
              
            </div>
            <div className='modal-body'>
                  <h1>Folio de boleta: {idBoleta}</h1>
                  <p>Fecha de emision: {fechaBoleta}</p>
                  <p>Encargado de pedido: {idUsuario}</p>
                  <p>Monto total: $ {totalPagar}</p>

              </div>  
            

          
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalBoleta