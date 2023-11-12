import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

// API ENDPOINT SEERVIDOR REST TRADICIONAL
router.get('/mensajes',  ( req , res ) => { 

    res.json({
        ok: true,
        mensaje: 'todo esta bien!!!'
    });

});

router.post('/mensajes',  ( req , res ) => { 

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    // Conectamos con el servidor a mensaje-nuevo para todos los usuarios
    const  server = Server.instance;
    server.io.emit('mensaje-nuevo', payload)

    res.json({
        ok: true,
        mensaje: 'POST listo',
        cuerpo,
        de
    });

});

router.post('/mensajes/:id',  ( req , res ) => { 
    
    const id = req.params.id;
    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const payload = {
        de,
        cuerpo
    }

    // Conectamos con el servidor para que apunte a un usuario
    const  server = Server.instance;
    server.io.in( id ).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        mensaje: 'POST listox',
        cuerpo,
        de,
        id
    });

});

// Obtener todos los ids de los usuarios
router.get('/usuarios',(req:Request,res:Response)=>{
    const server=Server.instance;
    server.io.allSockets().then((clientes)=>{
        res.json({
            ok:true,
            clientes: Array.from(clientes)
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });
});

// Obtener todos los ids de los usuarios y sus nombres desde node
router.get('/usuarios/detalle',(req:Request,res:Response)=>{

    const server=Server.instance;
    server.io.allSockets().then((clientes)=>{
        res.json({
            ok:true,
            clientes: usuariosConectados.getLista()
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });
});



export default router;