const styles = {
    page__header: {
        fontFamily: 'Jost',
        marginBottom: '20px',
    },
    signIn__container: {
        width: '100vw',
        height: '100vh',
        background: '#678CFF',
    },
    loading: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form__container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form__input: {
        marginBottom: '15px',

        width: '300px',
        '& > label': {
            color: '#fff',
        },
        '.MuiInputLabel-root.Mui-focused': {
            color: '#C2D1FF',
        },
        '& > div': {
            color: '#fff',
        },
        '.MuiOutlinedInput-root': {
            ':hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                    // If the input gets hovered, need to change this property
                    borderColor: '#C2D1FF',
                },
            },
            // Hover outline for inputs is on fieldset
            '& fieldset': {
                borderColor: '#fff',
                ':hover': {
                    borderColor: '#C2D1FF',
                },
            },
        },
    },
    form__submit: {
        marginTop: '20px',
        backgroundColor: '#fff',
        width: '300px',
        ':hover': {
            backgroundColor: '#C2D1FF',
        },
    },
    form__error: {
        marginTop: '20px',
        width: '280px',
    },
};

export default styles;
