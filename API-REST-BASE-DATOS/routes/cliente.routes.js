const express = require('express')
const clienteroutes = express.Router()

//Crud Cliente ---------------------------------------------------------------
// Read 
clienteroutes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM cliente', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
clienteroutes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO cliente set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('cliente añadido')
        })
    })
})
// Delete 
clienteroutes.delete('/:idCliente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM cliente WHERE id_cliente = ?', [req.params.idCliente], (err, rows)=>{
            if(err) return res.send(err)

            res.send('cliente eliminado')
        })
    })
})
// Update
clienteroutes.put('/:idCliente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE cliente set ? WHERE id_cliente = ?', [req.body, req.params.idCliente], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario cliente')
        })
    })
})

module.exports = clienteroutes