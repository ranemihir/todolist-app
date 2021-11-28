import express from 'express';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { UserModel } from '../model';
import { User } from '../../types';


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK_URL
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        const [firstName, lastName] = profile.displayName.split(' ');

        UserModel.create({
            firstName,
            lastName,
            email: profile.emails[0].value,
            photoUrl: profile.profileUrl,
            accessToken
        }, (err, user: User) => {
            if (err) {
                console.error(err);
                return;
            }

            cb(null, user);
        });
    } catch (err: any) {
        console.error(err);
        return cb(err, false);
    }
}));

passport.serializeUser((user: any, cb) => {
    cb(null, user._id);
});

passport.deserializeUser((email: string, cb) => {
    UserModel.findOne({
        email
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

export default router;