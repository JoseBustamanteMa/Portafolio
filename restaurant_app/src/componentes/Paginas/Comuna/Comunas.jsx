import React from 'react'
import FormularioComuna from './FormularioComuna'

const Comunas = () => {


    const [comunas, setComunas] = React.useState([])
    const [idComuna, setIdComuna] = React.useState('')
    const [comuna, setComuna] = React.useState('')
    const [editarComuna, setEditarComuna] = React.useState(false)


    React.useEffect(() => {
        const obtenerComunas  = async () => {
            const data = await fetch('http://localhost:9000/api/comuna')
            const coms = await data.json()
            setComunas(coms)
        }
            
        
    
        obtenerComunas()
      }, [])

      const eliminarComuna = id => {

        if(window.confirm()){
            const requestInit = {
                method: 'DELETE'
            }
            fetch('http://localhost:9000/api/comuna/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))

            const arrayEliminado = comunas.filter((item) => item.id_comuna !== id)

            setComunas(arrayEliminado)




        }
    }

    const editar = (item) => {
        setIdComuna(item.id_comuna)
        setComuna(item.nom_comuna)
        setEditarComuna(true)
        
    }

    
  return (
    <div>
        
        <div>
            <FormularioComuna 
            comunas={comunas} setComunas={setComunas}
            idComuna={idComuna} setIdComuna={setIdComuna}
            comuna={comuna} setComuna={setComuna}
            editarComuna={editarComuna} setEditarComuna={setEditarComuna}

            />
        </div>

        <div>
        <table className="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Comuna</th>
                <th></th>
            </tr>
        </thead>
        {comunas.map(item => (
            <tbody key={item.id_comuna}>
            <tr>
                <td>{item.id_comuna}</td>
                <td>{item.nom_comuna}</td>
                <td className='col text-end'>
                <button  onClick={() => editar(item)} className='col-3 btn btn-warning me-2' data-bs-toggle="modal" data-bs-target="#myModal">Editar</button>
                <button  onClick={() => eliminarComuna(item.id_comuna)} className='col-3 btn btn-danger '>Eliminar</button>
                </td>
            </tr>
            
        </tbody>
        ))}
        
  </table>
        </div>
    </div>
  )
}

export default Comunas