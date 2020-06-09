// Update with your config settings.

module.exports = {

  development: {
    client: process.env.KNEX_CLIENT,
    connection: {
      host : 'localhost',
      user : 'root',
      password : '',
      database : 'carteira-vacinacao-online'
    }
  },

  production: {
    client: process.env.KNEX_CLIENT,
    connection: {
      host : 'sql10.freemysqlhosting.net',
      database: 'sql10346494',
      user:     'sql10346494',
      password: 'ncrPlMdgIW'
    }
  }

};
