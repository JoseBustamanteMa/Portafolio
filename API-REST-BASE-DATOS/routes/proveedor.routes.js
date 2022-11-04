const express = require('express')
const proveedorroutes = express.Router()

//Crud Provedoor ---------------------------------------------------------------
// Read 
proveedorroutes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM proveedor', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
proveedorroutes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO proveedor set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('provedoor añadido')
        })
    })
})
// Delete 
proveedorroutes.delete('/:idProvedoor', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM proveedor WHERE id_proveedor = ?', [req.params.idProvedoor], (err, rows)=>{
            if(err) return res.send(err)

            res.send('provedoor eliminado')
        })
    })
})
// Update
proveedorroutes.put('/:idProvedoor', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE provedoor set ? WHERE id_proveedor = ?', [req.body, req.params.idProvedoor], (err, rows)=>{
            if(err) return res.send(err)

            res.send('proveedor cambiado')
        })
    })
})

module.exports = proveedorroutes