import { jwtDecode } from 'jwt-decode';
import { IDecodedToken } from '../../models/decodedToken';

export const getAccountLogin = () => {
    try {
        const token = localStorage.getItem('TOKEN');
        if (!token) return null;

        const accountInfo = jwtDecode<IDecodedToken>(token);
        return accountInfo;
    } catch (error) {
        console.error("Lỗi giải mã token:", error);
        localStorage.removeItem('TOKEN');
        return null;
    }
};
