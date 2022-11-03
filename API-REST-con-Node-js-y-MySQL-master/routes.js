const express = require('express')
const routes = express.Router()
// Crud Comuna----------------------------------------------------------------
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
routes.delete('/comuna/:idComuna', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM comuna WHERE id_comuna = ?', [req.params.idComuna], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Comuna eliminada')
        })
    })
})
// Update
routes.put('/comuna/:idComuna', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE comuna set ? WHERE id_comuna = ?', [req.body, req.params.idComuna], (err, rows)=>{
            if(err) return res.send(err)

            res.send('comuna cambiada')
        })
    })
})
//Crud Usuario ---------------------------------------------------------------
// Read 
routes.get('/usuario', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM usuario', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
routes.post('/usuario', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO usuario set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario añadido')
        })
    })
})
// Delete 
routes.delete('/usuario/:idUsuario', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM usuario WHERE idUsuario = ?', [req.params.idUsuario], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario eliminado')
        })
    })
})
// Update
routes.put('/usuario/:idUsuario', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE usuario set ? WHERE idUsuario = ?', [req.body, req.params.idUsuario], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario cambiada')
        })
    })
})
//Crud Rol ---------------------------------------------------------------
// Read 
routes.get('/rol', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM rol', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
routes.post('/rol', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO rol set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('rol añadido')
        })
    })
})
// Delete 
routes.delete('/rol/:idRol', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM rol WHERE id_rol = ?', [req.params.idRol], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario eliminado')
        })
    })
})
// Update
routes.put('/rol/:idRol', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE rol set ? WHERE id_rol = ?', [req.body, req.params.idRol], (err, rows)=>{
            if(err) return res.send(err)

            res.send('rol cambiada')
        })
    })
})
//Crud Empleado ---------------------------------------------------------------
// Read 
routes.get('/empleado', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM empleado', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
routes.post('/empleado', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO empleado set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('empleado añadido')
        })
    })
})
// Delete 
routes.delete('/empleado/:idEmpleado', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM empleado WHERE idEmpleado = ?', [req.params.idEmpleado], (err, rows)=>{
            if(err) return res.send(err)

            res.send('empleado eliminado')
        })
    })
})
// Update
routes.put('/empleado/:idEmpleado', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE empleado set ? WHERE idEmpleado = ?', [req.body, req.params.idEmpleado], (err, rows)=>{
            if(err) return res.send(err)

            res.send('empleado cambiado')
        })
    })
})
//Crud Cliente ---------------------------------------------------------------
// Read 
routes.get('/cliente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM cliente', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
routes.post('/cliente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO cliente set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('cliente añadido')
        })
    })
})
// Delete 
routes.delete('/cliente/:idCliente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM cliente WHERE idCliente = ?', [req.params.idCliente], (err, rows)=>{
            if(err) return res.send(err)

            res.send('cliente eliminado')
        })
    })
})
// Update
routes.put('/cliente/:idCliente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE cliente set ? WHERE idCliente = ?', [req.body, req.params.idCliente], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario cliente')
        })
    })
})
//Crud Reserva ---------------------------------------------------------------
// Read 
routes.get('/reserva', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM reserva', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
routes.post('/reserva', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO reserva set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('reserva añadido')
        })
    })
})
// Delete 
routes.delete('/reserva/:idReserva', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM empleado WHERE idReserva = ?', [req.params.idReserva], (err, rows)=>{
            if(err) return res.send(err)

            res.send('reserva eliminado')
        })
    })
})
// Update
routes.put('/reserva/:idReserva', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE reserva set ? WHERE idReserva = ?', [req.body, req.params.idReserva], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario reserva')
        })
    })
})
//Crud Receta ---------------------------------------------------------------
// Read 
routes.get('/receta', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM receta', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
routes.post('/receta', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO receta set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('receta añadido')
        })
    })
})
// Delete 
routes.delete('/receta/:idReceta', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM receta WHERE idReceta = ?', [req.params.idReceta], (err, rows)=>{
            if(err) return res.send(err)

            res.send('receta eliminado')
        })
    })
})
// Update
routes.put('/receta/:idReceta', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE receta set ? WHERE idReceta = ?', [req.body, req.params.idReceta], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario receta')
        })
    })
})
//Crud Provedoor ---------------------------------------------------------------
// Read 
routes.get('/proveedor', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM proveedor', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
routes.post('/proveedor', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO proveedor set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('provedoor añadido')
        })
    })
})
// Delete 
routes.delete('/proveedor/:id_proveedor', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM proveedor WHERE id_proveedor = ?', [req.params.id_proveedor], (err, rows)=>{
            if(err) return res.send(err)

            res.send('provedoor eliminado')
        })
    })
})
// Update
routes.put('/proveedor/:idProvedoor', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE proveedor set ? WHERE id_proveedor = ?', [req.body, req.params.idProvedoor], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario proveedor')
        })
    })
})
//Crud Mesa ---------------------------------------------------------------
// Read 
routes.get('/mesa', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM mesa', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
routes.post('/mesa', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO mesa set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('mesa añadido')
        })
    })
})
// Delete 
routes.delete('/mesa/:idMesa', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM mesa WHERE id_mesa = ?', [req.params.idMesa], (err, rows)=>{
            if(err) return res.send(err)

            res.send('mesa eliminada con exito')
        })
    })
})
// Update
routes.put('/mesa/:idMesa', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE mesa set ? WHERE id_mesa = ?', [req.body, req.params.idMesa], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Mesa actualizada con exito')
        })
    })
})
//Crud Producto ---------------------------------------------------------------
// Read 
routes.get('/producto', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM producto', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
routes.post('/producto', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO producto set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('producto añadido')
        })
    })
})
// Delete 
routes.delete('/producto/:idProducto', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM producto WHERE idProducto = ?', [req.params.idProducto], (err, rows)=>{
            if(err) return res.send(err)

            res.send('producto eliminado')
        })
    })
})
// Update
routes.put('/producto/:idProducto', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE producto set ? WHERE idProducto = ?', [req.body, req.params.idProducto], (err, rows)=>{
            if(err) return res.send(err)

            res.send('producto cambiado')
        })
    })
})
//Crud Direccion ---------------------------------------------------------------
// Read 
routes.get('/direccion', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM direccion', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
routes.post('/direccion', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO direccion set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('direccion añadida')
        })
    })
})
// Delete 
routes.delete('/direccion/:idDireccion', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM direccion WHERE idDireccion = ?', [req.params.idDireccion], (err, rows)=>{
            if(err) return res.send(err)

            res.send('direccion eliminada')
        })
    })
})
// Update
routes.put('/direccion/:idDireccion', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE direccion set ? WHERE idDireccion = ?', [req.body, req.params.idDireccion], (err, rows)=>{
            if(err) return res.send(err)

            res.send('direccion cambiada')
        })
    })
})
//Crud Solicitud ---------------------------------------------------------------
// Read 
routes.get('/solicitud', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM solicitud', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
// Instert into
routes.post('/solicitud', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO solicitud set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('solicitud añadido')
        })
    })
})
// Delete 
routes.delete('/solicitud/:idSolicitud', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM solicitud WHERE idSolicitud = ?', [req.params.idSolicitud], (err, rows)=>{
            if(err) return res.send(err)

            res.send('solicitud eliminado')
        })
    })
})
// Update
routes.put('/solicitud/:idSolicitud', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE solicitud set ? WHERE idSolicitud = ?', [req.body, req.params.idSolicitud], (err, rows)=>{
            if(err) return res.send(err)

            res.send('solicitud cambiada')
        })
    })
})
module.exports = routes