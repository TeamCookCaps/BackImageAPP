const User = {
    //회원가입 쿼리 
    registerQuery : (uuid, nick) => `insert into User values('${uuid}', '${nick}')`,
}

export default User;