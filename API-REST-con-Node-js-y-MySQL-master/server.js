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
    database: 'db_restaurant_sigloxi'
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
app.use('/api', routes)

// server running -----------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})