import { config } from "dotenv";
import { version } from "os";

class ApiUrlBuilder {
    private basePath: string;
    private version: string;
    
    constructor(
        basePath : string =  'api',
        version : string =  'v1'
    ) {
        this.basePath = basePath;
        this.version = version;
    }
    
    /**
     * Tworzy bazowy URL z wersją API
     * @returns Baza URL-a API
    */
   private getBaseUrl(): string {
       return `/${this.basePath}/${this.version}`;
    }
    
    /**
     * Tworzy URL do dodawania zasobu
     * @param resource Ścieżka zasobu
     * @returns URL do dodawania zasobu
    */
   createAddUrl(resource: string): string {
       if (!resource) {
           throw new Error('Resource path cannot be empty');
        }
        return `${this.getBaseUrl()}/${resource}/add`;
    }
    
    /**
     * Tworzy URL do pobierania zasobów z parametrami zapytania
     * @param resource Ścieżka zasobu
     * @param queryParams Parametry zapytania
     * @returns URL z parametrami zapytania
    */
   createUrlWithQuery(resource: string, queryParams: Record<string,string>): string {
        if (!resource) {
            throw new Error('Resource path cannot be empty');
        }
        
        const queryString = new URLSearchParams(queryParams).toString();
        return `${this.getBaseUrl()}/${resource}${queryString ? `?${queryString}` : ''}`;
    }
}

export const apiUrlBuilderV1 = new ApiUrlBuilder('api', 'v1');