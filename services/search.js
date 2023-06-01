import {pool} from "../loaders/database.js";
import { TinyColor } from '@ctrl/tinycolor';
import { rgbaToLab } from 'color-diff';

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

    // 유사한 색상 검색 함수
    calculateColorDifference(color1, color2) {

        // const diffR = color1.R - color2.R;
        // const diffG = color1.G - color2.G;
        // const diffB = color1.B - color2.B;
        // return Math.sqrt(diffR * diffR + diffG * diffG + diffB * diffB);

        const labColor1 = this.rgbToLab(color1);
        const labColor2 = this.rgbToLab(color2);

        const diffL = labColor1.l - labColor2.l;
        const diffA = labColor1.a - labColor2.a;
        const diffB = labColor1.bb - labColor2.bb;

        return Math.sqrt(diffL * diffL + diffA * diffA + diffB * diffB);
    }

    rgbToLab(color) {
        const r = color.r / 255;
        const g = color.g / 255;
        const b = color.b / 255;
      
        let x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
        let y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
        let z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;
      
        x /= 0.95047;
        y /= 1.00000;
        z /= 1.08883;
      
        const fx = x > 0.008856 ? Math.cbrt(x) : (903.3 * x + 16) / 116;
        const fy = y > 0.008856 ? Math.cbrt(y) : (903.3 * y + 16) / 116;
        const fz = z > 0.008856 ? Math.cbrt(z) : (903.3 * z + 16) / 116;
      
        const l = Math.max(0, 116 * fy - 16);
        const a = 500 * (fx - fy);
        const bb = 200 * (fy - fz);
      
        return { l, a, bb };
      }

    //word, color 함께 검색
    async searchWordColor(uid, word, color){
        //데이터베이스에 저장된 전체 색상 가져오기
        const result = await this.findSimilarColorIdDB();
        const colorData = [];
        
        for(const r of result){
            colorData.push({ image_id : r.image_id, rgb :{r : r.r, g : r.g, b : r.b,}});
        }

        //입력받은 색상 rgb 값으로 변경
        const inputColor = this.hexToRGB(color);

        console.log("inputColor");
        console.log(inputColor);

        const similarColorsImageId = [];

        for(const color of colorData){
            const diff = this.calculateColorDifference(inputColor,color.rgb);
            
            if(diff <= 10){
                similarColorsImageId.push(color.image_id);
                console.log(this.RGBToHex(color.rgb));
            }
        }
        
        console.log("similarColorsImageId");
        console.log(similarColorsImageId);

        if(similarColorsImageId?.length === 0) similarColorsImageId.push(0);

        //유사한색상의 이미지 id 로 검색
        let req_query = this.ImageInfo.getSearchWordColorResult(uid, word ,similarColorsImageId);
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

    async searchWordColor2(uid, word,color){
        // 유사한 색상 찾기
        const analogousRed = [];
        const analogousGreen = [];
        const analogousBlue = [];
        const colors = new TinyColor(color).analogous(20);
        
        colors.map( t => {
            console.log(t);
            analogousRed.push(Math.floor(t.r));
            analogousGreen.push(Math.floor(t.g));
            analogousBlue.push(Math.floor(t.b));
        });

        console.log(analogousRed);
        console.log(analogousGreen);
        console.log(analogousBlue);

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
        return { r:r, g:g,b:b };
    }
    
    /**
     * 색상 범위에서 유사한 색상을 찾아 그 색상의 id배열을 반환하는 함수
     * @param {Array} rgbValues r,g,b 형태의 배열
     * @returns image_id 배열
     */
    async findSimilarColorIdDB(rValue,gValue,bValue) {

        //let query = this.ImageInfo.getSimilarColors(rValue,gValue,bValue);
        let query = this.ImageInfo.getImageColor();
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