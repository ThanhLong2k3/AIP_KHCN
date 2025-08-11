// Dữ liệu cho các thẻ thống kê
export interface IDashboardStats {
    studentCount: number;
    blogCount: number;
    lessonCount: number;
    subjectCount: number;
}

// Dữ liệu cho một điểm trên biểu đồ
export interface IBlogView {
    date: string; // Định dạng 'YYYY-MM-DD'
    views: number;
}