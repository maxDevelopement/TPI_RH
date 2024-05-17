const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    'tpi_rh_db2',
    'tpi_rh_user2',
    'tpiUser2024@', {
        host: 'web24.swisscenter.com',
        dialect: 'mariadb',
        port: 3306,
        dialectOptions: {
            timeZone: 'Etc/GMT-2'
        },
        logging: false
    }
)
module.exports = { sequelize }



