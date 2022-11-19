import React from 'react'
import { nanoid } from 'nanoid';
// import Moment from 'react-moment';
import moment from 'moment'

const ModalBoleta = ({idPedido, setIdPedido, pedidoRecetas, setPedidoRecetas, 
    pedidos, setPedidos, recetas, setRecetas}) => {

    
  return (
    <div>
        
        <div className="modal fade" id="myModalBoleta">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Boleta</h4>
              
              
            </div>
            <div className='modal-body'>
                  <h1>Folio de boleta: asdfsdsdasda</h1>
                  <p>Fecha de emision: 01/02/03</p>
                  <p>Encargado de pedido: asdfsdasdas</p>
                  <p>Monto total: $ 85000</p>

              </div>  
            

          
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalBoleta