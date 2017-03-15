const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    db: './user.sqlite'
});

const User = sequelize.define('User', {
    name: Sequelize.STRING
});

module.exports = { Sequelize, sequelize, User };