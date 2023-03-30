const ImageInfo = {
  // 이미지 정보 쿼리
  getImageInfoQuery: (uid) => `SELECT * FROM imageinfo where uid='${uid}'`,
};

export default ImageInfo;
