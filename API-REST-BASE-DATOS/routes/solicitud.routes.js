const express = require('express')
const solicitudroutes = express.Router()

//Crud Solicitud ---------------------------------------------------------------
// Read 
solicitudroutes.get('/solicitud', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM solicitud', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
solicitudroutes.post('/solicitud', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO solicitud set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('solicitud añadida')
        })
    })
})
// Delete 
solicitudroutes.delete('/solicitud/:idSolicitud', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM solicitud WHERE id_solicitud = ?', [req.params.idSolicitud], (err, rows)=>{
            if(err) return res.send(err)

            res.send('solicitud eliminada')
        })
    })
})
// Update
solicitudroutes.put('/solicitud/:idSolicitud', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE solicitud set ? WHERE id_solicitud = ?', [req.body, req.params.idSolicitud], (err, rows)=>{
            if(err) return res.send(err)

            res.send('solicitud cambiada')
        })
    })
})

module.exports = solicitudroutes