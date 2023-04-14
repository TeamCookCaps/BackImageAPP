import { Router } from 'express';
import { SearchService } from '../../services/search.js';
import ImageInfo from '../../models/imageInfo.js';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';

const route = Router();

export default (app) => {
    app.use('/search', route);

    // 검색 조회
    route.get('/', asyncErrorWrapper(async(req, res, next) => {
        try{
            const { uid, word, color } = req.query;
            console.log(uid, word, color)
            let SearchServiceInstance = new SearchService({ImageInfo});
     
            if(color === undefined || color == ''){ //word search
                const searchList = await SearchServiceInstance.searchWord(uid, word);
                res.status(201).json(
                    {
                        location : 'success',
                        msg : null,
                        data : searchList,
                    }
                );
            }else{ // word+color search
                const searchWCResult = await SearchServiceInstance.searchWordColor(uid, word,color);
                res.status(201).json(
                    {
                        location : 'success',
                        msg : null,
                        data : searchWCResult,
                    }
                );
            }
        }catch(error){
            res.status(500).json(
                {
                  location: 'error',
                  msg : "데이터 조회에 실패했습니다",
                  data : String(error),
                });
        }
    }));
}