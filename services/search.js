import {pool} from "../loaders/database.js";
import { TinyColor } from '@ctrl/tinycolor';

export class SearchService {
    constructor({ImageInfo}){
        this.ImageInfo = ImageInfo;
    }
    
    async searchWord(uid, word){
        let req_query = this.ImageInfo.getSearchResult(uid, word);
        console.log(req_query);
        
        try {
            const connect = await pool.getConnection(async(conn) => conn);
            const [rows] = await connect.query(req_query);
            connect.release();
            return rows; 
        } catch (error) {
            throw new Error(error);
        }
    }

    //word, color 함께 검색
    async searchWordColor(uid, word,color){
        // 유사한 색상 찾기
        const analogousRed = [];
        const analogousGreen = [];
        const analogousBlue = [];
        const colors = new TinyColor(color).analogous();
        colors.map( t => {
            console.log(t);
            analogousRed.push(Math.floor(t.r));
            analogousGreen.push(Math.floor(t.g));
            analogousBlue.push(Math.floor(t.b));
        });

        const result = await this.findSimilarColorIdDB(analogousRed,analogousGreen,analogousBlue);

        //색상 배열로 저장
        const arr = []
        result.map(item => arr.push(item['image_id']));
        if(arr?.length === 0) arr.push("0");

        let req_query = this.ImageInfo.getSearchWordColorResult(uid, word,arr);
        console.log(req_query);

        try {
            const connect = await pool.getConnection(async(conn) => conn);
            const [rows] = await connect.query(req_query);
            connect.release();

            console.log(rows)
            return rows; 
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * rgb 값을 hex로 변환하는 함수
     * @param {Array} rgb r,g,b 형태의 배열
     * @returns hex값
     */
    RGBToHex(rgb) {
        const r = rgb.r.toString(16).padStart(2, '0');
        const g = rgb.g.toString(16).padStart(2, '0');
        const b = rgb.b.toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
    }

    /**
     * hex값을 rgb값으로 변환하는 함수
     * @param {string} hexCode hex형태의 string 
     * @returns rgb 값
     */
    hexToRGB(hexCode) {
        const r = parseInt(hexCode.slice(1, 3), 16);
        const g = parseInt(hexCode.slice(3, 5), 16);
        const b = parseInt(hexCode.slice(5, 7), 16);
        return { r, g, b };
    }
    
    /**
     * 색상 범위에서 유사한 색상을 찾아 그 색상의 id배열을 반환하는 함수
     * @param {Array} rgbValues r,g,b 형태의 배열
     * @returns image_id 배열
     */
    async findSimilarColorIdDB(rValue,gValue,bValue) {

        let query = this.ImageInfo.getSimilarColors(rValue,gValue,bValue);
        try {
            const connect = await pool.getConnection(async(conn) => conn);
            const [rows] = await connect.query(query);
            connect.release();
            return rows; 
        } catch (error) {
            throw new Error(error);
        }
    }
}