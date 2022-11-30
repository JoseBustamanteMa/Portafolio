import React from "react";
// import {format} from 'date-fns'

const Boletas = () => {
  const [boletas, setBoletas] = React.useState([]);
  const [searchAño, setSearchAño] = React.useState("");
  const [searchMes, setSearchMes] = React.useState("");
  const [searchDia, setSearchDia] = React.useState("");
  const [ganancias, setGanancias] = React.useState(0);

  React.useEffect(() => {
    const obtenerBoletas = async () => {
      const data = await fetch("http://localhost:9000/api/boleta");
      const rec = await data.json();
      setBoletas(rec);
    };

    obtenerBoletas();
  }, []);

  

  let resultsAño = []
  if(!searchAño)
  {
    resultsAño = boletas
  }else{
    resultsAño = boletas.filter( (res) =>
    res.fecha_boleta.toString().split('T')[0].split('-')[0].toLowerCase().includes(searchAño.toLocaleLowerCase())
    )
  }

  let resultsMes = []
  if(!searchMes && !resultsAño){
    resultsMes = boletas
  }
  if(resultsAño){
    resultsMes = resultsAño.filter( (res) =>
    res.fecha_boleta.toString().split('T')[0].split('-')[1].toLowerCase().includes(searchMes.toLocaleLowerCase())
    )
  }

  let resultsDia = []
  if(!searchMes && !resultsAño && !resultsMes){
    resultsDia = boletas
  }

  if(resultsAño){
    resultsDia = resultsAño.filter( (res) =>
    res.fecha_boleta.toString().split('T')[0].split('-')[2].toLowerCase().includes(searchDia.toLocaleLowerCase())
    )
  }

  if(resultsAño && resultsMes){
    resultsDia = resultsMes.filter( (res) =>
    res.fecha_boleta.toString().split('T')[0].split('-')[2].toLowerCase().includes(searchDia.toLocaleLowerCase())
    )

    
  }


 


  const calcularGanancias = () => {
    let total = 0
    resultsDia.forEach(x => {
      total = total + x.total_pagar
    })
    console.log(total)
    setGanancias(total)
  }



 

   


  return (

    
    <div className="container mt-5">


    <div className="row d-flex justify-content-between">
      <div className="col-3 ">

      <input value={searchAño} onChange={(e)=> setSearchAño(e.target.value)} type="text" placeholder= 'Buscar por año' className="form-control"/>
      </div>

      <div className="col-3">
      <input value={searchMes} onChange={(e)=> setSearchMes(e.target.value)} type="text" placeholder= 'Buscar por Mes' className="form-control"/>
      </div>
      <div className="col-3">
      <input value={searchDia} onChange={(e)=> setSearchDia(e.target.value)} type="text" placeholder= 'Buscar por Día' className="form-control"/>
      </div>
      
    </div>
     
    

      {/* {results.map((b) => (
        <li>
          {b.FECHA_BOLETA.toString().split('T')[0].split('-')[2]}
         
        </li>
      ))} */}
      <div>
        <table className="table table-dark table-responsive table-hover box align-middle">
          <thead>
            <tr>
              <td>Folio</td>
              <td>Fecha</td>
              <td>Monto</td>
            </tr>
          </thead>
          <tbody>
          {resultsDia.map((b) => (
            
              <tr>
                <td>{b.id_boleta}</td>
                <td>{b.fecha_boleta}</td>
                <td>$ {b.total_pagar}</td>
              </tr>

          ))}

            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Total</td>
            </tr>
            <tr >
              <td>Ganancias periodo filtrado: </td>
              <td></td>
              <td>$ {ganancias}</td>
            </tr>  
          </tbody>
        </table>
      </div>
      <div className="col-3 ms-auto">
      <button onClick={calcularGanancias} className="btn btn-primary">Calcular ganancias periodo filtrado</button>
     
       
      </div>
    </div>
  );
};

export default Boletas;
