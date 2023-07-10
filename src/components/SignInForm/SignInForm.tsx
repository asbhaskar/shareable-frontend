import { Alert, Box, Button, TextField } from '@mui/material';
import styles from './style';
import { useFormik } from 'formik';
import { useContext } from 'react';
import AuthContext from '@context/AuthaContext';
import { loginSchema } from './validation';

const SignInForm = () => {
    const { signIn, resetSignInError, signInError } = useContext(AuthContext);
    const {
        handleChange,
        handleSubmit,
        handleBlur,
        isSubmitting,
        errors,
        values: { email, password },
    } = useFormik<{ email: string; password: string }>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async ({ email, password }, { setSubmitting }) => {
            resetSignInError();
            await signIn(email, password);
            setSubmitting(false);
        },
    });
    return (
        <Box sx={styles.signIn__container}>
            <Box component="form" onSubmit={handleSubmit} sx={styles.form__container}>
                <h1 style={styles.page__header}>shareable</h1>
                <TextField
                    disabled={isSubmitting}
                    id="email"
                    label="Email"
                    type="email"
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={email}
                    sx={styles.form__input}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                />
                <TextField
                    disabled={isSubmitting}
                    id="password"
                    label="Password"
                    type="password"
                    variant="filled"
                    onChange={handleChange}
                    value={password}
                    sx={styles.form__input}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
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
