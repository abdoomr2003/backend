const {sequelize} = require('../config/db');
const {DataTypes} =require('sequelize');
const bcryptjs = require('bcryptjs');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

User.beforeCreate(async (user) => {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);

});

User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        const salt =await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
    }
});

User.prototype.validPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

module.exports = User;
