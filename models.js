const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './user.sqlite',
    logging: false
});

const User = sequelize.define('User', {
    name: {
        type: Sequelize.STRING,
        unique: true
    }
});

module.exports = { Sequelize, sequelize, User };