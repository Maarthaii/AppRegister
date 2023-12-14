//IMPORTACIONES
const mysql=require('mysql');
const express=require('express');
const morgan=require('morgan');
const path=require('path');
const cors =require('cors');
const {engine} =require('express-handlebars');
const bodyParser = require('body-parser');

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
    host: 'localhost',
    user: 'root',
    password: '30888898Liyi',
    port: '3306',
    database: 'userData'
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