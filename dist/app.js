"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller_1 = require("./Controller");
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const PORT = process.env.PORT || '3000';
const gaussController = new Controller_1.Controller();
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.post('/gauss-solutions', (req, res, next) => {
    let matrix = JSON.parse(req.body.matrix);
    res.json(gaussController.gaussElimination(matrix));
});
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
