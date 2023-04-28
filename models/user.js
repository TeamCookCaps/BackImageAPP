const User = {
    //회원가입 쿼리 
    registerQuery : (uuid, nick) => `insert into User values('${uuid}', '${nick}')`,
    getUser : (nick) => `select * from User where nick_name="${nick}"`,
}

export default User;