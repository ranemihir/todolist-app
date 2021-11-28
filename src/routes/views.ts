import express from 'express';
const router = express.Router();


router.get('/login', (req, res) => {
    if (!req.user) {

    }

    return res.redirect('/');
});

router.get('/', (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
});

export default router;