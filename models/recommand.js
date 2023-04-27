const recommand = {
    // 배경화면 추천 쿼리
    getRecommandImage: (uid) => `SELECT * FROM ImageInfo WHERE wallpaper_yn = 'Y' AND uid='${uid}';`,
}

export default recommand;