import { db_Provider } from '../../config/api_Provider';
import { IAccount } from '../../models/account';
import { IBaseSearch } from '../../models/base';

// Thêm tài khoản mới
export const createAccount = async (model: IAccount): Promise<any> => {
  try {
    const sql = 'CALL add_account(?,?,?,?,?,?,?)';

    return await db_Provider(
      sql,
      [
        model.username,
        model.password,
        model.image ?? null,
        model.name,
        model.role_id,
        model.email,
        model.created_by
      ],
      true
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Cập nhật tài khoản
export const updateAccount = async (model: IAccount): Promise<any> => {
  try {
    console.log('Updating account:', model);

    const sql = 'CALL update_account(?,?,?,?,?,?)';
    return await db_Provider(
      sql,
      [
        model.username,
        model.image,
        model.name,
        model.role_id,
        model.email,
        model.updated_by
      ],
      true
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Xóa tài khoản (xoá mềm)
export const deleteAccount = async (username: string, deletedBy: string): Promise<any> => {
  try {
    const sql = 'CALL delete_account(?,?)';
    return await db_Provider(sql, [username, deletedBy], true);
  } catch (error: any) {
    console.error(error);

    throw new Error(error.message);
  }
};

// Tìm kiếm tài khoản có phân trang
export const searchAccounts = async (model: IBaseSearch): Promise<any> => {
  try {
    const sql = 'CALL get_accounts(?,?,?,?,?)'; // 
    const name = model.search_content_1 || null;
    const roleName = model.search_content_2 || null;
    const results = await db_Provider(sql, [
      model.page_index ?? 1,
      model.page_size ?? 10,
      model.order_type ?? 'ASC',
      name,
      roleName
    ]);
    return results;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const authenticate = async (username: string): Promise<any> => {
  try {
    const sql = 'CALL get_user_by_username(?)';
    const results = await db_Provider(sql, [username]);
    return results;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const findAccountByEmail = async (email: string): Promise<any> => {
  try {
    const sql = 'CALL find_account_by_email(?)';
    const results = await db_Provider(sql, [email]);
    //trả về object tài khoản đầu tiên hoặc null
    return results.length > 0 ? results[0] : null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const updatePasswordByEmail = async (email: string, hashedPassword: string): Promise<any> => {
  try {
    const sql = 'CALL update_password_by_email(?, ?)';
    //chỉ thực hiện UPDATE, không cần trả về kết quả cụ thể
    await db_Provider(sql, [email, hashedPassword], true);
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const registerAccount = async (model: IAccount): Promise<any> => {
  try {
    const sql = 'CALL add_account_register(?,?,?,?,?,?)';
    return await db_Provider(
      sql,
      [
        model.username,
        model.password,
        model.image ?? null,
        model.name,
        model.role_id,
        model.email,
      ],
      true
    );
  } catch (error: any) {
    throw error;
  }
};


export const updateProfile = async (model: IAccount): Promise<any> => {
  try {
    const sql = 'CALL update_profile(?,?,?,?,?)';
    return await db_Provider(
      sql,
      [
        model.username,
        model.password,
        model.image,
        model.name,
        model.email
      ],
      true
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};
