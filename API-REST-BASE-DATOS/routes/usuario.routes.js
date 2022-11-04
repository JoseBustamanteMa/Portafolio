const express = require('express')
const usuarioroutes = express.Router()

//Crud Usuario ---------------------------------------------------------------
// Read 
usuarioroutes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM usuario', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
usuarioroutes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO usuario set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario añadido')
        })
    })
})
// Delete 
usuarioroutes.delete('/:idUsuario', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM usuario WHERE idUsuario = ?', [req.params.idUsuario], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario eliminado')
        })
    })
})
// Update
usuarioroutes.put('/:idUsuario', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE usuario set ? WHERE idUsuario = ?', [req.body, req.params.idUsuario], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario cambiado')
        })
    })
})

module.exports = usuarioroutes