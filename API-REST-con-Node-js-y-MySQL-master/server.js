const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const cors = require('cors')

const routes = require('./routes')
const app = express()
app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'db_restaurante_siglo_xxi'
}

// middlewares -------------------------------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())
// routes -------------------------------------------
app.get('/comuna', (req, res)=>{
    res.send('Api')
})
app.get('/usuario', (req, res)=>{
    res.send('Api')
})
app.get('/rol', (req, res)=>{
    res.send('Api')
})
app.get('/empleado', (req, res)=>{
    res.send('Api')
})
app.get('/cliente', (req, res)=>{
    res.send('Api')
})
app.get('/reserva', (req, res)=>{
    res.send('Api')
})
app.get('/receta', (req, res)=>{
    res.send('Api')
})
app.get('/proveedor', (req, res)=>{
    res.send('Api')
})
app.get('/mesa', (req, res)=>{
    res.send('Api')
})
app.get('/producto', (req, res)=>{
    res.send('Api')
})
app.get('/direccion', (req, res)=>{
    res.send('Api')
})
app.get('/solicitud', (req, res)=>{
    res.send('Api')
})
app.use('/api', routes)

// server running -----------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})