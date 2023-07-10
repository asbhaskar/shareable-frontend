import { object, string } from 'yup';

export const loginSchema = object().shape({
    email: string().email().label('Email').required(),
    password: string().label('Password').required(),
});
