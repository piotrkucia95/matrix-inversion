import express, {Application, Request, Response, NextFunction} from "express";
import path from "path";

const app: Application = express();

const PORT: string = process.env.PORT || '5000';

const add = (a: number, b: number) : number => a + b;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname + '/../views/index.html'))
});

app.listen(PORT, () => {console.log(`Listening on port ${ PORT }`)});