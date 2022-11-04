const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const cors = require('cors')

const indexRouter = require('./routes/index.routes.js')
const app = express();

app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'db_restaurante_siglo_xxi'
}

// middlewares -------------------------------------
app.use(myconn(mysql, dbOptions))
app.use(express.json())
app.use(cors())
// routes -------------------------------------------

app.use("/", indexRouter);
app.use("*", (req, res) => {
  res.send("404 - not found");
});

// server running -----------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})