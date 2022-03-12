'use strict'

const Users = require('../models/users');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../config/sequelize');

const helper = require('./helper.service');

module.exports = {

    createEmployee: params => {
        return new Promise(async (resolve, reject) => {

            try {
                await Users.create({
                    employee_name: params.employeeName,
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
    },
    getEmployeeList: params => {
        return new Promise((resolve, reject) => {
                let pageNumber, numberOfRecordsPerPage = 25;
                if(params.pageNumber !== undefined && params.pageNumber !== ""){
                    pageNumber = parseInt(params.pageNumber);
                }
                let offset = (pageNumber - 1) * numberOfRecordsPerPage;
                let sortColumn = (params.sortColumn !== undefined && params.sortColumn !== null) ? params.sortColumn : "id";
                let sortDirection = (params.sortDirection !== undefined && params.sortDirection !== null) ? params.sortDirection : "desc";
                // end pagination calculation 
                
                let replacements = {
                    offset: offset,
                    numberOfRecordsPerPage: numberOfRecordsPerPage,
                    sortColumn: sortColumn,
                    sortDirection: sortDirection
                }

                let sqlPromise = [];
                let sqlCount = "SELECT count(*) totalRows FROM users WHERE 1";

                let sql = "SELECT id, employee_name, email, mobile, created_at FROM users WHERE 1";
            
                if(params.employeeName !== undefined && params.employeeName !== null && params.employeeName !== ""){
                    sql += " AND employee_name LIKE :employeeName";
                    sqlCount += " AND employee_name LIKE :employeeName";
                    replacements.employeeName = "%"+params.employeeName+"%";
                } 

                sql += " ORDER BY "+sortColumn+ " "+sortDirection;        
                if(params.pageNumber !== undefined && params.pageNumber > 0)
                    sql += ' LIMIT :offset, :numberOfRecordsPerPage';

                sqlPromise.push(sequelize.query(sql, { replacements: replacements, type: Sequelize.QueryTypes.SELECT }));
                if(params.pageNumber !== undefined && params.pageNumber > 0)
                    sqlPromise.push(sequelize.query(sqlCount, { replacements: replacements, type: Sequelize.QueryTypes.SELECT }));
                return Promise.all(sqlPromise)
                .then(result => {
                    let responseObject = {}
                    if(params.pageNumber !== undefined && params.pageNumber > 0){
                        responseObject.pageName = pageNumber;
                        responseObject.totalRows = result[1][0].totalRows;
                        responseObject.numberOfRecordsPerPage = numberOfRecordsPerPage;
                    }
                    
                    responseObject.data = result[0];
                    return resolve(responseObject);
                })
                .catch(error => {
                    console.log(error)
                    return reject(Error(error.message));
                })
        })
    },
    getEmployeeDetail: params => {
        return new Promise(async(resolve, reject) => {
            try {
                let employeeDetail = await Users.findOne({
                    where: {
                        id: params.employeeId
                    }
                })
                return resolve(employeeDetail);
            } catch (error) {
                return reject(error)
            }
        })
    },
    updateEmployeeDetail: params => {
        return new Promise(async(resolve, reject) => {
            try {
                let dataTobeUpdate = {};
                if(params.employeeName !== undefined){
                    dataTobeUpdate.employee_name = params.employeeName;
                }
                if(params.email !== undefined){
                    dataTobeUpdate.email = params.email;
                }
                if(params.password !== undefined){
                    dataTobeUpdate.password = params.password;
                }
                if(params.mobile !== undefined){
                    dataTobeUpdate.mobile = params.mobile;
                }                
                dataTobeUpdate.updated_at = helper.epochTimestamp();                
                await Users.update(dataTobeUpdate, {
                    where: {
                        id: params.employeeId
                    }
                })
                return resolve("SUCEESS");
            } catch (error) {
                return reject(error)
            }
        })
    }
}