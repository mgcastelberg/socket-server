"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// API ENDPOINT SEERVIDOR REST TRADICIONAL
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'todo esta bien!!!'
    });
});
router.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    res.json({
        ok: true,
        mensaje: 'POST listo',
        cuerpo,
        de
    });
});
router.post('/mensajes/:id', (req, res) => {
    const id = req.params.id;
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    res.json({
        ok: true,
        mensaje: 'POST listo',
        cuerpo,
        de,
        id
    });
});
exports.default = router;
