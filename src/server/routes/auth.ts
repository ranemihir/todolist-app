import express from 'express';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { UserModel } from '../model';
import { User } from '../../types';


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK_URL
}, async (accessToken, refreshToken, profile: any, cb) => {
    try {
        if (!profile) {
            throw new Error('profile object is undefined');
        }

        const { given_name, family_name, picture, sub } = profile._json;

        const user = await UserModel.findOne({
            googleId: sub
        }).exec();

        console.log('user record =>', user);

        if (!user) {
            UserModel.create({
                googleId: sub,
                firstName: given_name,
                lastName: family_name,
                photoUrl: picture,
                accessToken
            }, (err: any, user: User) => {
                console.log(user);
                if (err) {
                    console.error(err);
                    return;
                }

                cb(null, user);
            });
        } else {
            await UserModel.updateOne({
                googleId: sub
            }, {
                accessToken
            }).exec();

            user.accessToken = accessToken;

            cb(null, user);
        }
    } catch (err: any) {
        console.error(err);
        return cb(err, false);
    }
}));

passport.serializeUser((user: any, cb) => {
    cb(null, user);
});

passport.deserializeUser((user: User, cb) => {
    UserModel.findOne({
        _id: user._id
    }, (err: string, user: User) => {
        if (err) {
            console.error(err);
            cb(err, false);

            return;
        }

        cb(null, user);
    });
});

const router = express.Router();

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/login',
}), (req, res) => {
    res.redirect('/');
});

router.get('/auth/google/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

export default router;