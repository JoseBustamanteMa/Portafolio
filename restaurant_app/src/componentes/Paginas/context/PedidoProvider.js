import React from 'react'


export const PedidosContext = React.createContext()
const PedidoProvider = (props) => {

    const [recetas, setRecetas] = React.useState([]);
    const [pedidos, setPedidos] = React.useState([]);
    const [pedidoRecetas, setPedidoRecetas] = React.useState([]);
    const [mesas, setMesas] = React.useState([]);
    const [usuarios, setUsuarios] = React.useState([]);
    const [boletas, setBoletas] = React.useState([]);

   
   
  
  return (
    <PedidosContext.Provider value={{recetas, setRecetas, pedidos, setPedidos, pedidoRecetas, setPedidoRecetas,
    mesas, setMesas, usuarios, setUsuarios, boletas, setBoletas}}>
        {props.children}
    </PedidosContext.Provider>
  )
}

export default PedidoProvider