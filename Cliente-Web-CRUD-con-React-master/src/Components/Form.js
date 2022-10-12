import React from 'react';

const Form = ({comuna, setComuna}) => {

    const handleChange = e => {
        setComuna({
            ...comuna,
            [e.target.name]: e.target.value
        })
    }

    let{nom_comuna} = comuna

    const handleSubmit = () => {
        //Validación de los datos
        if (nom_comuna === '') {
            alert('Todos los campos son obligatorios')
            return
        }

        //Consulta
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(comuna)
        }
        fetch('http://localhost:9000/api/', requestInit)
        .then(res => res.text())
        .then(res => console.log(res))
        //Reiniciando state de libro
        setComuna({
            nom_comuna: ''
        })
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nom_comuna" className="form-label">Nombre Comuna</label>
                <input value={nom_comuna} name="nom_comuna" onChange={handleChange} type="text" id="nom_comuna" className="form-control"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
 
export default Form;