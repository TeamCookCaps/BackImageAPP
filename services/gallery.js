import { pool } from "../loaders/database.js";

export class GalleryService {
  constructor({ gallery }) {
    this.gallery = gallery;
  }

  // 스토리 이미지 조회
  async getGalleryImage(uid) {
    const req_query = this.gallery.getGalleryImgQuery(uid);
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