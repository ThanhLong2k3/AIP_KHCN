
import { IBaseSearch } from '../../models/base';
import { IBlog } from '../../models/blog';
import {
    addBlogView,
    createBlog,
    deleteBlog,
    getBlogAuthors,
    searchBlogs,
    updateBlog,
} from '../repositories/blog.repository';


export const createBlogService = async (model: IBlog) => {
    try {
        // Validate input
        if (!model.id?.trim()) throw new Error('id bài viết không được để trống');
        if (!model.title?.trim()) throw new Error('Tiêu đề bài viết không được để trống');

        // Save
        const result = await createBlog(model);

        return result;
    } catch (error: any) {
        throw new Error(error.message || 'Lỗi khi tạo bài viết');
    }
};

export const updateBlogService = async (model: IBlog) => {
    try {
        if (!model.id?.trim()) throw new Error('id bài viết không được để trống');
        if (!model.title?.trim()) throw new Error('Tiêu đề bài viết không được để trống');

        const result = await updateBlog(model);
        return result;
    } catch (error: any) {
        throw new Error(error.message || 'Lỗi khi cập nhật bài viết');
    }
};

export const searchBlogService = async (model: IBaseSearch) => {
    try {
        return await searchBlogs(model);
    } catch (error) {
        throw new Error('Không thể tìm kiếm bài viết');
    }
};

export const deleteBlogService = async (id: string, deletedBy: string) => {
    try {
        return await deleteBlog(id, deletedBy);
    } catch (error) {
        throw new Error('Không thể xóa bài viết' + error);
    }
};


export const getBlogAuthorsService = async () => {
    try {
        return await getBlogAuthors();
    } catch (error) {
        throw new Error('Không thể lấy danh sách tác giả.');
    }
};


export const addBlogViewService = async (blogId: string) => {
    try {
        if (!blogId?.trim()) throw new Error('id bài viết không được để trống');

        await addBlogView(blogId);
    } catch (error: any) {
        throw new Error('Không thể thêm lượt xem cho bài viết' + error);
    }
};