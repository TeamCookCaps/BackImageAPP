const User = {
    //회원가입 쿼리 
    registerQuery : (uuid, nick) => `insert into User values('${uuid}', '${nick}')`,
}

export default User;

// export class User extends sequelize.Model{
//     static init(sequelize){
//         return super.init({
//             uid : {
//                 type:Sequelize.STRING(60),
//                 allowNull:false,
//                 unique:true,
//             },
//             nick_name : {
//                 type : Sequelize.STRING(50),
//                 allowNull:false,
//             }
//         },{
//             sequelize,
//             timestamps: true,
//             underscored: false,
//             modelName: 'User',
//             tableName: 'User',
//             paranoid: true,
//             charset: 'utf8',
//             collate: 'utf8_general_ci',
//         })
//     }
//     static associate(db) {}
// }