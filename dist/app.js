"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const PORT = process.env.PORT || '5000';
const gaussController = new controller_1.GaussController();
app.get('/', (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname + '/../views/index.html'));
});
app.get('/gauss-solutions', (req, res, next) => {
    // res.send(gaussController.add(1, 2) + '');
    let matrix = [[1, 2, 5], [0.5, 1, 2.5]];
    // let matrix: number[][] = [[1, 1, 1, 1], [2, 1, 5, 0], [1, -1, -1, 0]];
    console.log(matrix);
    console.log(gaussController.gaussElimination(matrix));
});
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
