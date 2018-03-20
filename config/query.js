var db_conn = require('./db_conn')()

var client = db_conn.createLocalConn();
db_conn.openConn(client);


// client.query('use ' + DB);

module.exports = query;

function query() {
  return {
    select: function(table, cb) {
      client.query('SELECT * FROM ' + table, [], function(err, results, fields) {
            if (err) throw err;
            cb(results);
          }
      )
    },

    searchByUsername: function(table, username, cb) {
      client.query('SELECT * FROM ' + table + ' WHERE id = ?', [username], function(err, results, fields) {
            if (err) throw err;
            cb(results);
          }
      )
    },

    insert: function (table, params, cb) {
      client.query('INSERT INTO ' + table + ' (id, pw) VALUES (?,?)', params, function(err, results, fields) {
            if (err) throw err;
            cb(results);
          }
      )
    },

  }
}

/*
 var query = module.exports = {
 insert: function (member, res) {
 client.query(
 /!*sql*!/
 'INSERT INTO ' + TABLE + ' SET id = ? , pw = ?',

 /!*param*!/
 [member.id, member.pw],

 /!*collback*!/
 query.select(member, res, err)
 )
 },

 select: function(member, res, err) {
 client.query(
 /!*sql*!/
 'SELECT * FROM ' + TABLE + ' WHERE id = ?',

 /!*param*!/
 [member.id],

 /!*collback*!/
 query.result(res, err, results, fields)

 )
 },

 result: function(res, err, results, fields) {
 if (err) throw err;
 res.render('join-result', {
 'title': '회원조회',
 'id': results[0].id,
 'usr_id': results[0].usr_id,
 'usr_nm': results[0].usr_nm
 })
 }
 }
 */

