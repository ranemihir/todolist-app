import express from 'express';
import { UserModel } from '../model';
import { User } from '../../../types';

import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.CLIENT_ID);

const router = express.Router();

router.post('/auth/google', async (req, res) => {
    const { user } = req.body as { user: User; };

    const ticket = await client.verifyIdToken({
        idToken: user.tokenId,
        audience: process.env.CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (!payload) {
        return res.status(400).json({ error: 'Invalid token Id' });
    }

    const userDoc = await UserModel.findOne({
        email: user.email
    }).exec();

    if (!userDoc) {
        await UserModel.create(user);
    } else {
        await UserModel.updateOne({
            email: user.email
        }, {
            tokenId: user.tokenId
        }).exec();
    }

    const expires = new Date(payload.exp);

    res.cookie('tokenId', user.tokenId, {
        expires
    });

    res.cookie('_id', userDoc._id, {
        expires
    });

    return res.status(200).json(user);
});

router.get('/logout', (req, res) => {
    res.clearCookie('tokenId');
    res.clearCookie('_id');
    res.end();
});

router.get('/currentuser', async (req, res) => {
    const tokenId = req.cookies['tokenId'];
    const _id = req.cookies['_id'];

    if (!(tokenId && _id)) {
        return res.status(401).json({ error: 'Unauthenticated request' });
    }

    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (!payload) {
        return res.status(400).json({ error: 'Invalid token Id provided' });
    }

    const { email } = payload;

    const user = await UserModel.findOne({
        email
    }).exec();

    return res.status(200).json(user);
});

export default router;