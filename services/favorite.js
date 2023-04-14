import { pool } from "../loaders/database.js";

export class FavoriteService {
  constructor({ FavortieInfo }) {
    this.FavortieInfo = FavortieInfo;
  }

  // 좋아요 처리
  async transFavorite(uid,id) {

    const req_query = this.FavortieInfo.getFavorite(uid,id);
    console.log(req_query);
    try {
      const connect = await pool.getConnection(async (conn) => conn);
      const [rows] = await connect.query(req_query);
      connect.release();

      console.log(rows);
      
      if(rows.length === 0){
        //좋아요 추가 
        const [dbaddLike] = await connect.query(this.FavortieInfo.addFavorite(uid,id));
        connect.release();
        console.log(dbaddLike)
        return 'like'
      }else{
        //이미 좋아요 처리가 된 사용자 이므로
        let like_query;
        if(rows[0].favorite_yn === 'y'){
            like_query = this.FavortieInfo.updateFavorite(id,'n');
            await connect.query(like_query);
            connect.release();
            return 'unlike'
        }else{
            like_query = this.FavortieInfo.updateFavorite(id,'y');
            await connect.query(like_query);
            connect.release();
            return 'like'
        }
      }
    } catch (error) {
        console.log(error);
      throw new Error(error);
    }
  }
}
