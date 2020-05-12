"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const PORT = process.env.PORT || '3000';
const controller = new controller_1.Controller();
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
app.use(express_1.default.json({ limit: '50mb' }));
app.post('/gauss-solutions', (req, res, next) => {
    let matrix = JSON.parse(req.body.matrix);
    res.json(controller.solveEquations(matrix));
});
app.post('/matrix-inverse', (req, res, next) => {
    let matrix = JSON.parse(req.body.matrix);
    res.json(controller.inverseMatrix(matrix));
});
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
