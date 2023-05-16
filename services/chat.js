import { pool } from "../loaders/database.js";

export class ChatService {
    constructor({ Chat }) {
        this.Chat = Chat;
    }

    async getChatMessages(uid1, uid2) {
        let req_query = await this.Chat.getMessage(uid1, uid2);
        console.log(req_query);
        try {
            const connect = await pool.getConnection(async (conn) => conn);
            const [rows] = await connect.query(req_query);
            connect.release();
            return rows;
          } catch (error) {
            throw new Error(error);
          }
    }

    async saveChatMessages(uid1, uid2, chatMessage) {
        let req_query = await this.Chat.saveMessage(uid1, uid2, chatMessage);
        console.log(req_query);
        try {
            const connect = await pool.getConnection(async(conn) => conn);
            const [rows] = await connect.query(req_query);
            
            connect.release();
            
            if(rows.affectedRows !=1) return "db insert error - 컬럼 추가 시 오류가 발생했습니다.";
            else return "ok"; 
        } catch (error) {
            throw new Error(error);
        }
    }
}