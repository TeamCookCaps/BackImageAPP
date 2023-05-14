import { pool } from "../loaders/database.js";

export class ChatService {
    constructor({ chat }) {
        this.chat = chat;
    }

    // user1과 user2의 대화 내용 조회
    async getChatMessages(uid1, uid2) {
        const req_query = this.chat.getMessage(uid1, uid2);
        console.log(req_query);
        try {
            const connect = await pool.getConnection(async (conn) => conn);
            const [rows] = await connect.query(req_query);
            connect.release();
            return rows ?? null; //uid1과 uid2의 대화 내용 반환
        } catch (error) {
            throw new Error(error);
        }
    }
    // user1 -> user2 전송한 메세지 저장
    async saveChatMessage(uid1, uid2, chatMessage) {
        let req_query = this.chat.saveMessage(uid1, uid2, chatMessage);
        console.log(req_query);
        try {
            const connect = await pool.getConnection(async (conn) => conn);
            const [rows] = await connect.query(req_query);

            connect.release();

            if (rows.affectedRows != 1) return "db insert error - 컬럼 추가 시 오류가 발생했습니다.";
            else return "success";
        } catch (error) {
            throw new Error(error);
        }
    }
}