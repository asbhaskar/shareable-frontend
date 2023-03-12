import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material"
import styles from './style'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { signIn } from "../../actions/userAuthActions";
import { useState } from "react";
const SignInForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const {
        handleChange,
        handleSubmit,
        isSubmitting,
        values: { email, password },
    } = useFormik<{ email: string; password: string }>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ email, password }) => {
            const UserEmailCredentials = {email: email, password: password}
            const response = await signIn(UserEmailCredentials);
            if (response?.name === 'FirebaseError') {
                setError(response?.code);
            } else {
                navigate('/dashboard');
            }
        },
    });
    return  (
        <Box sx={styles.signIn__container}>
            {isSubmitting ? (
                <Box sx={styles.loading}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box component="form" onSubmit={handleSubmit} sx={styles.form__container}>
                    <h1 style={styles.page__header}>shareable</h1>
                    <TextField
                        required
                        id="email"
                        label="Email"
                        type="email"
                        onChange={handleChange}
                        value={email}
                        sx={styles.form__input}
                    />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        type="password"
                        onChange={handleChange}
                        value={password}
                        sx={styles.form__input}
                    />
                    {error && <Alert variant="filled" severity="error" sx={{width: '250px'}}>{error}</Alert>}
                    <Button type="submit" sx={styles.form__submit}>Sign In</Button>
                </Box>
            )}
        </Box>
    )
}
export default SignInForm

