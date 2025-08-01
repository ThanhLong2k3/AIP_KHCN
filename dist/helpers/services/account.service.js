"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileService = exports.verifyCurrentPasswordService = exports.registerOTPService = exports.registerAccountService = exports.resetPasswordService = exports.verifyOtpService = exports.forgotPasswordService = exports.login = exports.deleteAccountService = exports.searchAccountService = exports.updateAccountService = exports.createAccountService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const account_repository_1 = require("../repositories/account.repository");
const permission_repository_1 = require("../repositories/permission.repository");
const util_service_1 = require("./util.service");
const BCRYPT_ROUNDS = parseInt('10'); //số vòng lặp mà thư viện bcryptjs sử dụng khi mã hoá mật khẩu
const createAccountService = async (model) => {
    try {
        // Validate input
        if (!model.username?.trim())
            throw new Error('Tên đăng nhập không được để trống');
        if (!model.name?.trim())
            throw new Error('Họ tên không được để trống');
        if (!model.email?.trim())
            throw new Error('Email không được để trống');
        if (!model.password?.trim())
            throw new Error('Mật khẩu không được để trống');
        const isInvalidEmail = await (0, util_service_1.isDisposableEmail)(model.email);
        if (isInvalidEmail)
            throw new Error('Địa chỉ email không được hỗ trợ');
        //vừa sửa
        const decryptedPassword = model.password;
        if (!decryptedPassword)
            throw new Error('Mật khẩu không hợp lệ');
        const hashedPassword = await bcryptjs_1.default.hash(decryptedPassword, BCRYPT_ROUNDS);
        const result = await (0, account_repository_1.createAccount)({
            ...model,
            password: hashedPassword,
        });
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi tạo người dùng');
    }
};
exports.createAccountService = createAccountService;
const updateAccountService = async (model) => {
    try {
        if (!model.username?.trim())
            throw new Error('Tên đăng nhập không được để trống');
        if (!model.name?.trim())
            throw new Error('Họ tên không được để trống');
        if (!model.email?.trim())
            throw new Error('Email không được để trống');
        const isInvalidEmail = await (0, util_service_1.isDisposableEmail)(model.email);
        if (isInvalidEmail)
            throw new Error('Địa chỉ email không được hỗ trợ');
        const result = await (0, account_repository_1.updateAccount)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi cập nhật người dùng');
    }
};
exports.updateAccountService = updateAccountService;
const searchAccountService = async (model) => {
    try {
        return await (0, account_repository_1.searchAccounts)(model);
    }
    catch (error) {
        throw new Error('Không thể tìm kiếm người dùng');
    }
};
exports.searchAccountService = searchAccountService;
const deleteAccountService = async (username, deletedBy) => {
    try {
        return await (0, account_repository_1.deleteAccount)(username, deletedBy);
    }
    catch (error) {
        throw new Error('Không thể xóa người dùng' + error);
    }
};
exports.deleteAccountService = deleteAccountService;
const login = async (username, rawPassword) => {
    try {
        const account = await (0, account_repository_1.authenticate)(username);
        if (!account || !account[0]) {
            // Trả về một object lỗi rõ ràng
            return { success: false, message: "Tên đăng nhập không tồn tại." };
        }
        const user = account[0];
        // Chú ý: `rawPassword` ở đây là mật khẩu chưa mã hóa (plaintext)
        const isMatch = await bcryptjs_1.default.compare(rawPassword, user.password);
        if (!isMatch) {
            // Trả về một object lỗi rõ ràng
            return { success: false, message: "Mật khẩu không chính xác." };
        }
        // Nếu mật khẩu khớp, lấy thông tin quyền
        const allPermissionsInfo = await (0, permission_repository_1.getPermissionsByRole)(user.role_id);
        const permissions = allPermissionsInfo.map((p) => p.permission_code);
        // Xóa password hash trước khi trả về
        delete user.password;
        return {
            success: true,
            user: {
                ...user,
                permissions: permissions,
            }
        };
    }
    catch (error) {
        console.error("❌ Login service error", error);
        throw new Error("Lỗi máy chủ trong quá trình xác thực.");
    }
};
exports.login = login;
const forgotPasswordService = async (email) => {
    try {
        const account = await (0, account_repository_1.findAccountByEmail)(email);
        if (!account) {
            throw new Error(`Không tồn tại tài khoản liên kết với ${email}.`);
        }
        // 1. Tạo OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 chữ số
        // 2. Gửi email chứa OTP
        const transporter = nodemailer_1.default.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, // Email của bạn
                pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng 16 ký tự
            },
        });
        const mailOptions = {
            from: `"CHEMISTRY FORUM Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Mã OTP khôi phục mật khẩu CHEMISTRY FORUM',
            html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #0d448a;">Khôi phục mật khẩu</h2>
            <p>Xin chào ${account.name},</p>
            <p>Chúng tôi đã nhận được yêu cầu khôi phục mật khẩu cho tài khoản của bạn trên Diễn đàn Hóa học (CHEMISTRY FORUM).</p>
            <p>Đây là mã OTP của bạn:</p>
             <p style="background-color: #f0f0f0; border: 1px solid #ddd; padding: 10px 15px; font-size: 18px; font-weight: bold; text-align: center; letter-spacing: 2px;">
                ${otp}
            </p>
            <p>Nếu bạn không yêu cầu khôi phục mật khẩu, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi nếu bạn lo ngại về vấn đề bảo mật.</p>
            <hr>
            <p>Trân trọng,<br/>Đội ngũ CHEMISTRY FORUM</p>
        </div>`,
        };
        await transporter.sendMail(mailOptions);
        // 3. Tạo JWT tạm thời chứa OTP và email
        const otpToken = jsonwebtoken_1.default.sign({ email: account.email, otp: otp }, process.env.JWT_SECRET, { expiresIn: '5m' } // Hết hạn sau 5 phút
        );
        return {
            success: true,
            message: 'OTP đã được gửi đến email của bạn.',
            otpToken: otpToken // Gửi token này về cho client
        };
    }
    catch (error) {
        const errorMessage = error.message || "Gửi email thất bại do lỗi hệ thống.";
        throw new Error(errorMessage);
    }
};
exports.forgotPasswordService = forgotPasswordService;
//chỉ xác thực OTP
const verifyOtpService = async (otp, otpToken) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(otpToken, process.env.JWT_SECRET);
        if (decoded.otp !== otp) {
            throw new Error("Mã OTP không chính xác.");
        }
        // Nếu OTP đúng, trả về email để dùng cho bước sau
        return { success: true, email: decoded.email };
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error("Mã OTP đã hết hạn. Vui lòng thử lại.");
        }
        throw new Error(error.message || "Lỗi khi xác thực OTP.");
    }
};
exports.verifyOtpService = verifyOtpService;
// chỉ đặt lại mật khẩu (sau khi đã xác thực OTP, đặt lại mật khẩu cho email đã cung cấp)
const resetPasswordService = async (email, newPassword) => {
    try {
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, BCRYPT_ROUNDS);
        await (0, account_repository_1.updatePasswordByEmail)(email, hashedPassword);
        return { success: true, message: "Đổi mật khẩu thành công." };
    }
    catch (error) {
        throw new Error(error.message || "Lỗi khi đặt lại mật khẩu.");
    }
};
exports.resetPasswordService = resetPasswordService;
const registerAccountService = async (model) => {
    try {
        //kiểm tra các trường dữ liệu bắt buộc
        if (!model.username?.trim())
            throw new Error('Tên đăng nhập không được để trống');
        if (!model.name?.trim())
            throw new Error('Họ tên không được để trống');
        if (!model.email?.trim())
            throw new Error('Email không được để trống');
        if (!model.password?.trim())
            throw new Error('Mật khẩu không được để trống');
        //kiểm tra email đã tồn tại chưa
        const existingAccountByEmail = await (0, account_repository_1.findAccountByEmail)(model.email);
        if (existingAccountByEmail) {
            throw new Error(`Địa chỉ email ${model.email} đã được sử dụng.`);
        }
        //kiểm tra username đã tồn tại chưa
        const existingAccountByUsername = await (0, account_repository_1.authenticate)(model.username);
        if (existingAccountByUsername && existingAccountByUsername[0]) {
            throw new Error(`Tên đăng nhập ${model.username} đã tồn tại.`);
        }
        //kiểm tra email có hợp lệ không
        const isInvalidEmail = await (0, util_service_1.isDisposableEmail)(model.email);
        if (isInvalidEmail)
            throw new Error('Địa chỉ email không hợp lệ.');
        const decryptedPassword = model.password;
        if (!decryptedPassword)
            throw new Error('Mật khẩu không hợp lệ');
        const hashedPassword = await bcryptjs_1.default.hash(decryptedPassword, BCRYPT_ROUNDS);
        const result = await (0, account_repository_1.registerAccount)({
            ...model,
            password: hashedPassword,
        });
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi đăng ký tài khoản');
    }
};
exports.registerAccountService = registerAccountService;
const registerOTPService = async (email, username) => {
    try {
        // 1. Kiểm tra xem email hoặc tài khoản đã được đăng ký chưa
        const existingAccount = await (0, account_repository_1.findAccountByEmail)(email);
        if (existingAccount) {
            throw new Error(`Địa chỉ email ${email} đã được sử dụng.`);
        }
        const account = await (0, account_repository_1.authenticate)(username);
        console.log(`Kiểm tra tài khoản: ${username}`, account);
        if (account && account[0]) {
            throw new Error(`Tên đăng nhập ${username} đã được sử dụng.`);
        }
        // 2. Tạo OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // 3. Gửi email chứa OTP
        const transporter = nodemailer_1.default.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: `"CHEMISTRY FORUM Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Mã OTP đăng ký tài khoản CHEMISTRY FORUM',
            html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #0d448a;">Xác thực Email Đăng ký</h2>
            <p>Cảm ơn bạn đã quan tâm đến Diễn đàn Hóa học (CHEMISTRY FORUM).</p>
            <p>Để hoàn tất quá trình đăng ký, vui lòng sử dụng mã OTP sau:</p>
            <p style="background-color: #f0f0f0; border: 1px solid #ddd; padding: 10px 15px; font-size: 18px; font-weight: bold; text-align: center; letter-spacing: 2px;">
                ${otp}
            </p>
            <p>Mã này có hiệu lực trong 5 phút.</p>
            <p>Nếu bạn không yêu cầu đăng ký tài khoản, vui lòng bỏ qua email này.</p>
            <hr>
            <p>Trân trọng,<br/>Đội ngũ CHEMISTRY FORUM</p>
        </div>`,
        };
        await transporter.sendMail(mailOptions);
        const otpToken = jsonwebtoken_1.default.sign({ email: email, otp: otp }, process.env.JWT_SECRET, { expiresIn: '5m' } // Hết hạn sau 5 phút
        );
        return {
            success: true,
            message: 'OTP đã được gửi đến email của bạn.',
            otpToken: otpToken,
        };
    }
    catch (error) {
        // Ném lỗi ra ngoài để API route có thể bắt và trả về đúng thông báo
        throw new Error(error.message || "Gửi email thất bại do lỗi hệ thống.");
    }
};
exports.registerOTPService = registerOTPService;
const verifyCurrentPasswordService = async (username, currentEncryptedPassword) => {
    try {
        if (!currentEncryptedPassword) {
            throw new Error("Mật khẩu hiện tại là bắt buộc.");
        }
        // 1. Lấy thông tin tài khoản từ DB
        const account = await (0, account_repository_1.authenticate)(username);
        if (!account || !account[0]) {
            throw new Error("Không tìm thấy tài khoản.");
        }
        const user = account[0];
        // 2. Giải mã và so sánh mật khẩu
        const decryptedPassword = currentEncryptedPassword;
        if (!decryptedPassword)
            throw new Error("Mật khẩu không hợp lệ.");
        const isMatch = await bcryptjs_1.default.compare(decryptedPassword, user.password);
        // 3. Trả về kết quả
        if (!isMatch) {
            throw new Error("Mật khẩu hiện tại không chính xác.");
        }
        // Nếu mọi thứ ổn, trả về thành công
        return { success: true, message: "Mật khẩu chính xác." };
    }
    catch (error) {
        throw error; // Ném lỗi để API Route bắt
    }
};
exports.verifyCurrentPasswordService = verifyCurrentPasswordService;
const updateProfileService = async (username, model) => {
    try {
        // 1. Validate các trường thông tin cơ bản
        if (!model.name?.trim())
            throw new Error('Họ tên không được để trống');
        if (!model.email?.trim())
            throw new Error('Email không được để trống');
        // Kiểm tra xem email có thay đổi không và có bị trùng không
        const currentUser = await (0, account_repository_1.authenticate)(username);
        if (!currentUser || !currentUser[0]) {
            throw new Error("Tài khoản không tồn tại.");
        }
        if (currentUser[0].email !== model.email) {
            const existingAccount = await (0, account_repository_1.findAccountByEmail)(model.email);
            if (existingAccount) {
                throw new Error(`Địa chỉ email ${model.email} đã được sử dụng.`);
            }
        }
        // Tạo một bản sao của model để chỉnh sửa an toàn
        const updatedModel = { ...model };
        // 2. Xử lý logic đổi mật khẩu
        if (model.newPassword) {
            if (!model.currentPassword) {
                throw new Error("Vui lòng nhập mật khẩu hiện tại để thực hiện thay đổi.");
            }
            // Tái sử dụng logic xác thực
            const decryptedCurrentPassword = model.currentPassword;
            if (!decryptedCurrentPassword)
                throw new Error("Mật khẩu hiện tại không hợp lệ.");
            const isMatch = await bcryptjs_1.default.compare(decryptedCurrentPassword, currentUser[0].password);
            if (!isMatch) {
                throw new Error("Mật khẩu hiện tại không chính xác.");
            }
            // Mã hóa mật khẩu mới và thay thế nó trong model
            const decryptedNewPassword = model.newPassword;
            if (!decryptedNewPassword)
                throw new Error("Mật khẩu mới không hợp lệ.");
            updatedModel.password = await bcryptjs_1.default.hash(decryptedNewPassword, 10);
        }
        else {
            // Nếu không đổi mật khẩu, không gửi trường password đi
            delete updatedModel.password;
        }
        // 3. Xóa các trường không cần thiết trước khi gửi đến repository
        delete updatedModel.currentPassword;
        delete updatedModel.newPassword;
        // Đảm bảo username được lấy từ nguồn tin cậy (token), không phải từ model
        updatedModel.username = username;
        // 4. Gọi repository với model đã được xử lý
        const result = await (0, account_repository_1.updateProfile)(updatedModel);
        return result;
    }
    catch (error) {
        // Ném lỗi ra ngoài để API Route xử lý
        throw error;
    }
};
exports.updateProfileService = updateProfileService;
