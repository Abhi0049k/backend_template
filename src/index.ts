import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user.routes";
import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from "express";

config();

const PORT: number = Number(process.env.PORT);

const app: Application = express();

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:8998"
}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send({ message: "Hello World!!!" });
})

app.use("/user", userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    next({ status: 404, message: "Page not found" });
})

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.send({ Error: err.message });
}

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
});