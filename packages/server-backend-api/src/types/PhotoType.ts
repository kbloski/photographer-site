export interface PhotoInterface {
    id?: number;
    url: string;
    title: string;
    description?: string;
    album_id?: number;
}

export type PhotoType = PhotoInterface;
