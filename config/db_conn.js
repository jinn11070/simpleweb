var mysql = require('mysql');
var configLocal = require('./db_info')().local;

module.exports = dbConn;

function dbConn() {
  return {
    /* 새로운 커넥트 생성*/
    createLocalConn: function() {
      return mysql.createConnection({
        host: configLocal.host,
        port: configLocal.port,
        user: configLocal.user,
        password: configLocal.password,
        database: configLocal.database
      })
    },

    /* 커넥트 열기 */
    openConn: function(conn) {
      conn.connect(function(err) {
        if (err) console.error('openConn:mysql connection error :' + err);
        else console.info('openConn:mysql is connected successfully.');
      })
    }
  }
}