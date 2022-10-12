import React from 'react';

const ComunaList = ({comuna, setComuna, comunas, setListUpdated}) => {


    const handleDelete = id => {
        const requestInit = {
            method: 'DELETE'
        }
        fetch('http://localhost:9000/api/comuna/' + id, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        setListUpdated(true)
    }

    let{nom_comuna} = comuna
    const handleUpdate = id => {
        //Validacion de datos
        if (nom_comuna === '') {
            alert('Todos los campos son obligatorios')
            return
        }
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(comuna)
        }
        fetch('http://localhost:9000/api/comuna/' + id, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        //Reiniciando state de comuna
        setComuna({
            nom_comuna: ''
        })

        setListUpdated(true)
    }


    return ( 
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                {comunas.map(comuna => (
                    <tr key={comuna.id_comuna}>
                        <td>{comuna.id_comuna}</td>
                        <td>{comuna.nom_comuna}</td>
                        <td>
                            <div className="mb-3">
                                <button onClick={() => handleDelete(comuna.id_comuna)} className="btn btn-danger">Delete</button>
                            </div>
                            <div className="mb-3">
                                <button onClick={() => handleUpdate(comuna.id_comuna)} className="btn btn-dark">Update</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
 
export default ComunaList;