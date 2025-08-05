
import { IBaseSearch } from '../../models/base';
import { IComment } from '../../models/comment';
import {
    createComment,
    deleteComment,
    searchComments,
} from '../repositories/comment.repository';


export const createCommentService = async (model: IComment) => {
    try {
        // Validate input
        if (!model.id?.trim()) throw new Error('id bình luận không được để trống');
        if (!model.content?.trim()) throw new Error('Nội dung bình luận không được để trống');

        // Save
        const result = await createComment(model);

        return result;
    } catch (error: any) {
        throw new Error(error.message || 'Lỗi khi tạo bình luận');
    }
};

export const searchCommentService = async (model: IBaseSearch) => {
    try {
        return await searchComments(model);
    } catch (error) {
        throw new Error('Không thể tìm kiếm bình luận');
    }
};

export const deleteCommentService = async (id: string) => {
    if (!id?.trim()) throw new Error('id bình luận không được để trống');
    try {
        return await deleteComment(id);
    } catch (error) {
        throw new Error('Không thể xóa bình luận: ' + error);
    }
};


