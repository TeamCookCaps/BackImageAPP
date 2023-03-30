import { pool } from "../loaders/database.js";

export class ImageInfoService {
  constructor({ ImageInfo }) {
    this.ImageInfo = ImageInfo;
  }

  // uid로 이미지 정보 조회
  async getImageInfo(uid) {
    const req_query = this.ImageInfo.getImageInfoQuery(uid);
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
