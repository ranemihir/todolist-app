import express from 'express';
import { UserModel } from '../model';
import { User } from '../../../types';


const router = express.Router();

router.get('/currentuser', (req, res) => {
    if (!req.user) {
        return res.status(404).end();
    }

    return res.status(200).json(req.user);
});

export default router;