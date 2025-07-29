import { Request, Response } from 'express';
import { GetBlogById } from '../../../helpers/services/home.service';

export async function getBlogByIdHandler(req: Request, res: Response) {
  try {
    const id = req.query.id as string;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu ID trong query.',
      });
    }

    const data = await GetBlogById(id);

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
