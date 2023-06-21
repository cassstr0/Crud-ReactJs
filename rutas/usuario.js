const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const schema = mongoose.Schema

const schemausuario = new schema({
    nombre: String,
    email: String,
    telefono: String,
    idusuario: String,
})

const ModeloUsuario = mongoose.model('usuarios', schemausuario)
module.exports = router


//RUTA DE PRUEBA
/*router.get('/ejemplo', (req, res) => {
    res.end('hola mndo!')
})*/


//AGREGAR USUARIO 

router.post('/agregar-usuario', async (req, res) => {
    try {
        const nuevousuario = new ModeloUsuario({
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono,
            idusuario: req.body.idusuario,
        });

        await nuevousuario.save();
        res.send('Usuario agregado correctamente');
    } catch (err) {
        res.send(err);
    }
});


//OBTENENR USUARIOS

router.get('/obtener-usuarios', async (req, res) => {
    try {
        const usuarios = await ModeloUsuario.find().exec();
        res.send(usuarios);
    } catch (err) {
        res.send(err);
    }
});


//OBTENER DATA DE USUARIO

router.post('/obtener-data-usuario', async (req, res) => {
    try {
        const usuarios = await ModeloUsuario.find({ idusuario: req.body.idusuario }).exec();
        res.send(usuarios);
    } catch (err) {
        res.send(err);
    }
});


//ACTUALIZAR USUARIO

router.post('/actualizar-usuario', async (req, res) => {
    try {
        await ModeloUsuario.findOneAndUpdate(
            { idusuario: req.body.idusuario },
            {
                nombre: req.body.nombre,
                email: req.body.email,
                telefono: req.body.telefono
            }
        );
        res.send('Usuario actualizado correctamente');
    } catch (err) {
        res.send(err);
    }
});


//BORRAR USUARIO

router.post('/borrar-usuario', async (req, res) => {
    try {
        await ModeloUsuario.findOneAndDelete({ idusuario: req.body.idusuario });
        res.send('Usuario borrado correctamente');
    } catch (err) {
        res.send(err);
    }
});

