var db_conn = require('./db_conn')()

var client = db_conn.createLocalConn();
db_conn.openConn(client);


// client.query('use ' + DB);

module.exports = query;

function query() {
  return {
    saveSocketId: function(phone, socketId) {
      client.query('UPDATE installer SET socket_id =? WHERE phone = ?', [socketId, phone], function(err, results, fields) {
        if (err) throw err;
      })
    },
    checkUser: function(email, cb) {
      client.query('SELECT count(*) FROM user WHERE email = ?', [email], function(err, results, fields) {
        if (err) throw err;
        if (results > 0) {
          cb(true);
        } else {
          cb(false)
        }
      })
    },
    selectGroup: function(groupId, cb) {
      client.query("SELECT * FROM group_info WHERE id = ?", [groupId], function(err, results, fields) {
        if (err) throw err;
        cb(results)
      });
    },
    selectGroupsByHostUser: function(email, cb) {
      client.query("SELECT * FROM group_info WHERE host_email = ?", [email], function(err, results, fields) {
        if (err) throw err;
        cb(results)
      });
    },
    selectGroupMembers: function(groupId, cb) {

      client.query("select * from group_members where group_id = ?", [groupId], function(err, results, fields) {
        if (err) throw err;
        // var members = results.map(function(d, i) {
        //   console.log(d.user_id)
        //   return d.user_id;
        // })

        cb(results)
      });
    },
    select: function(table, cb) {
      client.query('SELECT * FROM ' + table, [], function(err, results, fields) {
            if (err) throw err;
            cb(results);
          }
      )
    },

    selectByUserId: function(userId, cb) {
      client.query('SELECT * FROM user WHERE email = ?', [userId], function(err, results, fields) {
            if (err) throw err;
            cb(results[0]);
          }
      )
    },
    selectGroupByUsername: function(username, cb) {
      client.query('select a.*, b.group_name from group_members a, group_info b where a.user_id = ? and a.group_id = b.id', [username], function(err, results, fields) {
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
