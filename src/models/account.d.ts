export interface IAccount {
  username: string;
  password: string | null; // Mật khẩu có thể null khi update profile
  image: string | null;
  name: string;
  role_id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  created_by: string | null; // Người tạo tài khoản, để null cho thủ tục xử lý
  updated_by: string | null; // Người cập nhật tài khoản, không cần thiết khi tạo mới
  deleted: boolean;
}
