const route = require("express").Router();
const userCtrl = require('../app/controllers/user.controller');





// ############### User Ad/Post ##################
route.post('/employee', userCtrl.createEmployee);
route.get('/employee', userCtrl.getEmployeeList);
route.get('/employee/:employeeId', userCtrl.getEmployeeDetail);
route.put('/employee/:employeeId', userCtrl.updateEmployeeDetail);
route.delete('/employee/:employeeId', userCtrl.deleteEmployee);
// ############### End ###########################



module.exports = route;