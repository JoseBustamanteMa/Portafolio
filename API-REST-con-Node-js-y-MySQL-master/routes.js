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
        conn.query('DELETE FROM comuna WHERE idComuna = ?', [req.params.idComuna], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Comuna eliminada')
        })
    })
})
// Update
routes.put('/comuna/:idComuna', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE comuna set ? WHERE idComuna = ?', [req.body, req.params.idComuna], (err, rows)=>{
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
        conn.query('DELETE FROM rol WHERE idRol = ?', [req.params.idRol], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario eliminado')
        })
    })
})
// Update
routes.put('/rol/:idRol', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE rol set ? WHERE idRol = ?', [req.body, req.params.idRol], (err, rows)=>{
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

            res.send('usuario empleado')
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

            res.send('usuario empleado')
        })
    })
})
module.exports = routes