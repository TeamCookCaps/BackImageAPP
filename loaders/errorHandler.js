import createError from 'http-errors';
import mysql2 from "mysql2";
import { CustomError } from "../CustomError.js";

export default (app) => {
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });
    
    app.use(function handleDBError(error, req, res, next) {
      if (error instanceof mysql2.error) return res.status(400).json({ type: "DBError", message: error.message });
      next(error);
    });  

    // custom error handler
    app.use(function handlecustomError(error, req, res, next) {
      if (error instanceof CustomError) {
          const { status, type, message } = error;
          return res.status(status).send({ type, message });
      }
      next(error);
    });

    // error handler
    app.use(function(error, req, res, next) {
      console.error("error"+error.message);
      res.status(500).json({ message: error.message });
    });
}

