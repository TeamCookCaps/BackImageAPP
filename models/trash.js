const trash = {
  // 이미지 삭제/복구 쿼리
  getTrashImageQuery: (uid) =>
    `SELECT * FROM ImageInfo WHERE delete_yn = 'Y' AND uid='${uid}';`,
  removeAllImage: (trashId) =>
    `DELETE FROM ImageInfo WHERE id in (${trashId});`,
  restoreAllImage: (trashId) =>
    `UPDATE ImageInfo SET delete_yn = 'N' WHERE id in (${trashId});`,
  removeOneImage: (uid, trashId) =>
    `UPDATE ImageInfo SET delete_yn='Y' WHERE id='${trashId}' and uid='${uid}'`,
};

export default trash;
