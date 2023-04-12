import {pool} from "../loaders/database.js";

export class DeleteService {
    constructor({ ImageInfo }) {
        this.ImageInfo = ImageInfo;
    }

    // delete_yn == 'Y'인 이미지 조회
    async getTrashImage(uid) {
        const req_query = this.ImageInfo.getTrashImageQuery(uid);
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
}