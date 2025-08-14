import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { login } from '../../helpers/services/account.service';

const JWT_SECRET = process.env.JWT_SECRET || 'dinhthientruong21dinhthientruong09dinhthientruong2004!@#$%^&*()-_=+[{]}\|;:,<.>/?';

// Đăng nhập tài khoản
export const loginAccount = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập đầy đủ thông tin.',
      });
    }

    // Gọi service đăng nhập
    const loginResult = await login(username, password);

    if (!loginResult.success) {
      return res.status(401).json({
        success: false,
        message: loginResult.message,
      });
    }

    const user = loginResult.user;

    // Tạo token JWT
    const token = jwt.sign(
      {
        username: user.username,
        role_id: user.role_id,
        email: user.email,
        name: user.name,
        image: user.image,
        permissions: user.permissions,
      },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      token,
      user,
    });

  } catch (err: any) {
    console.error('Lỗi hệ thống trong API Login:', err);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ.',
    });
  }
};
