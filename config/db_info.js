module.exports = dbInfo;

function dbInfo() {
  return {
    local: {
      host: 'localhost',
      port: '3307',
      user: 'root',
      password: '',
      database: 'sm_prj'
    },
    centos: {
      host: '13.125.103.196',
      port: '3309',
      user: 'root',
      password: '',
      database: 'sm_prj'
    }
  }
}

