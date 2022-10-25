import React from 'react'
import { nanoid } from 'nanoid'
//import 'bootstrap/dist/css/bootstrap.css'
//import Productos from './Productos'


//class Formulario extends React.Component{

const Formulario = ({productos, setProductos, producto ,setProducto, cantidad, setCantidad,
id, setId, estadoEditar, setEstadoEditar}) => {

const [errorProducto, setErrorProducto] = React.useState(false)
const [errorCantidad, setErrorCantidad] = React.useState(false)
const [errorProductoNombre, setErrorProductoNombre] = React.useState(false)





//const [errores, setErrores] = React.useState([])
//const [cerrarModal, setCerrarModal] = React.useState(true)




  // const cambiarEstadosAlCerrarModal = () => {
  //   setEstadoEditar(false)
  //   setErrorCantidad(false)
  //   setErrorProducto(false)
    
  // }

  const onBlur = () => {
    
    let produ = ''
    productos.forEach(item => {
      if(item.nom_producto===producto){
        console.log(item.nom_producto)
        produ = item.nom_producto
        setErrorProductoNombre(true)
        
      }
      
    });
    if(!produ){
      console.log('estoy en el produ') 
      setErrorProductoNombre(false)
      
    }
    
    
  }
  console.log(errorProductoNombre)

 


  const agregarProducto = (e) => {
    e.preventDefault()

    
    

    //Validacion de datos

    if (!producto.trim()) {
      alert('Ingresa producto en agregar')
      setErrorProducto(true)
      
      
      return
    }
    
    setErrorProducto(false)

    if (!cantidad.trim()) {
      //alert('Ingresa cantidad')
      setErrorCantidad(true)
      
      
      return

    }
    
    setErrorCantidad(false)


    if(!errorProductoNombre){
      const randomId = nanoid(10)
     
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
    
    setErrorCantidad(false)
    setErrorProducto(false)
    setErrorProductoNombre(false)
    
    }
    
    
    
   
    
}




const actualizarProducto = (e) => {
  e.preventDefault()
  //Validacion de datos
  

  if (!producto.trim()) {
    //alert('Ingresa producto en agregar')
    setErrorProducto(true)
    
    
    return
  }
  
  setErrorProducto(false)

  const strCantidad = cantidad.toString()

  if (!strCantidad.trim()) {
    //alert('Ingresa cantidad')
    setErrorCantidad(true)
    
    return

  }

  //console.log(producto)


  if(!errorProductoNombre){
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
      setErrorProducto(false)
      setErrorCantidad(false)
      
  }

 
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
      {/* Alerta producto */}

      {errorProducto ? (<div className="alert alert-danger mx-1 mb-0" role="alert">
        ¡Debes ingresar un nombre!
      </div>) : <div></div>}
      {errorProductoNombre ? (<div className="alert alert-danger mx-1 mb-0" role="alert">
        ¡El producto ya existe!
      </div>) : <div></div>}
      
        <input type="text"
        placeholder='Nombre producto' 
        className='form-control mb-3 mt-3'
        onChange={(e) => setProducto(e.target.value)}
        value={producto}
        onBlur={onBlur}
        //required
       />


      {/* Alerta cantidad */}

      {errorCantidad ? <div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡Debes ingresar una cantidad!
        </div> : <div></div>}
        
        <input type="number"
        placeholder='Cantidad' 
        className='form-control mt-3'
        onChange={(e) => setCantidad(e.target.value)}
        value={cantidad}
        //required
        />
      </div>

      
      <div className="modal-footer">
        {estadoEditar ? <button type="submit" className="btn btn-warning">Editar</button> :
        <button onClick={() => setEstadoEditar(false)} type="submit" className="btn btn-success">Agregar</button>
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