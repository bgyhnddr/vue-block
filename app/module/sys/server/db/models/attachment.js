let Sequelize = require('sequelize')
let sequelize = require('../../../../../sequelize')

const attachment = sequelize.define(
    'attachment', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        file_hash: Sequelize.STRING,
        name: Sequelize.STRING
    }, {
        underscored: true
    })


module.exports = attachment
