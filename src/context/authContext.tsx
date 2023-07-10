import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { firebaseApp } from '../firebase';
import { signIn as signInAction, signOut as signOutAction } from '../actions/userAuthActions';
import { useNavigate } from 'react-router';

interface AuthContextInterface {
    isLoading: boolean;
    signInError: string;
    uid: string;
    resetSignInError: () => void;
    signIn: (email: string, password: string) => void;
    signOut: () => void;
}

const auth = getAuth(firebaseApp);

// Temp casting due to typescript error on this version
const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider = ({ children }: any) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [signInError, setSignInError] = useState<string>('');
    const [uid, setUid] = useState<string>('');

    useEffect(() => {
        onAuthStateChanged(auth, () => {
            console.log('authStateChanged -> ', auth?.currentUser?.uid ?? '');
            setUid(auth?.currentUser?.uid ?? '');
        });
    }, []);

    const resetSignInError = () => {
        setSignInError('');
    };

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        console.log('signing user in');
        try {
            await signInAction({ email, password });
            navigate('/dashboard');
            return;
        } catch (error: any) {
            console.log(typeof error.message);
            setSignInError(error.message);
            console.log('caught thrown error, throwing again -> ', error?.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        console.log('signing user out');
        const success = await signOutAction();
        if (success) {
            navigate('/');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                signInError,
                uid,
                resetSignInError,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
