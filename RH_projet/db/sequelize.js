const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    'rh',
    'root',
    '', {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timeZone: 'Etc/GMT-2'
        },
        logging: false
    }
)
module.exports = { sequelize }