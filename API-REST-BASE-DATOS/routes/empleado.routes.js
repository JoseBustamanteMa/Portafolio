const express = require('express')
const empleadoroutes = express.Router()

//Crud Empleado ---------------------------------------------------------------
// Read 
empleadoroutes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM empleado', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
empleadoroutes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO empleado set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('empleado añadido')
        })
    })
})
// Delete 
empleadoroutes.delete('/:idEmpleado', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM empleado WHERE id_empleado = ?', [req.params.idEmpleado], (err, rows)=>{
            if(err) return res.send(err)

            res.send('empleado eliminado')
        })
    })
})
// Update
empleadoroutes.put('/:idEmpleado', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE empleado set ? WHERE id_empleado = ?', [req.body, req.params.idEmpleado], (err, rows)=>{
            if(err) return res.send(err)

            res.send('empleado cambiado')
        })
    })
})

module.exports = empleadoroutes