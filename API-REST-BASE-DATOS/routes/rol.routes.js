const express = require('express')
const rolroutes = express.Router()
//Crud Rol ---------------------------------------------------------------
// Read 
rolroutes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM rol', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
rolroutes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO rol set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('rol añadido')
        })
    })
})
// Delete 
rolroutes.delete('/:idRol', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM rol WHERE id_rol = ?', [req.params.idRol], (err, rows)=>{
            if(err) return res.send(err)

            res.send('rol eliminado')
        })
    })
})
// Update
rolroutes.put('/:idRol', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE rol set ? WHERE id_rol = ?', [req.body, req.params.idRol], (err, rows)=>{
            if(err) return res.send(err)

            res.send('rol cambiado')
        })
    })
})

module.exports = rolroutes