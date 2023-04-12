const ImageInfo = {
  // 이미지 정보 쿼리
  getImageInfoQuery: (uid) => `SELECT * FROM ImageCategory ic
                                  INNER JOIN ImageInfo ii ON ic.image_id = ii.id
                                  INNER JOIN CategoryInfo ci ON ic.category_name = ci.category_name
                                  LEFT JOIN parent_category pc ON ic.category_name = pc.category_name WHERE uid='${uid}'`,
                                  
  getSearchResult :(word) => `select id,uid,image_url,image_date,image_location,image_width,image_height,b.category_name,parent_name
                              from ImageInfo a INNER JOIN ImageCategory b ON a.id = b.image_id 
                              LEFT OUTER JOIN parent_category c on b.category_name = c.category_name 
                              where image_location like '%${word}%' or b.category_name like '%${word}%' or parent_name like '%${word}%';`,
                              
  getSearchWordColorResult : (word,image_id) => `select id,uid,image_url,image_date,image_location,image_width,image_height,b.category_name,parent_name,rgb_info
                                                from ImageInfo a INNER JOIN ImageCategory b ON a.id = b.image_id 
                                                LEFT OUTER JOIN parent_category c on b.category_name = c.category_name 
                                                INNER JOIN (
                                                select image_id, json_arrayagg(json_object('red',r,'green',g,'blue',b,'type',rgb_type)) as rgb_info
                                                from palette
                                                group by palette.image_id) d on b.image_id = d.image_id
                                                where b.image_id in(${image_id}) and (image_location like '%${word}%' 
                                                or b.category_name like '%${word}%'
                                                or parent_name like '%${word}%');`,
  getSimilarColors : (listR,listG,listB) => `SELECT image_id FROM palette WHERE r in(${listR}) AND g in(${listG}) AND b in(${listB})`,
  getTrashImageQuery: (uid) => `SELECT * FROM ImageInfo WHERE delete_yn = 'Y' AND uid='${uid}'`
};

export default ImageInfo;
