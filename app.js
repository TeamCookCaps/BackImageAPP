import http from "http";
import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import loaders from "./loaders/index.js";
import logger from "./loaders/logger.js";
import socket from "./loaders/websocket.js"; 

const app = express();
const port = 4000;
const server = http.createServer(app);
//db, express, log 관련 모듈 로드
loaders(app);

const wss = new WebSocketServer({ server });
socket(wss);

server.listen(port, () => {
  logger.info(`
############################################## 
Server listening on port: ${port} 
############################################## `);
})
  .on("error", (err) => {
    logger.error(err);
    process.exit(1);
  });