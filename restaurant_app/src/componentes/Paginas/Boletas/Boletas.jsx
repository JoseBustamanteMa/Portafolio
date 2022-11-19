import React from 'react'

const Boletas = () => {

    const [boletas, setBoletas] = React.useState()

    React.useEffect(() => {
        const obtenerBoletas = async () => {
          const data = await fetch("http://localhost:9000/api/boleta");
          const rec = await data.json();
          setBoletas(rec);
        };
    
        obtenerBoletas();
    
        
      }, []);
  return (
    <div>
        <button className='btn btn-secondary'>
            Generar Receta
        </button>
    </div>
  )
}

export default Boletas