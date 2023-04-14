const FavortieInfo = {
    // 좋아요 정보 추가
    addFavorite : (uid,image_id) => `insert into FavoriteInfo(uid,imageid) values('${uid}','${image_id}')`,
    // 좋아요 있는지 체크
    // getFavorite : (uid,image_id) => `EXPLAIN select * from FavoriteInfo where uid='${uid}' and imageid = '${image_id}'`,
    getFavorite : (uid,image_id) => `select favorite_yn from FavoriteInfo where uid='${uid}' and imageid = '${image_id}'`,
    // 좋아요 상태값 변경하기
    updateFavorite : (image_id,favorite_yn) => `update FavoriteInfo set favorite_yn ='${favorite_yn}' where imageid=${image_id}`
};
  
export default FavortieInfo;
  