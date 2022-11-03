import React from 'react'
import FormularioMesa from './FormularioMesa'

const Mesas = () => {

    const [mesas, setMesas] = React.useState([])
    const [idMesa, setIdMesa] = React.useState('')
    const [minMesa, setMinMesa] = React.useState('')
    const [maxMesa, setMaxMesa] = React.useState('')
    const [editarMesa, setEditarMesa] = React.useState(false)

    React.useEffect(() => {
        const obtenerMesas  = async () => {
            const data = await fetch('http://localhost:9000/api/mesa')
            const mes = await data.json()
            setMesas(mes)
        }
            
        
    
        obtenerMesas()
      }, [])

      const eliminarMesa = id => {

        if(window.confirm()){
            const requestInit = {
                method: 'DELETE'
            }
            fetch('http://localhost:9000/api/mesa/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))

            const arrayEliminado = mesas.filter((item) => item.id_mesa !== id)

            setMesas(arrayEliminado)




        }
    }

    const editar = (item) => {
        setIdMesa(item.id_mesa)
        setMinMesa(item.cant_personas_min)
        setMaxMesa(item.cant_personas_max)
        setEditarMesa(true)
        
    }



  return (
    <div>

        <div>
            <FormularioMesa 
            mesas={mesas} setMesas={setMesas} 
            idMesa={idMesa} setIdMesa={setIdMesa} 
            minMesa={minMesa} setMinMesa={setMinMesa} 
            maxMesa={maxMesa}  setMaxMesa={setMaxMesa} 
            editarMesa={editarMesa} setEditarMesa={setEditarMesa}
            />
        </div>
        <div>
        <table className="table">
        <thead>
            <tr>
                <th>ID Mesa</th>
                <th>Personas minimo</th>
                <th>Personas maximo</th>
                <th></th>
            </tr>
        </thead>
        {mesas.map(item => (
            <tbody key={item.id_mesa}>
            <tr>
                <td>{item.id_mesa}</td>
                <td>{item.cant_personas_min}</td>
                <td>{item.cant_personas_max}</td>
                <td className='col text-end'>
                <button  onClick={() => editar(item)} className='col-3 btn btn-warning me-2' data-bs-toggle="modal" data-bs-target="#myModal">Editar</button>
                <button  onClick={() => eliminarMesa(item.id_mesa)} className='col-3 btn btn-danger '>Eliminar</button>
                </td>
            </tr>
            
        </tbody>
        ))}
        
  </table>
        </div>
    </div>
  )
}

export default Mesas