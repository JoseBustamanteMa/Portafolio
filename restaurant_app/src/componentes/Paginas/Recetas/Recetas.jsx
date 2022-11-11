import React from "react";
import FormularioReceta from "./FormularioReceta";
import FormularioRecProductos from "./FormularioRecProductos";
import { Link } from "react-router-dom";
const Recetas = () => {
  const [idReceta, setIdReceta] = React.useState("");
  const [nomReceta, setNomReceta] = React.useState("");
  const [precioReceta, setPrecioReceta] = React.useState(0);
  const [producto, setProducto] = React.useState("");
  const [recetas, setRecetas] = React.useState([]);
  const [productos, setProductos] = React.useState([]);
  const [recetaProductos, setRecetaProductos] = React.useState([]);
  const [arregloNombreReceta, setArregloNombreReceta] = React.useState([]);

  React.useEffect(() => {
    const obtenerProductos = async () => {
      const data = await fetch("http://localhost:9000/api/producto");
      const prods = await data.json();
      setProductos(prods);
    };

    obtenerProductos();

    const obtenerRecetas = async () => {
      const data = await fetch("http://localhost:9000/api/receta");
      const rec = await data.json();
      setRecetas(rec);
    };
    obtenerRecetas();

    const obtenerRecetasProductos = async () => {
      const data = await fetch("http://localhost:9000/api/receta-productos");
      const rec = await data.json();
      setRecetaProductos(rec);
    };
    obtenerRecetasProductos();

    const obtenerRecetasProductosNR = async () => {
      const data = await fetch("http://localhost:9000/api/receta-productos");
      const rec = await data.json();
      setRecetaProductos(rec);
      let arreglo = [];

      rec.forEach((i) => {
        arreglo.push(i.id_receta);
      });

      let arrayRecetasNoRepetidas = [...new Set(arreglo)];
      console.log(arrayRecetasNoRepetidas);
      setArregloNombreReceta(arrayRecetasNoRepetidas);
    };
    obtenerRecetasProductosNR();
  }, []);
  // Termino de useEffect

  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  //Inicio de ELIMINAR RECETA PRODUCTO

  const eliminarProductoDeReceta = (idProd, idRec) => {
    let idRecProd = "";

    recetaProductos.forEach((i) => {
      if (idProd === i.id_producto && idRec === i.id_receta) {
        // console.log(i.id_rec_producto)
        idRecProd = i.id_rec_producto;
      }
    });

    //console.log(idRecProd)

    if (window.confirm()) {
      const requestInit = {
        method: "DELETE",
      };
      fetch(
        "http://localhost:9000/api/receta-productos/" + idRecProd,
        requestInit
      )
        .then((res) => res.text())
        .then((res) => console.log(res));

      const arrayEditado = recetaProductos.filter(
        (item) => item.id_rec_producto !== idRecProd
      );

      setRecetaProductos(arrayEditado);
    }
  };

  //------------------------------------------------------------------
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  //Inicio de ELIMINAR RECETA

  const eliminarReceta = (idRec) => {
    // FUNCION ELIMINAR PRODUCTOS DE LA RECETA, ANTES DE ELIMINAR LA RECETA

    if(window.confirm("Deseas eliminar la receta?"))
    {recetaProductos.forEach((rp) => {
      if (rp.id_receta === idRec) {
        const requestInit = {
          method: "DELETE",
        };
        fetch(
          "http://localhost:9000/api/receta-productos/" + rp.id_rec_producto,
          requestInit
        )
          .then((res) => res.text())
          .then((res) => console.log(res));
      }
    });

    let arrayEditado = [];

    recetaProductos.forEach((rp) => {
      if (rp.id_receta !== idRec) {
        console.log(rp.id_rec_producto);
        arrayEditado.push(rp);
      }
    });
    setRecetaProductos(arrayEditado);

    // FIN FUNCION ELIMINAR PRODUCTOS DE LA RECETA, ANTES DE ELIMINAR LA RECETA
    //--------------------
    //--------------------
    //--------------------
    //--------------------

    //INICIO DEL DELETE BOLETA
    //-------------------------
    //-------------------------
    //-------------------------
    //-------------------------

    
      const requestInit = {
        method: "DELETE",
      };
      fetch("http://localhost:9000/api/receta/" + idRec, requestInit)
        .then((res) => res.text())
        .then((res) => console.log(res));

      const arrayFiltrado = recetas.filter((item) => item.id_receta !== idRec);

      setRecetas(arrayFiltrado);

      let arreglo = [];
      recetaProductos.forEach((i) => {
        arreglo.push(i.id_receta);
      });

      let arrayRecetasNoRepetidas = [...new Set(arreglo)];
      console.log(arrayRecetasNoRepetidas);
      setArregloNombreReceta(arrayRecetasNoRepetidas);
    }
  };
  //----------------------------------------------------------------
  //----------------------------------------------------------------
  //----------------------------------------------------------------
  //----------------------------------------------------------------
  //----------------------------------------------------------------
  //----------------------------------------------------------------
  //INICIO EDITAR

  const editar = (item) => {
    setIdReceta(item.id_receta);
    setNomReceta(item.nom_receta);
    setPrecioReceta(item.precio_receta);
  };

  //---------------------------------
  //---------------------------------
  //---------------------------------
  //---------------------------------
  //inicio lista

  return (
    <div>
      <div>
        <FormularioReceta
          idReceta={idReceta}
          setIdReceta={setIdReceta}
          nomReceta={nomReceta}
          setNomReceta={setNomReceta}
          precioReceta={precioReceta}
          setPrecioReceta={setPrecioReceta}
          recetas={recetas}
          setRecetas={setRecetas}
          producto={producto}
          setProducto={setProducto}
          productos={productos}
          setProductos={setProductos}
          recetaProductos={recetaProductos}
          setRecetaProductos={setRecetaProductos}
        />
          
        {/* <FormularioRecProductos 
                idReceta={idReceta}
                setIdReceta={setIdReceta}
                nomReceta={nomReceta}
                setNomReceta={setNomReceta}
                recetas={recetas}
                setRecetas={setRecetas}/> */}
      </div>

      <div className="container">
        <div>
          {recetas.map((r) => (
            <div className="card mb-5" key={r.id_receta}>
              <div>
                <button
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal1"
                  onClick={() => editar(r)}
                >
                  Modificar receta
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => eliminarReceta(r.id_receta)}
                >
                  Eliminar receta
                </button>
              </div>
              {r.nom_receta} -{" "}
              <FormularioRecProductos
                idReceta={idReceta}
                setIdReceta={setIdReceta}
                nomReceta={nomReceta}
                setNomReceta={setNomReceta}
                precioReceta={precioReceta}
                setPrecioReceta={setPrecioReceta}
                recetas={recetas}
                setRecetas={setRecetas}
                producto={producto}
                setProducto={setProducto}
                productos={productos}
                setProductos={setProductos}
                recetaProductos={recetaProductos}
                setRecetaProductos={setRecetaProductos}
              />
              <div className="card-body">
                {recetaProductos.map(
                  (rp) =>
                    rp.id_receta === r.id_receta && (
                      <div>
                        <li>
                          {productos.map(
                            (p) =>
                              rp.id_producto === p.id_producto && (
                                <div>
                                  El nombre del producto es {p.nom_producto}
                                  ---- Id de la receta: {r.id_receta} - ID de
                                  receta producto: {rp.id_rec_producto}
                                  <button
                                    onClick={() =>
                                      eliminarProductoDeReceta(
                                        p.id_producto,
                                        r.id_receta
                                      )
                                    }
                                    className="bg-warning ms-2"
                                  >
                                    Eliminar producto
                                  </button>
                                </div>
                              )
                          )}
                        </li>
                      </div>
                    )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="container">
        <div className="row">
          {arregloNombreReceta.map((rp, index) => (
            <div className="col-4 mb-5" key={index}>
              {recetas.map(
                (r, indexR) =>
                  rp === r.id_receta && (
                    <div key={indexR} className="card">
                      <div className="card-title">
                        <h1 className="text-center">
                          {r.nom_receta}
                          <button
                            onClick={() => editar(r)}
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                            className="btn btn-warning"
                          >
                            Editar
                          </button>
                        </h1>
                        <button
                          onClick={() => eliminarReceta(rp)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Eliminar Receta
                        </button>
                      </div>
                      <div className="card-body text-center">
                        {recetaProductos.map(
                          (item, indexRP) =>
                            item.id_receta === rp && (
                              <li
                                key={indexRP}
                                className="list-group-item col-6 mx-auto"
                              >
                                {productos.map(
                                  (p) =>
                                    item.id_producto === p.id_producto &&
                                    p.nom_producto
                                )}
                                <button
                                  onClick={() =>
                                    eliminarProductoDeReceta(
                                      item.id_producto,
                                      rp
                                    )
                                  }
                                  type="button"
                                  className="me-2"
                                >
                                  Eliminar
                                </button>
                              </li>
                            )
                        )}
                        <div className="ms-auto ">
                          {rp === r.id_receta && (
                            <li className="list-group-item text-success col-6 mx-auto d-flex">
                              Valor:
                              <p className="ms-auto">${r.precio_receta}</p>
                            </li>
                          )}
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Recetas;
