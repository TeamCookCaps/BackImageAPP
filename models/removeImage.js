const removeImage = {
    // 이미지 삭제/복구 쿼리
    getTrashImageQuery: (uid) => `SELECT * FROM ImageInfo WHERE delete_yn = 'Y' AND uid='${uid}';`,
    removeAllImage: (trashList) => `DELETE FROM ImageInfo WHERE id in (${trashList});`
}

export default removeImage;