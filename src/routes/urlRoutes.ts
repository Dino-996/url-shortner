import { Router } from "express";
import * as urlController from "../controllers/urlController";

export const urlRouter = Router();

urlRouter.post("/shorten", urlController.shorten);
urlRouter.get("/urls", urlController.allUrl);
urlRouter.get("/length", urlController.length);
urlRouter.get("/:shortId", urlController.redirect);
urlRouter.get("/status/:shortId", urlController.stats);