import { Router, Request, Response } from 'express';

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

    res.json({
        ok: true,
        mensaje: 'POST listo',
        cuerpo,
        de,
        id
    });

});

export default router;