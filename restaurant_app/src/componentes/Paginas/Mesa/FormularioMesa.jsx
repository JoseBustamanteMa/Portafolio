import React from 'react'

const FormularioMesa = ({mesas, setMesas, idMesa, setIdMesa, minMesa, setMinMesa, 
    maxMesa, setMaxMesa, editarMesa, setEditarMesa }) => {

        const [vacioId, setVacioId] = React.useState('')
        const [vacioMin, setVacioMin] = React.useState('')
        const [vacioMax, setVacioMax] = React.useState('')
        const [idError, setIdError] = React.useState(false)

    const onBlurId = () => {
        let IdIgual = ''
        mesas.forEach(item => {
            if(item.id_mesa === idMesa){
                console.log('estamos dentro del if')
                IdIgual = item.id_mesa
                setIdError(true)
            }
        });
  
        if(!IdIgual){
          setIdError(false)
        }
    }

    
    const agregarMesa = (e) => {
        e.preventDefault()

        
        //Validacion de datos

        const strId = idMesa.toString()
    if(!strId.trim()){
        setVacioId(true)
        return
    }
    setVacioId(false)

    const strMin = maxMesa.toString()
    if(!strMin.trim()){
        setVacioMin(true)
        return
    }
    setVacioMin(false)


    const strMax = maxMesa.toString()
    if(!strMax.trim()){
        setVacioMax(true)
        return
    }
    setVacioMax(false)
        
        
        if(!idError){
            const requestInit = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id_mesa : idMesa, cant_personas_min : minMesa, cant_personas_max : maxMesa
                })
            }
            fetch('http://localhost:9000/api/mesa/', requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
    
            const arrayAgregado = [...mesas, { id_mesa : idMesa, cant_personas_min : minMesa, cant_personas_max : maxMesa}]
    
            setMesas(arrayAgregado)
    
            setEditarMesa(false)
            setIdMesa('')
            setMinMesa('')
            setMaxMesa('')
            
            
        
        }


        
} 

const actualizarMesa = (e) => {
    e.preventDefault()
    //Validacion de datos

    
    const strId = idMesa.toString()
    if(!strId.trim()){
        setVacioId(true)
        return
    }
    setVacioId(false)

    const strMin = minMesa.toString()
    if(!strMin.trim()){
        setVacioMin(true)
        return
    }
    setVacioMin(false)


    const strMax = maxMesa.toString()
    if(!strMax.trim()){
        setVacioMax(true)
        return
    }
    setVacioMax(false)


    if(!idError){
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id_mesa : idMesa, cant_personas_min : minMesa, cant_personas_max : maxMesa
            })
            }
            fetch('http://localhost:9000/api/mesa/' + idMesa, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
    
    
            const arrayEditado = mesas.map((item) => (item.id_mesa === idMesa ? (
                {  id_mesa : idMesa, cant_personas_min : minMesa, cant_personas_max : maxMesa} 
            ) : item))
    
            setMesas(arrayEditado)
    
            setEditarMesa(false)
            setIdMesa('')
            setMinMesa('')
            setMaxMesa('')

            
            

    }
    
     

    }


const limpiarCasillas = () => {
    setEditarMesa(false)
    
    setIdMesa('')
    setMinMesa('')
    setMaxMesa('')
}
  return (
    <div>
        <div>
            {editarMesa ? 
            <div className='text-center'>
                <button type="button" className="btn btn-success text-center mb-5" data-bs-toggle="modal" data-bs-target="#myModal">
                    <h4>+ Editar Mesa</h4>
                </button>
            </div> : <div className='text-center'>
            <button type="button" className="btn btn-success text-center mb-5" data-bs-toggle="modal" data-bs-target="#myModal">
                <h4>+ Agregar Mesa</h4>
            </button>
        </div>}







<div className="modal fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">

      
      <div className="modal-header">
        <h4 className="modal-title">{editarMesa ? "Editar Mesa" : "Agregar Mesa"}</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form onSubmit={editarMesa ? actualizarMesa : agregarMesa}>

      
      
      <div className="modal-body">
      {/* Alerta producto */}

      {vacioId ? <div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡Debes ingresar una mesa!
        </div> : <div></div>}
        {idError ? <div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡La ID ya existe!
        </div> : <div></div>}

        {editarMesa ? <input type="number"
        placeholder='ID mesa' 
        className='form-control mt-3'
        onChange={(e) => setIdMesa(e.target.value)}
        value={idMesa}
        readOnly
        //required
        /> : 
        
        <input type="number"
        placeholder='ID mesa' 
        className='form-control mt-3'
        onChange={(e) => setIdMesa(e.target.value)}
        value={idMesa}
        onBlur={onBlurId}
        //required
        />
        
        }

        


        {vacioMin && <div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡Debes ingresar una mesa!
        </div>}
        
        <input type="number"
        placeholder='Numero minimo de personas' 
        className='form-control mt-3'
        onChange={(e) => setMinMesa(e.target.value)}
        value={minMesa}
        
        //required
        />


        {vacioMax && <div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡Debes ingresar una mesa!
        </div>}
        
        <input type="number"
        placeholder='Numero maximo de personas' 
        className='form-control mt-3'
        onChange={(e) => setMaxMesa(e.target.value)}
        value={maxMesa}
        
        //required
        />
        
     



        

      </div>
      <div className="modal-footer">

        {editarMesa ? <button className='btn btn-warning' type='submit'>Editar Comuna</button> :
        <button className='btn btn-success' type='submit'>Agregar Comuna</button>}
        
        <button onClick={limpiarCasillas} type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
      </div>
      </form>
        </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default FormularioMesa