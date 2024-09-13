export interface ServiceInterface {
    id: number,
    name: string,
    price?: number,
    description?: string
}

export type ServiceType = ServiceInterface;