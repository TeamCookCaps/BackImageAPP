import { Router } from 'express';
import { SearchService } from '../../services/search.js';
import { UserService } from '../../services/user.js';
import ImageInfo from '../../models/imageInfo.js';
import User from '../../models/user.js';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';

const route = Router();

export default (app) => {
    app.use('/search', route);

    // 검색 조회
    route.get('/', asyncErrorWrapper(async(req, res, next) => {
        try{
            const { uid, word, color } = req.query;
            console.log(uid, word, color)

            //유저 정보 return
            const UserServiceInstance = new UserService({User});
            const userList = await UserServiceInstance.searchUserInfo(word);

            let SearchServiceInstance = new SearchService({ImageInfo});
            let searchList;
            if(color === undefined || color == ''){ //word search
                searchList = await SearchServiceInstance.searchWord(uid, word);
                
            }else{ // word+color search
                searchList = await SearchServiceInstance.searchWordColor(uid, word,color);
            }
            res.status(201).json(
                {
                    location : 'success',
                    msg : null,
                    data : 
                    {
                        user : userList,
                        searchList : searchList,
                    }
                }
            );

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