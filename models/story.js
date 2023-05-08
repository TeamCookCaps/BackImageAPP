const story = {
    getStoryImgQuery: (uid) => `select * from ImageInfo where story_yn = 'Y' and delete_yn = 'N' and uid='${uid}'`
};

export default story;