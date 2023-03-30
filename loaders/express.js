import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "../api/index.js";

export default (app) => {
  const whitelist = ["http://localhost:4000"];
  const corsOptions = {
    origin: function (origin, callback) {
      const isWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, isWhitelisted);
    },
    credentials: true,
  };

  // Cors Whitelist 관리
  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.static(path.join(path.resolve(), "public")));

  // API Route 설정
  app.use("/api", routes());
};
