import React from "react";
import FormularioReceta from "./FormularioReceta";
import FormularioRecProductos from "./FormularioRecProductos";
import { Link } from "react-router-dom";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import Swal from "sweetalert2";
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

    Swal.fire({
      title: 'Eliminar',
      text: '¿Deseas eliminar el producto?',
      icon: 'question',
      confirmButtonColor: '#f81e04',
      confirmButtonText: 'Sí',
      showDenyButton: true,
      denyButtonColor: '#01cc17'

    }).then(response => {
      if (response.isConfirmed) {
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
        Swal.fire({
          title: 'Eliminado',
          text: 'Producto eliminado correctamente',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        })
      }
    })


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

    Swal.fire({
      title: 'Eliminar',
      text: '¿Deseas eliminar la receta?',
      icon: 'question',
      showDenyButton: true,
      denyButtonColor: '#01cc17',
      confirmButtonColor: '#f81e04',
      confirmButtonText: 'Sí'
    }).then(response => {
      if (response.isConfirmed) {
        recetaProductos.forEach((rp) => {
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

        //INICIO DEL DELETE RECETA
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
        Swal.fire({
          title: 'Eliminada',
          text: 'Receta eliminada correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })


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
    <>
      <div className="container">
        <div className="container box1">
          <div className="col-12">
            <hr />
            <h1 className="text-center">Recetas</h1>
            <div className="container col-12">
              <div className=" text-center">
                <table
                  id="1"
                  className="table col-12 table-dark table-responsive table-hover box align-middle"
                >
                  <thead>
                    <tr className="align-middle">
                      <th className="col-4">Receta</th>
                      <th className="col-4">Productos</th>
                      <th className="col-4"></th>

                      <th className="">

                      </th>
                    </tr>
                  </thead>
                  {recetas.map((r) => (
                    <tbody className="container" key={r.id_receta}>
                      <tr>
                        <td>
                          {r.nom_receta}{" "}
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
                        </td>
                        <td>
                          <table className="table table-success col-12  table-responsive table-hover box align-middle">
                            <thead>
                              <tr className="align-middle">

                                <th className="col-1">Nombre</th>
                                <th className="col-1">Disponibilidad</th>
                                <th className="col-1"></th>
                              </tr>
                            </thead>

                            {recetaProductos.map(
                              (rp) =>
                                rp.id_receta === r.id_receta && (

                                  productos.map(
                                    (p) =>
                                      rp.id_producto === p.id_producto && (


                                        <tbody className="container">
                                          <tr>
                                            {" "}

                                            <td>
                                              {p.nom_producto}
                                            </td>
                                            <td >

                                            </td>
                                            {/* <td> aki va la disponibilidad del producto</td> */}

                                            <td children>
                                              <button
                                                onClick={() =>
                                                  eliminarProductoDeReceta(
                                                    p.id_producto,
                                                    r.id_receta
                                                  )
                                                }
                                                className="btn btn-2"
                                              >
                                                Eliminar
                                              </button>
                                            </td>
                                          </tr>
                                        </tbody>
                                      )
                                  )
                                ))}
                          </table>







                        </td>

                        <td>
                          {/* aqui va la weaita de la disponibilidad de la receta */}
                        </td>

                        <td className="container">
                          <button
                            className="btn btn-1"
                            data-bs-toggle="modal"
                            data-bs-target="#myModal1"
                            onClick={() => editar(r)}
                          >
                            Modificar
                          </button>
                          <button
                            className="btn btn-2"
                            onClick={() => eliminarReceta(r.id_receta)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
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
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recetas;
