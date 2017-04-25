let Sequelize = require('sequelize')
let sequelize = require('../../../../../sequelize')

const file = sequelize.define(
    'file', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, unique: true },
        hash: { type: Sequelize.STRING, primaryKey: true },
        size: Sequelize.INTEGER,
        path: Sequelize.STRING,
        type: Sequelize.STRING
    }, {
        underscored: true
    })


module.exports = file
