import express, {Application, Request, Response, NextFunction} from "express";
import {GaussController} from "./controller";
import path from "path";

const app: Application = express();

const PORT: string = process.env.PORT || '3000';

const gaussController: GaussController = new GaussController();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/gauss-solutions', (req: Request, res: Response, next: NextFunction) => {
    let matrix: number[][] = JSON.parse(req.body.matrix);
    res.json(gaussController.gaussElimination(matrix));
});

app.listen(PORT, () => {console.log(`Listening on port ${ PORT }`)});