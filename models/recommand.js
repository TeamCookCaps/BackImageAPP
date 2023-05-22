const recommand = {
    // 배경화면 추천 쿼리
    getRecommandImage: (uid) => `SELECT * FROM ImageInfo ii INNER JOIN ImageCategory ic ON ii.id = ic.image_id WHERE wallpaper_yn = 'Y' AND delete_yn = 'N' AND uid='${uid}';`,
}

export default recommand;