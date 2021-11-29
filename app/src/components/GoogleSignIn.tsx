import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../types';
import * as userService from '../services/auth';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

export const GoogleSignIn = (props: { currentUser: User | null, setCurrentUserState: (user: User) => void; }) => {
    const { currentUser, setCurrentUserState } = props;

    const navigate = useNavigate();

    if (currentUser && currentUser != null && currentUser.email) {
        navigate('/');
    }

    const onSuccess = async (res: any) => {
        try {
            const user: User = {
                googleId: res.googleId,
                firstName: res.profileObj.givenName,
                lastName: res.profileObj.familyName,
                email: res.profileObj.email,
                photoUrl: res.profileObj.imageUrl,
                tokenId: res.tokenId
            };

            await userService.login(user);

            setCurrentUserState(user);
        } catch (err) {
            console.error(err);
        }
    };

    const onFailure = (res: any) => {
        console.log(res);
    };

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText='Sign In with Google'
            theme='dark'
            // isSignedIn={true}
            onSuccess={onSuccess}
            onFailure={onFailure}
        />
    );
};