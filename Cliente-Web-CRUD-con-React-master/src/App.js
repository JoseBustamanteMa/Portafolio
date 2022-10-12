import React, {Fragment, useState, useEffect} from 'react';
import Navbar from './Components/Navbar'
import ComunaList from './Components/ComunaList'
import Form from './Components/Form'

function App() {

  const [comuna, setComuna] = useState({
    nom_comuna: ''
  })

  const [comunas, setComunas] = useState([])

  const [listUpdated, setListUpdated] = useState(false)

  useEffect(() => {
    const getComunas = () => {
      fetch('http://localhost:9000/api/comuna')
      .then(res => res.json())
      .then(res => setComunas(res))
    }
    getComunas()
    setListUpdated(false)
  }, [listUpdated])

  return (
    <Fragment>
      <Navbar brand='Restaurant Siglo XI Lista V0.3'/>
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h2 style={{textAlign: 'center'}}>Comuna List</h2>
            <ComunaList comuna={comuna} setComuna={setComuna} comunas={comunas} setListUpdated={setListUpdated}/>
          </div>
          <div className="col-5">
            <h2 style={{textAlign: 'center'}}>Comuna Form</h2>
            <Form comuna={comuna} setComuna={setComuna}/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
