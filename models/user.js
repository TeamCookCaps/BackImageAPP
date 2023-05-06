const User = {
    //회원가입 쿼리 
    registerQuery : (uuid, nick, profile_img) => `insert into User values('${uuid}', '${nick}','${profile_img}')`,
    getUser : (nick) => `select * from User where nick_name like '%${nick}%'`,
}

export default User;