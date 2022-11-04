const express = require('express')
const direccionroutes = express.Router()

//Crud Direccion ---------------------------------------------------------------
// Read 
direccionroutes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM direccion', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
direccionroutes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO direccion set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('direccion añadida')
        })
    })
})
// Delete 
direccionroutes.delete('/:idDireccion', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM direccion WHERE idDireccion = ?', [req.params.idDireccion], (err, rows)=>{
            if(err) return res.send(err)

            res.send('direccion eliminada')
        })
    })
})
// Update
direccionroutes.put('/:idDireccion', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE direccion set ? WHERE idDireccion = ?', [req.body, req.params.idDireccion], (err, rows)=>{
            if(err) return res.send(err)

            res.send('direccion cambiada')
        })
    })
})

module.exports = direccionroutes