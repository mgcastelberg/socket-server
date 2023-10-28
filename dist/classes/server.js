"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enviroment_1 = require("../global/enviroment");
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const miSocket = __importStar(require("../sockets/socket"));
class Server {
    // patron singleton
    constructor() {
        this.app = (0, express_1.default)();
        this.port = enviroment_1.SERVER_PORT;
        // socket y express no son compatible directamente por eso importamos http
        this.httpServer = new http_1.default.Server(this.app);
        // // Para la version socket.io@2.2.0:
        // this.io = socketIO( this.httpServer ); //profe
        // Para versiones mas recientes
        this.io = new socket_io_1.default.Server(this.httpServer, { cors: { origin: true, credentials: true } }); // comunidad
        // this.io : tiene el conocimiento de que personas estan conectadas
        this.escucharSockets();
    }
    // Creamos metodo que llamara singleton
    static get instance() {
        // Si ya existe una instancia regresa la existente si no crea una nueva
        return this._instance || (this._instance = new this());
    }
    escucharSockets() {
        console.log('escuchando conexiones');
        this.io.on('connection', (cliente) => {
            console.log('Cliente conectado');
            // Mensajes
            miSocket.mensaje(cliente, this.io);
            // Desconectar
            miSocket.desconectar(cliente);
        }); // es para escuchar u conection
    }
    start(callback) {
        // this.app.listen( this.port, callback() ); //en lugar de inicialiar la app vamos a inicializar el httpServer
        this.httpServer.listen(this.port, callback());
    }
}
exports.default = Server;
