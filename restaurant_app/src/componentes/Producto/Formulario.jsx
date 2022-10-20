import React from 'react'
import { nanoid } from 'nanoid'
import 'bootstrap/dist/css/bootstrap.css'
//import Productos from './Productos'

//class Formulario extends React.Component{

const Formulario = ({productos, setProductos, producto ,setProducto, cantidad, setCantidad,
id, setId, estadoEditar, setEstadoEditar}) => {




 


  const agregarProducto = (e) => {
    e.preventDefault()

    const randomId = nanoid(10)

    //Validacion de datos
    if (!producto.trim()) {
        alert('Todos los campos son obligatorios')
        return
    }
    
    const requestInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            idProducto : randomId, nom_producto : producto, stock_producto : cantidad 
        })
    }
    fetch('http://localhost:9000/api/producto/', requestInit)
    .then(res => res.text())
    .then(res => console.log(res))

    

    
    
    const arrayAgregado = [...productos ,{idProducto: randomId,  nom_producto: producto, stock_producto: cantidad}]

    setProductos(arrayAgregado)
    setProducto('')
    setCantidad('')
    
}

const actualizarProducto = (e) => {
  e.preventDefault()
  //Validacion de datos
  if (!producto.trim()) {
      alert('Todos los campos son obligatorios')
      return
  }
  console.log(producto)
  const requestInit = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          idProducto : id, nom_producto : producto, stock_producto : cantidad 
      })
  }
  fetch('http://localhost:9000/api/producto/' + id, requestInit)
  .then(res => res.text())
  .then(res => console.log(res))


  const arrayEditado = productos.map((item) => item.idProducto === id ? 
  {idProducto : id, nom_producto: producto, stock_producto: cantidad} : item)

  setProductos(arrayEditado)
  setEstadoEditar(false)
  setProducto('')
  setCantidad('')
}

  
   

 
    return (
    <>


{estadoEditar ?
<div>
<button type="button" className="btn btn-primary text-center d-none" data-bs-toggle="modal" data-bs-target="#myModal">
    <h3>Actualizar producto</h3>
</button> 
</div> : 
<div className='text-center'>
<button type="button" className="btn btn-success text-center mb-5" data-bs-toggle="modal" data-bs-target="#myModal">
    <h4>+ Agregar producto</h4>
</button>
</div>
}





<div className="modal fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">

      
      <div className="modal-header">
        <h4 className="modal-title">{estadoEditar ? "Editar producto" : "Agregar producto"}</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form onSubmit={estadoEditar ? actualizarProducto : agregarProducto}>

      
      <div className="modal-body">
        <input type="text"
        placeholder='Nombre producto' 
        className='form-control mb-3'
        onChange={(e) => setProducto(e.target.value)}
        value={producto}/>


        <input type="number"
        placeholder='Cantidad' 
        className='form-control mt-3'
        onChange={(e) => setCantidad(e.target.value)}
        value={cantidad}/>
      </div>

      
      <div className="modal-footer">
        {estadoEditar ? <button type="submit" className="btn btn-warning" data-bs-dismiss="modal">Editar</button> :
        <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Agregar</button>
        }

        
        <button onClick={() => setEstadoEditar(false)} type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
      </div>
      </form>

    </div>
  </div>
</div>


    
    
    
    
    </>
      )

  }
  


export default Formulario