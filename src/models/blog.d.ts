export interface IBlog {
    id: string;
    image: string;
    title: string;
    description: string | null;
    views: int | null;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    create_by_name: string | null;
    updated_by: string;
    deleted: boolean
}


export interface IBlog_Get {
    id: string;
    image: string;
    title: string;
    description: string | null;
    created_at: string;
    updated_at: string;
    created_by: string;
    created_by_name: string | null;
    updated_by: string;
    deleted: boolean
    TotalRecords: number;
}


