import React from "react";
import { nanoid } from "nanoid";

const FormularioReceta = ({
  idReceta,
  setIdReceta,
  nomReceta,
  setNomReceta,
  precioReceta,
  setPrecioReceta,
  recetas,
  setRecetas,
  producto,
  setProducto,
  productos,
  setProductos,
  recetaProductos,
  setRecetaProductos,
}) => {
  const [existeIdReceta, setExisteIdReceta] = React.useState(false);

  const agregarProductoAReceta = (e) => {
    e.preventDefault();

    let existeProducto = ''
    recetaProductos.forEach(item => {
        if(item.id_receta === idReceta && item.id_producto === producto){
            
            existeProducto = 'existe'
            return
        }
    })

    if(existeProducto){
        alert("El producto ya existe en la receta")
        return
    }

    if(!producto.trim()){
        alert("Elige un producto")
        return
    }

    if(!existeProducto){
        const randomId = nanoid(4);

    const requestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_rec_producto: randomId,
        id_receta: idReceta,
        id_producto: producto,
      }),
    };
    fetch("http://localhost:9000/api/receta-productos/", requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    const arrayAgregado = [
      ...recetaProductos,
      { id_rec_producto: randomId, id_receta: idReceta, id_producto: producto },
    ];

    setRecetaProductos(arrayAgregado);

    }

    
  };




  const agregarReceta = (e) => {
    e.preventDefault();

    // if(!errorProductoNombre){
    const randomId = nanoid(4);

    const requestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_receta: randomId,
        nom_receta: nomReceta,
        precio_receta: precioReceta,
      }),
    };
    fetch("http://localhost:9000/api/receta/", requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    const arrayAgregado = [
      ...recetas,
      {
        id_receta: randomId,
        nom_receta: nomReceta,
        precio_receta: precioReceta,
      },
    ];

    setRecetas(arrayAgregado);

    // }
  };


  const limpiarCasillas = () =>{
    setNomReceta('')
    setPrecioReceta(0)
  }

  

  return (
    <div>
      <div className="mb-5">
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
        >
          + Agregar receta
        </button>
      </div>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Nueva Receta</h4>
              
            </div>
            <form onSubmit={agregarReceta}>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Nombre receta"
                  className="form-control mb-3 mt-3"
                  onChange={(e) => setNomReceta(e.target.value)}
                  value={nomReceta}
                  
                />

                <input
                  type="number"
                  placeholder="Precio receta"
                  className="form-control mb-3 mt-3"
                  onChange={(e) => setPrecioReceta(e.target.value)}
                  value={precioReceta}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-success"
                >
                   Confirmar Receta
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={limpiarCasillas}
                >
                  Cerrar
                </button>
              </div>

              <div className="mb-3 container">

                
                
                  <form  onSubmit={agregarProductoAReceta}>

                    
              <select
                onChange={(e) => setProducto(e.target.value)}
                name="productos"
                className="form-control mt-3"
              >
                <option value={""}>Elige un producto</option>
                {productos.map((item) => (
                  <option key={item.id_producto} value={item.id_producto}>
                    {item.nom_producto}
                  </option>
                ))}
              </select>

              <button className="btn btn-success">Agregar producto</button>
            </form>
                
              </div>

              
            </form>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioReceta;
