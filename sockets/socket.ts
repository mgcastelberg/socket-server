import socketIO from 'socket.io';
// (cliente: socketIO.Socket)
export const desconectar = (cliente: socketIO.Socket) => {

    // para detectar la desconexion
    cliente.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

}

// Escuchar Mensajes
export const mensaje = ( cliente: socketIO.Socket, io: socketIO.Server ) => {
    cliente.on('mensaje', ( payload: { de:string, cuerpo:string } ) => {
        console.log('mensaje recibido', payload);


        // Emitirlo
        io.emit('mensaje-nuevo', payload);


    });
}