"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuarios = exports.configurarUsuario = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.usuariosConectados = void 0;
const usuarios_lista_1 = require("../classes/usuarios-lista");
const usuario_1 = require("../classes/usuario");
// Patron singleton
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
const conectarCliente = (cliente, io) => {
    // almacenar un usuario en la lista de usuarios
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.conectarCliente = conectarCliente;
// (cliente: socketIO.Socket)
const desconectar = (cliente, io) => {
    // para detectar la desconexion
    cliente.on('disconnect', () => {
        console.log('Usuario desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
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
// Configurar usuario
const configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizar_nombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}. configurado`
        });
        // Emitirlo
        // io.emit('mensaje-nuevo', payload);
    });
};
exports.configurarUsuario = configurarUsuario;
// Obtener usuarios
const obtenerUsuarios = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        // io.emit('usuarios-activos', usuariosConectados.getLista()); //Para todos
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista()); //Para solo el usuario que esta entrando
    });
};
exports.obtenerUsuarios = obtenerUsuarios;
