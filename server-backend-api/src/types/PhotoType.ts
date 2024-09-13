export interface PhotoInterface {
    id:number,
    url:string,
    title:string,
    description?:string
}

export type PhotoType = PhotoInterface