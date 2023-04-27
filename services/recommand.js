import { pool } from "../loaders/database.js";

export class RecommandImageService {
  constructor({ recommand }) {
    this.recommand = recommand;
  }

  // uid로 이미지 정보 조회
  async getRecommandImage(uid) {
    const req_query = this.recommand.getRecommandImage(uid);
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
