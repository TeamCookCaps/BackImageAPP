import {pool} from "../loaders/database.js";

export class UserService {
    constructor({User}){
        this.User = User;
    }
    
    // firebase uuid 사용자 저장
    async registerUser(uuid, nick_name){
        let req_query = this.User.registerQuery(uuid,nick_name);
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

    //nick 으로 사용자 검색
    async searchUserInfo(nick){
        let req_query = this.User.getUser(nick);
        console.log(req_query);
        try{
            const connect = await pool.getConnection(async(conn) => conn);
            const [rows] = await connect.query(req_query);
            connect.release();
            return rows; 
        }catch(error){
            throw new Error(error);
        }
    }
}