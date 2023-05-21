import { pool } from "../loaders/database.js";

export class GalleryService {
  constructor({ gallery }) {
    this.gallery = gallery;
  }

  // 갤러리 이미지 조회
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

  async saveGalleryDescription(id, description) {
    const req_query = this.gallery.saveGalleryDescription(id, description);
    console.log(req_query);
    try {
      const connect = await pool.getConnection(async (conn) => conn);
      const [rows] = await connect.query(req_query);
      connect.release();
      if(rows.affectedRows !=1) return "db insert error - 컬럼 추가 시 오류가 발생했습니다.";
      else return "ok";
    } catch (error) {
      throw new Error(error);
    }
  }

  async getGalleryDescription(id) {
    const req_query = this.gallery.getGalleryDescription(id);
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