"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, World!' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
