const gallery = {
    getGalleryImgQuery: (uid) => `select * from ImageInfo where gallery_yn = 'Y' and delete_yn = 'N' and uid='${uid}'`
};

export default gallery;