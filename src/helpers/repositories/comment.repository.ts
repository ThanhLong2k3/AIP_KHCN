import { db_Provider } from "../../config/api_Provider";
import { IBaseSearch } from "../../models/base";
import { IComment } from "../../models/comment";

// Thêm bình luận mới
export const createComment = async (model: IComment): Promise<any> => {
    try {
        const sql = 'CALL add_comment(?,?,?,?)';
        return await db_Provider(
            sql,
            [
                model.id,
                model.content,
                model.blog_id,
                model.created_by
            ],
            true
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
};


// Xóa bình luận (xoá mềm)
export const deleteComment = async (id: string): Promise<any> => {
    try {
        const sql = 'CALL delete_comment(?)';
        return await db_Provider(sql, [id], true);
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
};

// Tìm kiếm bài viết có phân trang
export const searchComments = async (model: IBaseSearch): Promise<any> => {
    try {
        const sql = 'CALL get_comments(?,?,?,?,?)';
        const searchBlogID = model.search_content_1 || null;
        const searchAccountNameCreate = model.search_content_2 || null;
        const results = await db_Provider(sql, [
            model.page_index ?? 1,
            model.page_size ?? 10,
            model.order_type ?? 'ASC',
            searchBlogID,
            searchAccountNameCreate
        ]);
        return results;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

