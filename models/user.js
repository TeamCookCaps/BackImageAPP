const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            uid : {
                type:Sequelize.STRING(60),
                allowNull:false,
                unique:true,
            },
            nick_name : {
                type : Sequelize.STRING(50),
                allowNull:false,
            }
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'User',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_0900_ai_ci',
        })
    }
}