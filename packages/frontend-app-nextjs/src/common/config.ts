const defaultApiUrl = 'http://localhost:3010';

export const contactDetails = {
    userId: 1,
    phone: '123456789',
    email: 'support@example.com'
};

export const API_URL = process.env.API_URL || defaultApiUrl;
export const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || defaultApiUrl;

// Localstorage
export const AUTH_TOKEN_KEY = 'auth_token';