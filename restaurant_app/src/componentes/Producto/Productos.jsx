import React from 'react'
import NavBarProductos from './NavBarProductos'
//import { nanoid } from 'nanoid'
import Formulario from './Formulario'

const Productos = () => {

    const [producto, setProducto] = React.useState([])
    const [cantidad, setCantidad] = React.useState([])
    const [productos, setProductos] = React.useState([])
    //const [estadoModal, setEstadoModal] = React.useState(false)
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

      

    //   const cambiarEstadoModalTrue = () => {
    //     setEstadoModal(true)
        
    //     }

    //     const cambiarEstadoModalFalse = () => {
    //         setEstadoModal(false)
    //     }

        const editar = (item) => {
            setEstadoEditar(true)
            setProducto(item.nom_producto)
            setCantidad(item.stock_producto)
            //setEstadoModal(true)
            setId(item.idProducto)
        
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
        

       
   

    

  return (
    <>  
        
        <div className='container-fluid'>
        <div className='row flex-nowrap'>
            <NavBarProductos/>
            <div className='col py-3 ms-5'>
                
                
                <div>
                <h1 className='text-center mb-5'>Productos</h1>

                <Formulario 
        productos={productos} setProductos={setProductos}
        producto={producto} setProducto={setProducto}
        cantidad={cantidad} setCantidad={setCantidad}
        id={id} setId={setId}
        estadoEditar={estadoEditar} setEstadoEditar={setEstadoEditar}
        />
    <div className='container col-12'> 
    <div className='col-10 text-center'>      
    <table className="table">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th></th>
            </tr>
        </thead>
        {productos.map(item => (
            <tbody key={item.idProducto}>
            <tr>
                <td>{item.nom_producto}</td>
                <td>{item.stock_producto}</td>
                <td className='col text-end'>
                <button onClick={() => editar(item)} className='col-3 btn btn-warning me-2' data-bs-toggle="modal" data-bs-target="#myModal">Editar</button>
                <button onClick={() => eliminarProducto(item.idProducto)} className='col-3 btn btn-danger '>Eliminar</button>
                </td>
            </tr>
            
        </tbody>
        ))}
        
  </table>
  </div> 
  </div>  
                </div>

                


                    <div className="modal-body">
  {/* {estadoEditar ? <h2>Editar producto</h2> :  <h2>Agregar producto</h2>} */}


  
 

  
  
  
  
</div>

            
                
            </div>
        </div>
        </div>
    <ul>

      
    </ul>


      
    </>
  )
}

export default Productos
