const Sequelize = require('sequelize');
const dotenv =  require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,{
		host: 'localhost',
		dialect: 'mysql'
	}
);
const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('DataBase authenticated successfully');
		await sequelize.sync({alter: false});
		console.log('Datebase synced successfuly');
	} catch (error) {
		console.error('Unable to connect to DateBase');
		process.exit(1);
	}
};
module.exports = {sequelize, connectDB};