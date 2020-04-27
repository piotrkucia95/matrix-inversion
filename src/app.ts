import express, {Application, Request, Response, NextFunction} from "express";
import {GaussController} from "./controller";
import path from "path";

const app: Application = express();

const PORT: string = process.env.PORT || '3000';

const gaussController: GaussController = new GaussController();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/gauss-solutions', (req: Request, res: Response, next: NextFunction) => {
    // res.send(gaussController.add(1, 2) + '');
    let matrix: number[][] = [[1, 2, 5], [0.5, 1, 2.5]];
    // let matrix: number[][] = [[1, 1, 1, 1], [2, 1, 5, 0], [1, -1, -1, 0]];
    console.log(matrix);
    console.log(gaussController.gaussElimination(matrix));
});

app.listen(PORT, () => {console.log(`Listening on port ${ PORT }`)});