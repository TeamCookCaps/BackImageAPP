import { Router } from 'express';
import { UserService } from '../../services/user.js';
import User from '../../models/user.js';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';

const route = Router();

export default (app) => {
    app.use('/user', route);

    // 사용자 정보 저장
    route.post('/', asyncErrorWrapper(async(req, res, next) => {
        try{
            const { uuid, nick_name, profile_img } = req.body;
            let UserServiceInstance = new UserService({User});
            const user = await UserServiceInstance.registerUser(uuid,nick_name,profile_img);
            res.status(201).json(
                {
                    location : 'success',
                    msg : null,
                    data : user,
                });
        }catch(error){
            res.status(400).json(
                {
                  location: 'error',
                  msg : "회원 가입에 실패했습니다",
                  data : String(error),
                });
        }
    }));
}