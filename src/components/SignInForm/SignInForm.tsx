import { Box, Button, CircularProgress, TextField } from "@mui/material"
import styles from './style'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
const SignInForm = () => {
    const navigate = useNavigate();
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
            // const response = await authSignIn(email, password);
            // if (response.name === 'FirebaseError') {
            //     setError(response.code);
            // } else {
            //     navigate('/dashboard');
            // }
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
                    {/* <Form.Group className="mb-3"> */}
                        {/* {error && <Alert variant="danger">{error}</Alert>} */}
                        <Button type="submit" sx={styles.form__submit}>Sign In</Button>
                    {/* </Form.Group> */}
                </Box>
            )}
        </Box>
    )
}
export default SignInForm

