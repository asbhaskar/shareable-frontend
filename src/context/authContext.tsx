import { getAuth } from 'firebase/auth';
import { createContext, useState } from 'react';
import { firebaseApp } from '../firebase';
import { signIn as signInAction, signOut as signOutAction } from '../actions/userAuthActions';
import { log } from 'console';
import { useNavigate } from 'react-router';

const auth = getAuth(firebaseApp);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: any) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [uid, setUid] = useState<string>('');

    const signIn = async (email: string, password: string) => {
        log('signing user in');
        const success = await signInAction({ email, password });
        if (success) {
            navigate('/dashboard');
        }
    };

    const signOut = async () => {
        log('signing user out');
        const success = await signOutAction();
        if (success) {
            navigate('/');
        }
    };

    return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};
