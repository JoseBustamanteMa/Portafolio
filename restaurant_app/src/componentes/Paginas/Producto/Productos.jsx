import React from 'react'
//import { nanoid } from 'nanoid'
import FormularioProducto from './FormularioProducto'

const Productos = () => {

    const [producto, setProducto] = React.useState('')
    const [cantidad, setCantidad] = React.useState('')
    const [proveedor, setProveedor] = React.useState('')
    const [productos, setProductos] = React.useState([])
    //const [estadoModal, setEstadoModal] = React.useState(false)
    const [estadoEditar, setEstadoEditar] = React.useState(false)
    const [id, setId] = React.useState('')
    const [provs, setProvs] = React.useState([])
    





    
        
      


    React.useEffect(() => {
        const obtenerProductos  = async () => {
            const data = await fetch('http://localhost:9000/api/producto')
            const users = await data.json()
            setProductos(users)
        }
            
        
    
        obtenerProductos()

        const obtenerProveedores = async () => {
            const data = await fetch('http://localhost:9000/api/proveedor')
            const coms = await data.json()
            setProvs(coms)
        }
        obtenerProveedores()
      }, [])

      

        const editar = (item) => {
            setEstadoEditar(true)
            setProducto(item.nom_producto)
            setCantidad(item.cantidad)
            setProveedor(item.id_proveedor)
            setId(item.id_producto)
        
        }

        const eliminarProducto = id => {

            if(window.confirm()){
                const requestInit = {
                    method: 'DELETE'
                }
                fetch('http://localhost:9000/api/producto/' + id, requestInit)
                .then(res => res.text())
                .then(res => console.log(res))
    
                const arrayEditado =  productos.filter((item) => item.id_producto !== id )
    
                setProductos(arrayEditado)
            }
        }
        

       
   

    

  return (
    <>  
        
        <div className='container-fluid'>
        <div className='row flex-nowrap'>
            <div className='col py-3 ms-5'>
                <div>
                <h1 className='text-center mb-5'>Productos</h1>

                <FormularioProducto 
        productos={productos} setProductos={setProductos}
        producto={producto} setProducto={setProducto}
        cantidad={cantidad} setCantidad={setCantidad}
        proveedor={proveedor} setProveedor={setProveedor}
        id={id} setId={setId}
        estadoEditar={estadoEditar} setEstadoEditar={setEstadoEditar}
        provs={provs} setProvs={setProvs}
        />
    <div className='container col-12'> 
    <div className='col-10 text-center'>      
    <table className="table">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Proveedor</th>
                <th></th>

            </tr>
        </thead>
        {productos.map(item => (
            <tbody key={item.id_producto}>
            <tr>
                <td>{item.nom_producto}</td>
                <td>{item.cantidad}</td>
                {provs.map((prov) => (
                    item.id_proveedor === prov.id_proveedor && <td key={prov.id_proveedor}>{prov.nom_proveedor}</td> 
                ))}
                {/* <td>{item.id_proveedor}</td> */}
                <td className='col text-end'>
                <button onClick={() => editar(item)} className='col-3 btn btn-warning me-2' data-bs-toggle="modal" data-bs-target="#myModal">Editar</button>
                <button onClick={() => eliminarProducto(item.id_producto)} className='col-3 btn btn-danger '>Eliminar</button>
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
