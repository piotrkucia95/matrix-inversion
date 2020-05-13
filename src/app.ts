import express, {Application, Request, Response, NextFunction} from "express";
import {Controller} from "./controller";
import path from "path";

const app: Application = express();

const PORT: string = process.env.PORT || '3000';

const controller: Controller = new Controller();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true, limit: '50mb'}));
app.use(express.json({ limit: '50mb' }));

app.post('/gauss-solutions', (req: Request, res: Response, next: NextFunction) => {
    let matrix: number[][] = JSON.parse(req.body.matrix);
    res.json(controller.solveEquations(matrix));
});

app.post('/matrix-inverse', (req: Request, res: Response, next: NextFunction) => {
    let order: number = +req.body.matrixSize;
    let matrix: number[][] = req.body.matrix ? JSON.parse(req.body.matrix) : controller.generateMatrix(order);
    res.json(controller.inverseMatrix(matrix));
});

app.listen(PORT, () => {console.log(`Listening on port ${ PORT }`)});