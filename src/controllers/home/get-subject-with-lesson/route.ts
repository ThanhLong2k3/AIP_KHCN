import { Request, Response } from 'express';
import { GetSubjectsWithLessonsService } from '../../../helpers/services/home.service';

export async function getSubjectsWithLessonsHandler(_: Request, res: Response) {
  try {
    const data = await GetSubjectsWithLessonsService();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Đã xảy ra lỗi.',
    });
  }
}
