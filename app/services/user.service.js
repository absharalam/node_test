'use strict'

const Users = require('../models/users');

const helper = require('./helper.service');

module.exports = {

    createEmployee: params => {
        return new Promise(async (resolve, reject) => {

            try {
                await Users.create({
                    first_name: params.firstName,
                    last_name: params.lastName,
                    email: params.email,
                    password: params.password,
                    mobile: params.mobile,
                    created_at: helper.epochTimestamp()
                });
                return resolve('SUCCESS');
            } catch (error) {
                return reject(error);
            }
        })
    }
}