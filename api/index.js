import { Router } from "express";
import user from "./routes/user.js";
import ImageInfo from "./routes/imageInfo.js";
import search from "./routes/search.js";
import favorite from "./routes/favorite.js";
import trash from "./routes/trash.js";
import removeAll from "./routes/removeAll.js";
import restoreAll from "./routes/restoreAll.js";
import imageDelete from "./routes/imageDelete.js";
import recommand from "./routes/recommand.js";

export default () => {
  const app = Router();
  user(app);
  ImageInfo(app);
  search(app);
  favorite(app);
  trash(app);
  removeAll(app);
  restoreAll(app);
  imageDelete(app);
  recommand(app);
  return app;
};
