const express = require('express')
const comunaroutes = express.Router()
// Crud Comuna----------------------------------------------------------------
// Read 
comunaroutes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM comuna', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
}) 
// Instert into
comunaroutes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO comuna set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Comuna añadida')
        })
    })
})
// Delete 
comunaroutes.delete('/:idcomuna', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM comuna WHERE id_comuna = ?', [req.params.idcomuna], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Comuna eliminada')
        })
    })
})
// Update
comunaroutes.put('/:idcomuna', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE comuna set ? WHERE id_comuna = ?', [req.body, req.params.idcomuna], (err, rows)=>{
            if(err) return res.send(err)

            res.send('comuna cambiada')
        })
    })
})

module.exports = comunaroutes