"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosLista = void 0;
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    agregar(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    actualizar_nombre(id, nombre) {
        for (const usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('====== Actualizando Usuario');
        console.log(this.lista);
    }
    getLista() {
        // return this.lista;
        return this.lista.filter(usuario => {
            // console.log(usuario.nombre);
            return usuario.nombre != 'sin-nombre';
        });
    }
    getUsuario(id) {
        return this.lista.find(usuario => {
            return usuario.id === id;
        });
    }
    // Obtener usuarios en una sala en particular
    getUsuariosEnSala(sala) {
        return this.lista.filter(usuario => {
            return usuario.sala === sala;
        });
    }
    // Borrar un usuario al desconectarse
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => {
            return usuario.id !== id;
        });
        console.log(this.lista);
        return tempUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;
