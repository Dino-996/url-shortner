import express, { Request, Response } from "express";
import cors from "cors";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import { urlRouter } from "./routes/urlRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use('/api', urlRouter);
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running");
});

export default app;