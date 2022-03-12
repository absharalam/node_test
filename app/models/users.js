'use strict'


const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');
const bcrypt = require('bcrypt');

class Users extends Sequelize.Model {}

Users.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: Sequelize.STRING,
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: 'EMAIL_EXIST'
        },
    }, 
    password: {
        type: Sequelize.STRING,
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: false
    },
    created_at: {
        type: Sequelize.BIGINT
    },
    updated_at: {
        type: Sequelize.BIGINT
    }
}, { 
    sequelize, 
    modelName: 'users',
    timestamps: false,
    // paranoid: true,
});
Users.beforeCreate((users, options) => {
    if(users.password !== undefined && users.password !== null && users.password !== ""){
        return bcrypt.hash(users.password, 10)
        .then(hashedPassword => {
            users.password = hashedPassword;
        })
        .catch(err => { 
            throw new Error(err); 
        });
    }
});
Users.beforeUpdate((users, options) => {
    if(users.changed('password')){
        // console.log("changed")
        return bcrypt.hash(users.get('password'), 10)
        .then(hashedPassword => {
            return users.password = hashedPassword;
        })
        .catch(err => { 
            throw new Error(err); 
        });
    }
});
Users.sync({alter: true}).then(() => {
    // console.log("user table altered");
});
module.exports = Users;