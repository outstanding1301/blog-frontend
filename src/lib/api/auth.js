import client from '@lib/client';
import { salt } from '@src/consts';
import crypto from 'crypto';

export const login = ({id, password}) => {
    let pw = crypto.pbkdf2Sync(password, salt, 112, 64, 'sha512').toString('base64');
    return client.post('/auth/login', {
        id: id,
        password: pw
    });
    
}

export const register = ({username, password, email, nickname}) => {
    let pw = crypto.pbkdf2Sync(password, salt, 112, 64, 'sha512').toString('base64');
    return client.post('/auth/register', {
        username, email, nickname,
        password: pw
    })
}

export const check = () => client.get('/auth/check');

export const logout = () => client.post('/auth/logout');