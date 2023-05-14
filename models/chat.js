const Chat = {
    //채팅 메세지 저장 쿼리
    saveMessage : (uid1, uid2, message) => `insert into chatInfo values('${uid1}', '${uid2}', '${message}')`,
    //채팅 메세지 조회 쿼리
    getMessage : (uid1, uid2) => `select uid1, message from chatInfo where (uid1 = '%${uid1}%' and uid2 = '%${uid2}%') or (uid1 = '%${uid2}%' and uid2 = '%${uid1}%')`
}

export default Chat;