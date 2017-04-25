let Sequelize = require('sequelize')

const sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: 'database.db',
  logging: false
})
module.exports = sequelize
