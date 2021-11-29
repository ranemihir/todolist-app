import express from 'express';
import { TodoModel } from '../model';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const tokenId = req.cookies['token_id'] || req.headers['token_id'];
        const _id = req.cookies['_id'] || req.headers['_id'];

        if (!(tokenId && _id)) {
            return res.status(401).send('Unauthenticated request');
        }

        const { text } = req.body;

        if ((!text) || text === '') {
            return res.status(400).json({ error: 'Text is not present or empty' });
        }

        const todo = new TodoModel({
            text,
            userId: _id
        });

        await todo.save();

        return res.status(200).json(todo);
    } catch (err) {
        console.error(err);
    }
});

router.get('/todolist', async (req, res) => {
    try {
        const tokenId = req.cookies['token_id'] || req.headers['token_id'];
        const _id = req.cookies['_id'] || req.headers['_id'];

        if (!(tokenId && _id)) {
            return res.status(401).send('Unauthenticated request');
        }

        const todos = await TodoModel.find({
            userId: _id
        }).exists('deleted', false).exec();

        return res.status(200).json({ todos });
    } catch (err) {
        console.error(err);
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        const tokenId = req.cookies['token_id'] || req.headers['token_id'];
        const _id = req.cookies['_id'] || req.headers['_id'];

        if (!(tokenId && _id)) {
            return res.status(401).send('Unauthenticated request');
        }

        const todoId = req.params.id;

        if (!todoId) {
            return res.status(400).json({ error: 'id param is not provided' });
        }

        const todo = await TodoModel.findOne({
            _id: todoId,
            userId: _id
        }).exec();

        if (!todo) {
            return res.status(400).json({ error: 'Invalid id provided' });
        }

        await TodoModel.updateOne({
            _id: todoId,
        }, {
            deleted: true
        });

        return res.status(200).end();
    } catch (err) {
        console.error(err);
    }
});

export default router;