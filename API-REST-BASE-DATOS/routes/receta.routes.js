const express = require('express')
const recetaroutes = express.Router()

//Crud Receta ---------------------------------------------------------------
// Read 
recetaroutes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM receta', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
recetaroutes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO receta set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('receta añadida')
        })
    })
})
// Delete 
recetaroutes.delete('/:idReceta', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM receta WHERE id_receta = ?', [req.params.idReceta], (err, rows)=>{
            if(err) return res.send(err)

            res.send('receta eliminada')
        })
    })
})
// Update
recetaroutes.put('/:idReceta', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE receta set ? WHERE id_receta = ?', [req.body, req.params.idReceta], (err, rows)=>{
            if(err) return res.send(err)

            res.send('receta cambiada')
        })
    })
})

module.exports = recetaroutes