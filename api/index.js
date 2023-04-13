import { Router } from "express";
import user from "./routes/user.js";
import ImageInfo from "./routes/imageInfo.js";
import search from "./routes/search.js";
import trash from "./routes/trash.js";
import removeAll from "./routes/removeAll.js";

export default () => {
  const app = Router();
  user(app);
  ImageInfo(app);
  search(app);
  trash(app);
  removeAll(app);
  return app;
};
