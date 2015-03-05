exports.onError = function (server, port) {
    return function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                console.log('were actually hitting a server error');
                throw error;
        }
    };
};

/**
 * Event listener for HTTP server "listening" event.
 */
exports.onListening = function (server) {
    return function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
        console.log('listening on: ' + bind);
    }
};

