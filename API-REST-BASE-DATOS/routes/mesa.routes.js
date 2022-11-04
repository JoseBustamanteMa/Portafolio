const express = require('express')
const mesaroutes = express.Router()

//Crud Mesa ---------------------------------------------------------------
// Read 
mesaroutes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM mesa', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
mesaroutes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO mesa set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('mesa añadida')
        })
    })
})
// Delete 
mesaroutes.delete('/:idMesa', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM mesa WHERE id_mesa = ?', [req.params.idMesa], (err, rows)=>{
            if(err) return res.send(err)

            res.send('mesa eliminada')
        })
    })
})
// Update
mesaroutes.put('/:idMesa', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE mesa set ? WHERE id_mesa = ?', [req.body, req.params.idMesa], (err, rows)=>{
            if(err) return res.send(err)

            res.send('mesa cambiada')
        })
    })
})

module.exports = mesaroutes