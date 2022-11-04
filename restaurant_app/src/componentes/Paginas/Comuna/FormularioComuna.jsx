<<<<<<< HEAD
import React from "react";
import { nanoid } from "nanoid";

const FormularioComuna = ({
  comunas,
  setComunas,
  idComuna,
  setIdComuna,
  comuna,
  setComuna,
  editarComuna,
  setEditarComuna,
}) => {
  const [vacioComuna, setVacioComuna] = React.useState(false);
  const [nomError, setNomError] = React.useState(false);

  const onBlurComuna = () => {
    let nomComunaIgual = "";
    comunas.forEach((item) => {
      if (item.nom_comuna === comuna) {
        console.log("estamos dentro del if");
        nomComunaIgual = item.id_comuna;
        setNomError(true);
      }
    });

    if (!nomComunaIgual) {
      setNomError(false);
    }
  };

  const agregarComuna = (e) => {
    e.preventDefault();

    if (!comuna.trim()) {
      setVacioComuna(true);
      return;
    }
    setVacioComuna(false);

    //Validacion de datos
    const randomId = nanoid(4);
    if (!nomError) {
      const requestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_comuna: randomId,
          nom_comuna: comuna,
        }),
      };
      fetch("http://localhost:9000/api/comuna/", requestInit)
        .then((res) => res.text())
        .then((res) => console.log(res));

      const arrayAgregado = [
        ...comunas,
        { id_comuna: randomId, nom_comuna: comuna },
      ];

      setComunas(arrayAgregado);

      setEditarComuna(false);
      setComuna("");
    }
  };

  const actualizarComuna = (e) => {
    e.preventDefault();
    //Validacion de datos

    if (!comuna.trim()) {
      setVacioComuna(true);
      return;
    }
    setVacioComuna(false);

    if (!nomError) {
      const requestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_comuna: idComuna,
          nom_comuna: comuna,
        }),
      };
      fetch("http://localhost:9000/api/comuna/" + idComuna, requestInit)
        .then((res) => res.text())
        .then((res) => console.log(res));

      const arrayEditado = comunas.map((item) =>
        item.id_comuna === idComuna
          ? { id_comuna: idComuna, nom_comuna: comuna }
          : item
      );

      setComunas(arrayEditado);

      setEditarComuna(false);
      setComuna("");
    }
  };

  const limpiarCasillas = () => {
    setEditarComuna(false);

    setComuna("");
  };

  return (
    <div>
      <div>
        {editarComuna ? (
          <div className="text-center">
            <button
              type="button"
              className="btn btn-success text-center mb-5"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              <h4>+ Editar Comuna</h4>
            </button>
          </div>
        ) : (
          <div className="text-center">
            <button
              type="button"
              className="btn btn-success text-center mb-5"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              <h4>+ Agregar Comuna</h4>
            </button>
          </div>
        )}

        <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  {editarComuna ? "Editar rol" : "Agregar rol"}
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <form onSubmit={editarComuna ? actualizarComuna : agregarComuna}>
                <div className="modal-body">
                  {/* Alerta producto */}

                  {vacioComuna ? (
                    <div className="alert alert-danger mx-1 mb-0" role="alert">
                      ¡Debes ingresar una comuna!
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {nomError ? (
                    <div className="alert alert-danger mx-1 mb-0" role="alert">
                      ¡La comuna ya existe!
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <input
                    type="text"
                    placeholder="Comuna"
                    className="form-control mt-3"
                    onChange={(e) => setComuna(e.target.value)}
                    value={comuna}
                    onBlur={onBlurComuna}
                    //required
                  />
                </div>
                <div className="modal-footer">
                  {editarComuna ? (
                    <button className="btn btn-warning" type="submit">
                      Editar Comuna
                    </button>
                  ) : (
                    <button className="btn btn-success" type="submit">
                      Agregar Comuna
                    </button>
                  )}

                  <button
                    onClick={limpiarCasillas}
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioComuna;
=======
import React from 'react'
import { nanoid } from 'nanoid'

const FormularioComuna = ({comunas, setComunas, idComuna, setIdComuna, comuna, setComuna,
editarComuna, setEditarComuna}) => {


    const [vacioComuna, setVacioComuna] = React.useState(false)
    const [nomError, setNomError] = React.useState(false)

    const onBlurComuna = () =>{

        
      let nomComunaIgual = ''
      comunas.forEach(item => {
          if(item.nom_comuna === comuna){
              console.log('estamos dentro del if')
              nomComunaIgual = item.id_comuna
              setNomError(true)
          }
      });

      if(!nomComunaIgual){
        setNomError(false)
      }
 
  }

    const agregarComuna = (e) => {
        e.preventDefault()

        

        if(!comuna.trim()){
            setVacioComuna(true)
            return
        }
        setVacioComuna(false)
        
        //Validacion de datos
        const randomId = nanoid(4)
        if(!nomError){
            const requestInit = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id_comuna : randomId, nom_comuna : comuna
                })
            }
            fetch('http://localhost:9000/api/comuna/', requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
    
            const arrayAgregado = [...comunas, {id_comuna : randomId, nom_comuna : comuna}]
    
            setComunas(arrayAgregado)
    
            setEditarComuna(false)
            setComuna('')
            
            
        
        }
        
}   


const actualizarComuna = (e) => {
    e.preventDefault()
    //Validacion de datos

    

    if(!comuna.trim()){
        setVacioComuna(true)
        return
    }
    setVacioComuna(false)


    if(!nomError){
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id_comuna: idComuna, nom_comuna : comuna
            })
            }
            fetch('http://localhost:9000/api/comuna/' + idComuna, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
    
    
            const arrayEditado = comunas.map((item) => (item.id_comuna === idComuna ? (
                {id_comuna: idComuna, nom_comuna: comuna} 
            ) : item))
    
            setComunas(arrayEditado)
    
            setEditarComuna(false)
            setComuna('')
            
            

    }
    
     

    }

    

    const limpiarCasillas = () => {
        setEditarComuna(false)
        
        setComuna('')
    }



  return (
    <div>
        <div>
            {editarComuna ? 
            <div className='text-center'>
                <button type="button" className="btn btn-success text-center mb-5" data-bs-toggle="modal" data-bs-target="#myModal">
                    <h4>+ Editar Comuna</h4>
                </button>
            </div> : <div className='text-center'>
            <button type="button" className="btn btn-success text-center mb-5" data-bs-toggle="modal" data-bs-target="#myModal">
                <h4>+ Agregar Comuna</h4>
            </button>
        </div>}







<div className="modal fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">

      
      <div className="modal-header">
        <h4 className="modal-title">{editarComuna ? "Editar rol" : "Agregar rol"}</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form onSubmit={editarComuna ? actualizarComuna : agregarComuna}>

      
      
      <div className="modal-body">
      {/* Alerta producto */}

        
     



        

        {vacioComuna ? <div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡Debes ingresar una comuna!
        </div> : <div></div>}
        {nomError ? <div className="alert alert-danger mx-1 mb-0" role="alert">
          ¡La comuna ya existe!
        </div> : <div></div>}
        <input type="text"
        placeholder='Comuna' 
        className='form-control mt-3'
        onChange={(e) => setComuna(e.target.value)}
        value={comuna}
        onBlur={onBlurComuna}
        //required
        />
      </div>
      <div className="modal-footer">

        {editarComuna ? <button className='btn btn-warning' type='submit'>Editar Comuna</button> :
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

export default FormularioComuna
>>>>>>> b9e61e1d5ead6419f1389d14d765e367c4198ca3
