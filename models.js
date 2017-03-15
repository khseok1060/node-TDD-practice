const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './user.sqlite',
    logging: false
});

const User = sequelize.define('User', {
    name: Sequelize.STRING
});

module.exports = { Sequelize, sequelize, User };