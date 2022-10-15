import React from 'react'
import NavBarProductos from './NavBarProductos'

const Productos = () => {

    const [producto, setProducto] = React.useState([])
    const [cantidad, setCantidad] = React.useState([])
    const [productos, setProductos] = React.useState([])
    const [estadoModal, setEstadoModal] = React.useState(false)
    const [estadoEditar, setEstadoEditar] = React.useState(false)
    const [id, setId] = React.useState('')
    





    
        
      


    React.useEffect(() => {
        const obtenerProductos  = async () => {
            const data = await fetch('http://localhost:9000/api/producto')
            const users = await data.json()
            setProductos(users)
        }
            
        
    
        obtenerProductos()
      }, [])

      

      const cambiarEstadoModalTrue = () => {
        setEstadoModal(true)
        
        }

        const cambiarEstadoModalFalse = () => {
            setEstadoModal(false)
        }

        const editar = (item) => {
            setEstadoEditar(true)
            setProducto(item.nom_producto)
            setCantidad(item.stock_producto)
            setEstadoModal(true)
            setId(item.idProducto)

        }

        const agregarProducto = (e) => {
            e.preventDefault()
            //Validacion de datos
            if (!producto.trim()) {
                alert('Todos los campos son obligatorios')
                return
            }
            
            const requestInit = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    idProducto : id, nom_producto : producto, stock_producto : cantidad 
                })
            }
            fetch('http://localhost:9000/api/producto/', requestInit)
            .then(res => res.text())
            .then(res => console.log(res))

            

            
            
            const arrayAgregado = [...productos ,{id: id + 1,  nom_producto: producto, stock_producto: cantidad}]

            setProductos(arrayAgregado)
            
        }

    const eliminarProducto = id => {
        
        if(window.confirm()){
            const requestInit = {
                method: 'DELETE'
            }
            fetch('http://localhost:9000/api/producto/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
    
            const arrayEditado =  productos.filter((item) => item.idProducto !== id )
    
            setProductos(arrayEditado)
        }

        

        
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
    }

  return (
    <>
        <div className='container-fluid'>
        <div className='row flex-nowrap'>
            <NavBarProductos/>
            <div className='col py-3 ms-5'>
                
                
                <div>
                <h1 className='text-center mb-5'>Productos</h1>
                    {estadoModal ? (<div className='text-center mb-5'>
                        <button onClick={cambiarEstadoModalTrue} className='btn btn-success mb-3 d-none'>+ Agregar producto</button>
                    </div>) : (<div className='text-center mb-5'>
                        <button onClick={cambiarEstadoModalTrue} className='btn btn-success mb-3 '>+ Agregar producto</button>
                    </div>)}
                    
                
                    <ul className='list-group' >
                    {productos.map((item, index) => (
                        <div key={index} className='row col-12 mb-3 align-items-center justify-content-center'>

                        <li className='list-group-item me-3 col-3'>
                            Nombre del producto: {item.nom_producto}
                        </li>
                        <li className='list-group-item col-3 me-2'>
                            Cantidad en stock: {item.stock_producto} 
                        </li>
                        
                        
                        
                        <button onClick={() => editar(item)} className='col-1 btn btn-warning me-2 '>Editar</button>
                        <button onClick={() => eliminarProducto(item.idProducto)} className='col-1 btn btn-danger'>Eliminar</button>
                        </div>
                    ))}
                    </ul>
                </div>

                


                    {estadoModal ? (<div className="modal-body">
  {estadoEditar ? <h2>Editar producto</h2> :  <h2>Agregar producto</h2>}


  
  <form onSubmit={estadoEditar ? actualizarProducto : agregarProducto} className='col-6 text-center'>
    
   
    <input type="text" 
    placeholder='Ingresa nombre del producto'
    className='form-control mb-3'
    onChange={(e) => setProducto(e.target.value)}
    value={producto}
    />
    
    <input type="number" 
    placeholder='Ingresa cantidad de productos'
    className='form-control'
    onChange={(e) => setCantidad(e.target.value)}
    value={cantidad}
    />

    {estadoEditar ? 
    <button type='submit' className='btn btn-warning mt-3 me-3'>Editar</button> : 
    <button type='submit' className='btn btn-success mt-3 me-3'>Agregar</button>} 

   
    <button onClick={cambiarEstadoModalFalse} className='btn btn-danger mt-3'>Cancelar</button>
  </form>

  
  <hr/>
  
  
</div>

) : (<h1></h1>)}
            
                
            </div>
        </div>
        </div>
    <ul>

      
    </ul>


      
    </>
  )
}

export default Productos
