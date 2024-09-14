export interface AlbumInterface {
    id:number,
    name: string,
    description?: string
    user_id?: number
}

export type AlbumType = AlbumInterface;