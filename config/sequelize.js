const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{
            port: process.env.DATABASE_PORT,
            host: process.env.DATABASE_HOST,
            dialect: 'mysql',
            operatorsAliases: '0',
            pool: {
                max: 5,
                min: 1,
                acquire: 300000,
                idle: 10000
            },
            define: {
                engine: 'InnoDB',
                charset: 'utf8',
                collate: 'utf8_general_ci'
            },
            logging: false, //console.log,
            dialectOptions: {
                // useUTC: false, //for reading from database
                dateStrings: true,
                typeCast: true
            },
            timezone: '+03:00' //for writing to database
    });

sequelize.authenticate()
.then(() => {
// console.log('Connection has been established successfully.');
})
.catch(err => {
// console.error('Unable to connect to the database:', err);
})
.finally(() => {
    // sequelize.close()
});
module.exports = sequelize;