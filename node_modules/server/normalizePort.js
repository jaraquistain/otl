/**
 * Normalizes port to either a number or a named pipe
 * @param val the port value to be normalized
 * @returns {*}
 */

module.exports = function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) return val;
    if (port >= 0) return port;

    return false;
};