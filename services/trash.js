import { pool } from "../loaders/database.js";

export class TrashService {
  constructor({ trash }) {
    this.trash = trash;
  }

  // delete_yn == 'Y'인 이미지 조회
  async getTrashImage(uid) {
    const req_query = this.trash.getTrashImageQuery(uid);
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

  // 휴지통 전체 삭제
  async removeAllImage(trashId) {
    const req_query = this.trash.removeAllImage(trashId);
    console.log(req_query);
    try {
      const connect = await pool.getConnection(async (conn) => conn);
      const result = await connect.query(req_query);
      connect.release();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  // 휴지통 전부 복구
  async restoreAllImage(trashId) {
    const req_query = this.trash.restoreAllImage(trashId);
    console.log(req_query);
    try {
      const connect = await pool.getConnection(async (conn) => conn);
      const result = await connect.query(req_query);
      connect.release();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  // 사진 한 장 삭제
  async removeOneImage(uid, trashId) {
    const req_query = this.trash.removeOneImage(uid, trashId);
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
