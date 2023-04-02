import { Router } from 'express';
import { SearchService } from '../../services/search.js';
import ImageInfo from '../../models/imageInfo.js';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';

const route = Router();

export default (app) => {
    app.use('/search', route);

    // 검색 조회
    route.post('/', asyncErrorWrapper(async(req, res, next) => {
        try{
            const { word, color } = req.body;
            let SearchServiceInstance = new SearchService({ImageInfo});
            if(color === undefined){ //word search
                const searchList = await SearchServiceInstance.searchWord(word,color);
                res.status(201).json(
                    {
                        location : 'success',
                        msg : null,
                        data : searchList,
                    }
                );
            }else{ // word+color search
                
            }
        }catch(error){
            res.status(400).json(
                {
                  location: 'error',
                  msg : "데이터 조회에 실패했습니다",
                  data : String(error),
                });
        }
    }));
}