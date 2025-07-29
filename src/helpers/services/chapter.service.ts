import { IBaseSearch } from '../../models/base';
import { IChapter } from '../../models/chapter';
import {
    createChapter,
    deleteChapter,
    searchChapters,
    updateChapter,
} from '../repositories/chapter.repository';


export const createChapterService = async (model: IChapter) => {
    try {
        // Validate input
        if (!model.id?.trim()) throw new Error('id chương không được để trống');
        if (!model.name?.trim()) throw new Error('Tên chương không được để trống');

        // Save
        const result = await createChapter(model);

        return result;
    } catch (error: any) {
        throw new Error(error.message || 'Lỗi khi tạo chương');
    }
};

export const updateChapterService = async (model: IChapter) => {
    try {
        if (!model.id?.trim()) throw new Error('id chương không được để trống');
        if (!model.name?.trim()) throw new Error('Tên chương không được để trống');

        const result = await updateChapter(model);
        return result;
    } catch (error: any) {
        throw new Error(error.message || 'Lỗi khi cập nhật chương');
    }
};

export const searchChapterService = async (model: IBaseSearch) => {
    try {
        return await searchChapters(model);
    } catch (error) {
        throw new Error('Không thể tìm kiếm chương');
    }
};

export const deleteChapterService = async (id: string, deletedBy: string) => {
    try {
        return await deleteChapter(id, deletedBy);
    } catch (error) {
        throw new Error('Không thể xóa chương' + error);
    }
};
