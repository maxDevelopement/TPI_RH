const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    'db_name',
    'db_user',
    'db_mdp', {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timeZone: 'Etc/GMT-2'
        },
        logging: false
    }
)
module.exports = { sequelize }