
export const LOGIN = '/login';
export const ROOT = '/';

export const PUBLIC_ROUTES = [
    '/',
    '/login',
    '/register',
    '/projects',
    '/api/auth/callback/google',
    '/api/auth/callback/github',
    '/forget-password',
    '/reset-password',
    '/verify-otp',
]

export const PROTECTED_SUB_ROUTES = [
    '/checkout',
]