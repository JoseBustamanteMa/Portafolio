import React from 'react'
import Productos from '../Producto/Productos'
import FormularioProveedor from './FormularioProveedor'

const Proveedores = () => {

    const [provs, setProvs] = React.useState([])
    const [id, setId] = React.useState('')
    const [nombre, setNombre] = React.useState('')
    const [correo, setCorreo] = React.useState('')
    const [direccion, setDireccion] = React.useState('')
    const [telefono, setTelefono] = React.useState('')
    const [comuna, setComuna] = React.useState('')
    const [editarProv, setEditarProv] = React.useState(false)
    const [comunas, setComunas] = React.useState([])
    const [productos, setProductos] = React.useState([])
    

    

    React.useEffect(() => {
        const obtenerProveedores  = async () => {
            const data = await fetch('http://localhost:9000/api/proveedor')
            const proves = await data.json()
            setProvs(proves)
        }
        obtenerProveedores()

        
        const obtenerComunas = async () => {
            const data = await fetch('http://localhost:9000/api/comuna')
            const coms = await data.json()
            setComunas(coms)
        }
        obtenerComunas()

        const obtenerProductos  = async () => {
            const data = await fetch('http://localhost:9000/api/producto')
            const users = await data.json()
            setProductos(users)
        }
        obtenerProductos()
      }, [])


      const eliminarProveedor = id => {
        let existeId = ''

        productos.forEach(item => {
            if(id === item.id_proveedor){
                existeId = 'existe'
                return
            }
            

            
        })

        if(!existeId){
            if(window.confirm('¿Deseas eliminar el proveedor?')){
                const requestInit = {
                    method: 'DELETE'
                }
                fetch('http://localhost:9000/api/proveedor/' + id, requestInit)
                .then(res => res.text())
                .then(res => console.log(res))
    
                const arrayEliminado = provs.filter((item) => item.id_proveedor !== id)
    
                setProvs(arrayEliminado)
    
    
                
    
            }

            
        }
        if(existeId){
            alert('¡No puedes eliminar el proveedor, porque está asignado a un producto!')
        }

        
    }

    const editar = (item) => {
        setId(item.id_proveedor)
        setNombre(item.nom_proveedor)
        setCorreo(item.correo_prov)
        setTelefono(item.telefono_prov)
        setDireccion(item.direccion)
        setComuna(item.id_comuna)
        setEditarProv(true)
        
    }

  return (

    
    <div>
       
        <div>
            <FormularioProveedor 
            provs={provs} setProvs={setProvs}
            id={id} setId={setId}
            nombre={nombre} setNombre={setNombre}
            correo={correo} setCorreo={setCorreo}
            direccion={direccion} setDireccion={setDireccion}
            telefono={telefono} setTelefono={setTelefono}
            comuna={comuna} setComuna={setComuna}
            editarProv={editarProv} setEditarProv={setEditarProv}
            comunas={comunas} setComunas={setComunas}
            />
        </div>
        <div className='container'>
        <table className="table">
        <thead>
            <tr>
                <th>nombre proveedor</th>
                <th>Correo proveedor</th>
                <th>Telefono proovedor</th>
                <th>Comuna</th>
                
            </tr>
        </thead>
        {provs.map(item => (
            <tbody key={item.id_proveedor}>
            <tr>
                <td>{item.nom_proveedor}</td>
                <td>{item.correo_prov}</td>
                <td>{item.telefono_prov}</td>
                {comunas.map((com) => item.id_comuna === com.id_comuna && 
                <td key={com.id_comuna}>{com.nom_comuna}</td> )}
                <td className='col text-end'>
                <button  onClick={() => editar(item)} className='col-3 btn btn-warning me-2' data-bs-toggle="modal" data-bs-target="#myModal">Editar</button>
                <button  onClick={() => eliminarProveedor(item.id_proveedor)} className='col-3 btn btn-danger '>Eliminar</button>
                </td>
            </tr>
            
        </tbody>
        ))}
        
  </table>
        </div>
    </div>
  )
}

export default Proveedores