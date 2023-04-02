import {pool} from "../loaders/database.js";

export class SearchService {
    constructor({ImageInfo}){
        this.ImageInfo = ImageInfo;
    }
    
    async search(word){
        let req_query = this.ImageInfo.getSearchResult(word);
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

    //word, color 함께 검색
    async searchWordColor(){
        
    }
    
    
}