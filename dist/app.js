"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const PORT = process.env.PORT || '5000';
const add = (a, b) => a + b;
app.get('/', (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname + '/../views/index.html'));
});
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
