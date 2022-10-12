const express = require('express')
const routes = express.Router()
// Read 
routes.get('/comuna', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM comuna', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
routes.post('/comuna', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO comuna set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Comuna añadida')
        })
    })
})
// Delete 
routes.delete('/comuna/:id_comuna', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM comuna WHERE id_comuna = ?', [req.params.id_comuna], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Comuna eliminada')
        })
    })
})
// Update
routes.put('/comuna/:id_comuna', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE comuna set ? WHERE id_comuna = ?', [req.body, req.params.id_comuna], (err, rows)=>{
            if(err) return res.send(err)

            res.send('comuna cambiada')
        })
    })
})

module.exports = routes