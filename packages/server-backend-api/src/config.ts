import * as dotenv from 'dotenv';
dotenv.config();

export const ALLOWED_ORIGINS: string[] = (process.env.ALLOWED_ORIGINS || '').split(',');

export const API_PORT : number = Number(process.env.API_PORT);
export const DATABASE_NAME : string = String(process.env.DATABASE_NAME) ?? 'photography';
export const DATABASE_HOST : string = String(process.env.DATABASE_HOST) ?? 'localhost';
export const DATABASE_PORT : number = Number(process.env.DATABASE_PORT) ?? 3306;
export const DATABASE_USER : string = String(process.env.DATABASE_USER) ?? 'root';
export const DATABASE_PASSWORD : string = String(process.env.DATABASE_PASSWORD) ?? '';

