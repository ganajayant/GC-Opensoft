import { useGoogleLogin } from '@react-oauth/google';
import { googleauth } from '../api';

export const GoogleLogin = () => {
    const responseGoogle = async (authResult) => {
        try {
            if (!authResult || !authResult.code) {
                throw new Error('Google login failed');
            }
            const result = await googleauth(authResult.code);
            console.log("Server Response:", result.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: (error) => console.error("Login Failed:", error),
        flow: 'auth-code'
    });

    return (
        <button onClick={() => googleLogin()}>Login with Google</button>
    );
};
