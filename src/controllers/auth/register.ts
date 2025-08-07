import { Request, Response } from 'express';
import { registerAccountService } from '../../helpers/services/account.service';
import env from '@/env';

// Đăng ký tài khoản học sinh
export const registerAccount = async (req: Request, res: Response) => {
  try {
    const DEFAULT_STUDENT_ROLE_ID = env.ID_ROLE_STUDENT; // ID quyền học sinh

    const model = req.body;
    const result = await registerAccountService({
      ...model,
      role_id: DEFAULT_STUDENT_ROLE_ID,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('API Error in POST /api/auth/register:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};
