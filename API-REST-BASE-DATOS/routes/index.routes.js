const express = require('express')
const indexRouter = express.Router();

const comunaroutes      = require('./comuna.routes')
const rolroutes         = require('./rol.routes')
const solicitudroutes   = require('./solicitud.routes')
const direccionroutes   = require('./direccion.routes')
const productoroutes    = require('./producto.routes')
const mesaroutes        = require('./mesa.routes')
const proveedorroutes   = require('./proveedor.routes')
const recetaroutes      = require('./receta.routes')
const reservaroutes     = require('./reserva.routes')
const clienteroutes     = require('./cliente.routes')
const empleadoroutes    = require('./empleado.routes')
const usuarioroutes     = require('./usuario.routes')


const prefix = "/api";


indexRouter.use(`${prefix}/comuna`      , comunaroutes);
indexRouter.use(`${prefix}/rol`         , rolroutes);
indexRouter.use(`${prefix}/solicitud`   , solicitudroutes);
indexRouter.use(`${prefix}/direccion`   , direccionroutes);
indexRouter.use(`${prefix}/producto`    , productoroutes);
indexRouter.use(`${prefix}/mesa`        , mesaroutes);
indexRouter.use(`${prefix}/proveedor`   , proveedorroutes);
indexRouter.use(`${prefix}/receta`      , recetaroutes);
indexRouter.use(`${prefix}/reserva`     , reservaroutes);
indexRouter.use(`${prefix}/cliente`     , clienteroutes);
indexRouter.use(`${prefix}/empleado`    , empleadoroutes);
indexRouter.use(`${prefix}/usuario`     , usuarioroutes);



module.exports = indexRouter;