import React from 'react'


export const PedidosContext = React.createContext()
const PedidoProvider = (props) => {

    const [recetas, setRecetas] = React.useState([]);
    const [pedidos, setPedidos] = React.useState([]);
    const [pedidoRecetas, setPedidoRecetas] = React.useState([]);
    const [mesas, setMesas] = React.useState([]);
    const [usuarios, setUsuarios] = React.useState([]);
    const [boletas, setBoletas] = React.useState([]);

    // React.useEffect(() => {
    //     const obtenerRecetas = async () => {
    //       const data = await fetch("http://localhost:9000/api/receta");
    //       const rec = await data.json();
    //       setRecetas(rec);
    //     };
    
    //     obtenerRecetas();
    
    //     const obtenerPedidos = async () => {
    //       const data = await fetch("http://localhost:9000/api/pedido");
    //       const ped = await data.json();
    //       setPedidos(ped);
    //     };
    //     obtenerPedidos();
    
    //     const obtenerPedidoRecetas = async () => {
    //       const data = await fetch("http://localhost:9000/api/pedido-recetas");
    //       const pr = await data.json();
    //       setPedidoRecetas(pr);
    //     };
    //     obtenerPedidoRecetas();
    
    //     const obtenerMesas = async () => {
    //       const data = await fetch("http://localhost:9000/api/mesa");
    //       const mes = await data.json();
    //       setMesas(mes);
    //     };
    //     obtenerMesas();
    
    //     const obtenerUsuarios = async () => {
    //       const data = await fetch("http://localhost:9000/api/usuario");
    //       const usu = await data.json();
    //       setUsuarios(usu);
    //     };
    //     obtenerUsuarios();
    
    //     const obtenerBoletas = async () => {
    //       const data = await fetch("http://localhost:9000/api/boleta");
    //       const bol = await data.json();
    //       setBoletas(bol);
    //     };
    
    //     obtenerBoletas();
    //   }, []);

   
  
  return (
    <PedidosContext.Provider value={{recetas, setRecetas, pedidos, setPedidos, pedidoRecetas, setPedidoRecetas,
    mesas, setMesas, usuarios, setUsuarios, boletas, setBoletas}}>
        {props.children}
    </PedidosContext.Provider>
  )
}

export default PedidoProvider