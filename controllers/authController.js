import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import joi from 'joi';
import db from '../db.js'

const signupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    passwordconf: joi.ref('password')
});

const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export async function signUp(req, res) {
    const user = req.body;
    const passwordHash = bcrypt.hashSync(user.password, 10);

    try {
        const { error } = signupSchema.validate(user);
        if (error !== undefined) {
            console.log(error);
            return res.sendStatus(422);
        }

        await db.collection('users').insertOne({ ...user, password: passwordHash });
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
    }
};

export async function signIn(req, res){
    const userSignIn = req.body;
    const { email, password } = req.body;

    try {
        const { error } = signinSchema.validate(userSignIn);
        if  (error !== undefined) {
            console.log(error);
            return res.sendStatus(422);
        }

        const user = await db.collection('users').findOne({ email });
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (user && passwordIsValid) {
            const token = uuid();
            await db.collection('sessions').insertOne({
                userId: user._id,
                token
            })
            res.send(token);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
    }
};