import CryptoJS from 'crypto-js';


import env from '@/env';

export const actionsAccess = {
    VIEW_PAYMENT: 'view_payment',
};

export const decrypt = (encrypted: string) => {
    const result = CryptoJS.AES.decrypt(encrypted, env.ENCRYPTION_KEY).toString(
        CryptoJS.enc.Utf8
    );

    return result ? JSON.parse(result) : '';
};
