//  importando modulos 
import express ,{json,raw, urlencoded} from 'express'
import morgan from 'morgan';
import {config} from '../confi'
import cors from 'cors'

// importando rutas
import postRouter from './routers/Posts.router'

// inializacion de express
const app = express();


//  midellwares
app.use(morgan('dev'));
app.use(json());
app.use(cors(config.application.cors.server))

// rutas

app.use("/api/post",postRouter);

// exportando modulo app
export default app;