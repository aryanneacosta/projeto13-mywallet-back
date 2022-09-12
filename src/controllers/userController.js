import dayjs from 'dayjs';
import joi from 'joi';
import db from '../database/db.js'

const transactionSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().valid('income', 'outcome').required()
});

export async function wallet(req, res) {

    try {
        const session = res.locals.session;

        const user = await db.collection('users').findOne({
            _id: session.userId
        });

        if (!user) {
            return res.sendStatus(401);
        }

        delete user.password;
        delete user.passwordconf;

        const allTransactions = await db.collection('transactions').find(user.userId).toArray();
        res.send(allTransactions.map(value => ({
            ...value,
            _id: undefined,
            userId: undefined
        })));

    } catch (error) {
        console.log(error);
    }
};

export async function transaction(req, res) {
    const transactionReceived = req.body;
    const { value, description, type } = req.body;
    const date = dayjs().format('DD/MM');

    try {
        const { error } = transactionSchema.validate(transactionReceived);
        if (error !== undefined) {
            console.log(error);
            return res.sendStatus(422);
        }

        const session = res.locals.session;
        const userId = session.userId;

        await db.collection('transactions').insertOne({
            date,
            value,
            description,
            type,
            userId
        });

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
    }
};