import { Alert, Box, Button, CircularProgress, TextField } from '@mui/material';
import styles from './style';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '@context/AuthContext';

const SignInForm = () => {
    const { signIn, resetSignInError, isLoading, uid, signInError } = useContext(AuthContext);
    const {
        handleChange,
        handleSubmit,
        isSubmitting,
        errors,
        values: { email, password },
    } = useFormik<{ email: string; password: string }>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ email, password }) => {
            try {
                // resetSignInError();
                await signIn(email, password);
                console.log('signinerror', signInError);
            } catch (error) {
                console.log('form caught the error -> ', typeof signInError);
                throw error;
            }
        },
    });
    return (
        <Box sx={styles.signIn__container}>
            <Box component="form" onSubmit={handleSubmit} sx={styles.form__container}>
                <h1 style={styles.page__header}>shareable</h1>
                <TextField
                    required
                    disabled={isSubmitting}
                    id="email"
                    label="Email"
                    type="email"
                    onChange={handleChange}
                    value={email}
                    sx={styles.form__input}
                    error={Boolean(errors.email)}
                />
                <TextField
                    required
                    disabled={isSubmitting}
                    id="password"
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    value={password}
                    sx={styles.form__input}
                    error={Boolean(errors.password)}
                />
                <Button type="submit" disabled={isSubmitting} sx={styles.form__submit}>
                    Sign In
                </Button>
                {signInError && (
                    <Alert variant="filled" severity="error" sx={styles.form__error}>
                        {signInError}
                    </Alert>
                )}
            </Box>
        </Box>
    );
};
export default SignInForm;
