const story = {
    getStoryImgQuery: (uid) => `select * from ImageInfo where story_yn = 'Y' and uid='${uid}'`
};

export default story;