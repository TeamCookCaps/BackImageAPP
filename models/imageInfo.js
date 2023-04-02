const ImageInfo = {
  // 이미지 정보 쿼리
  getImageInfoQuery: (uid) => `SELECT * FROM imageinfo where uid='${uid}'`,
  getSearchResult :(word) => `select id,uid,image_url,image_date,image_location,image_width,image_height,b.category_name
                              from ImageInfo a INNER JOIN ImageCategory b ON a.id = b.image_id 
                              INNER JOIN parent_category c on b.category_name = c.category_name 
                              where image_location like '%${word}%' or b.category_name like '%${word}%' or parent_name like '%${word}%';`,
};

export default ImageInfo;
