const gallery = {
    getGalleryImgQuery: (uid) => `select * from ImageInfo where gallery_yn = 'Y' and delete_yn = 'N' and uid = '${uid}'`,
    saveGalleryDescription: (id, description) => `update ImageInfo set description = '${description}' where id = '${id}'`,
    getGalleryDescription: (id) => `select description from ImageInfo where id = '${id}'`
};

export default gallery;