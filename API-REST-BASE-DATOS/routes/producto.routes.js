const express = require('express')
const productoroutes = express.Router()

//Crud Producto ---------------------------------------------------------------
// Read 
productoroutes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM producto', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
productoroutes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO producto set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('producto añadido')
        })
    })
})
// Delete 
productoroutes.delete('/:idProducto', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM producto WHERE id_producto = ?', [req.params.idProducto], (err, rows)=>{
            if(err) return res.send(err)

            res.send('producto eliminado')
        })
    })
})
// Update
productoroutes.put(':idProducto', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE producto set ? WHERE id_producto = ?', [req.body, req.params.idProducto], (err, rows)=>{
            if(err) return res.send(err)

            res.send('producto cambiado')
        })
    })
})

module.exports = productoroutes