"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensaje = exports.desconectar = void 0;
// (cliente: socketIO.Socket)
const desconectar = (cliente) => {
    // para detectar la desconexion
    cliente.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
};
exports.desconectar = desconectar;
// Escuchar Mensajes
const mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('mensaje recibido', payload);
        // Emitirlo
        io.emit('mensaje-nuevo', payload);
    });
};
exports.mensaje = mensaje;
