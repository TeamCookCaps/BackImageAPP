import express from "express";
import logger from "./loaders/logger.js";
import loaders from "./loaders/index.js";
import { config } from "process";

const app = express();
const port = 4000;

//db, express, log 관련 모듈 로드
loaders(app);

const server = app
  .listen(port, () => {
    logger.info(`
    ##############################################
      Server listening on port: ${port} 
    ##############################################
  `);
  })
  .on("error", (err) => {
    logger.error(err);
    process.exit(1);
  });

export { server };
