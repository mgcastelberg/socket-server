"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
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
    const payload = {
        de,
        cuerpo
    };
    // Conectamos con el servidor a mensaje-nuevo para todos los usuarios
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
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
    const payload = {
        de,
        cuerpo
    };
    // Conectamos con el servidor para que apunte a un usuario
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        mensaje: 'POST listox',
        cuerpo,
        de,
        id
    });
});
exports.default = router;
