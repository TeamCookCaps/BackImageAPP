import { Router } from 'express';
import { FavoriteService } from '../../services/favorite.js';
import FavortieInfo from '../../models/favorite.js';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';

const route = Router();

export default (app) => {
    app.use('/favorite', route);

    // 좋아요
    route.post('/', asyncErrorWrapper(async(req, res) => {
        try{
            const { uid, id } = req.body;
            console.log(uid+" "+id);
            let favoriteServiceInstance = new FavoriteService({ FavortieInfo });
            const transactionFavorite = await favoriteServiceInstance.transFavorite(uid,id);
            res.status(201).json(
            {
                location : 'success',
                msg : null,
                data : transactionFavorite,
            });
        }catch(error){
            res.status(401).json(
                {
                  location: 'error',
                  msg : "좋아요 처리에 실패했습니다",
                  data : String(error),
                });
        }
    }));
}