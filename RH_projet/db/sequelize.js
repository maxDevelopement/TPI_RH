const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    'tpi_rh_db',
    'tpi_rh_user',
    'tpiRHuser2024@', {
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



