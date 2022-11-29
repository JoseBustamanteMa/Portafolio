import React from "react";
import Recetas from "./Recetas";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";

const FormularioRecProductos = ({
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

    let existeProducto = "";
    recetaProductos.forEach((item) => {
      if (item.id_receta === idReceta && item.id_producto === producto) {
        existeProducto = "existe";
        return;
      }
    });

    if (existeProducto) {
      
      Swal.fire({
        title: 'Advertencia',
        text: 'El producto ya existe en la boleta',
        icon: "warning",
        timer: 1500,
        showConfirmButton: false
      })
      return;
    }

    if (!producto.trim()) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Debes ingresar un producto',
        icon: "warning",
        timer: 1500
      })
      return;
    }

    if (!existeProducto) {
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
        {
          id_rec_producto: randomId,
          id_receta: idReceta,
          id_producto: producto,
        },
      ];

      setRecetaProductos(arrayAgregado);
      
    }
  };

  const actualizarReceta = (e) => {
    e.preventDefault();

    const requestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom_receta: nomReceta,
        precio_receta: precioReceta,
      }),
    };
    fetch("http://localhost:9000/api/receta/" + idReceta, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    const arrayEditado = recetas.map((item) =>
      item.id_receta === idReceta
        ? {
            id_receta: idReceta,
            nom_receta: nomReceta,
            precio_receta: precioReceta,
          }
        : item
    );

    setRecetas(arrayEditado);
    Swal.fire({
      title: 'Actualizada',
      text: 'Receta actualizada correctamente',
      icon: 'success',
      timer: 1500, 
      showConfirmButton: false
    })
  };

  const limpiarCasillas = () => {
    setNomReceta('')
    setPrecioReceta(0)
  }

  return (
    <div>
      <div className="modal fade" id="myModal1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="table">Modificar receta</h2>
              
            </div>
            <form onSubmit={actualizarReceta}>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Nombre recetaaaaa"
                  className="form-control mb-3 mt-3"
                  onChange={(e) => setNomReceta(e.target.value)}
                  value={nomReceta}
                />

                <input
                  type="number"
                  placeholder="Precio recetaaa"
                  className="form-control mb-3 mt-3"
                  onChange={(e) => setPrecioReceta(e.target.value)}
                  value={precioReceta}
                />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-warning">
                  Editar
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
            </form>

            <form onSubmit={agregarProductoAReceta}>
              <div className="modal-footer">
                <select
                  onChange={(e) => setProducto(e.target.value)}
                  name="productos"
                  className="form-control mt-3"
                >
                  <option value={""}>Elige un producto</option>
                    {productos.map((item) => (
                    <option 
                      key={item.id_producto} 
                      value={item.id_producto}>
                      {item.nom_producto}
                    </option>
                  ))}
                </select>

                <button className="btn btn-success">+ Agregar producto</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioRecProductos;
