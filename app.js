import express, { json } from "express";
import cors from 'cors';
import { signUp, signIn } from "./controllers/authController.js";
import { transaction, wallet } from "./controllers/userController.js";

const server = express();
server.use(cors());
server.use(json());

server.post('/sign-up', signUp);
server.post('/sign-in', signIn);
server.get('/transactions', wallet);
server.post('/transactions', transaction);

server.listen(5000, () => {
    console.log('Rodando em http://localhost:5000');
});