import express, { json } from "express";
import cors from 'cors';
import userRouter from "./routers/userRouter.js";
import transactionRouter from './routers/transactionsRouter.js'

const server = express();
server.use(cors());
server.use(json());

server.use(userRouter);
server.use(transactionRouter);

server.listen(5000, () => {
    console.log('Rodando em http://localhost:5000');
});