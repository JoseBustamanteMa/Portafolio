const express = require('express')
const reservaroutes = express.Router()

//Crud Reserva ---------------------------------------------------------------
// Read 
reservaroutes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM reserva', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
reservaroutes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO reserva set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('reserva añadido')
        })
    })
})
// Delete 
reservaroutes.delete('/:idReserva', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM empleado WHERE id_reserva = ?', [req.params.idReserva], (err, rows)=>{
            if(err) return res.send(err)

            res.send('reserva eliminado')
        })
    })
})
// Update
reservaroutes.put('/:idReserva', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE reserva set ? WHERE id_reserva = ?', [req.body, req.params.idReserva], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario reserva')
        })
    })
})

module.exports = reservaroutes