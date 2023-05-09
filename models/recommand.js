const recommand = {
    // 배경화면 추천 쿼리
    getRecommandImage: (uid) => `SELECT * FROM ImageInfo WHERE wallpaper_yn = 'Y' AND delete_yn = 'N' AND uid='${uid}';`,
}

export default recommand;