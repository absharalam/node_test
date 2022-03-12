# node_test
Sulhuf Company test

API LIST

POST http://localhost:9000/employee
  request: {
	"employeeName": "Abshar Alam",
  	"email": "absharmca786@gmail.com",
  	"password": "123456",
  	"mobile": "89786767"
}

GET http://localhost:9000/employee

PUT http://localhost:9000/employee/{:employeeId}
  request: {
	"employeeName": "Abshar Alam",
  	"email": "absharmca@gmail.com",
  	"password": "123456",
  	"mobile": "89786767"
}

GET http://localhost:9000/employee/{:employeeId}

DELETE http://localhost:9000/employee/{:employeeId}
