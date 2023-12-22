//IMPORTACIONES
const mysql=require('mysql');
const express=require('express');
const morgan=require('morgan');
const path=require('path');
const cors =require('cors');
const {engine} =require('express-handlebars');
const bodyParser = require('body-parser');
require('dotenv').config();

//SERVIDOR Y PUERTO
const server=express();
const port=3000;

//CONFIGURACIONES
server.use(morgan('dev'));
server.use('/', express.static(path.join(__dirname, 'public')));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors());
server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', path.join(__dirname, './views'));

//RUTAS
server.get('/', (req, res)=>{
    res.render('index')
})


//CONEXION A BASE DE DATOS
const entity=mysql.createPool({
    host: process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    portb : process.env.MYSQL_PORT,
    database : process.env.MYSQL_DATABASE,

})


//RUTAS Y MANEJO DE SOLICITUDES
server.post('/registerInfo', (req, res)=>{
    const {username, lastname, password}=req.body;
    entity.query(
        "INSERT INTO user1 (username, lastname, password) VALUES (?, ?, ?)",
        [username, lastname, password],
        (err, result)=>{
            if(err){
                res.status(500).send('Error al insertar en la base de datos');
                console.log(err);
            }else {
            res.render('register',{ mensaje:'Registro exitoso'})
            console.log('Datos insertados correctamente:', result);
        }
    }
    )
})


server.listen(port, ()=>{
    console.log(`\n Server is running on port ${port}`)
    console.log(`click here: http://localhost:${port}`)
})