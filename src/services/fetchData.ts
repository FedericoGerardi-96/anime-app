import { JIKAN_API_URL } from 'astro:env/server';

export class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = JIKAN_API_URL;
  }

  async fetch(
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    queryParams?: Record<string, string>,
    body?: any
  ): Promise<any> {
    try {
      const fullUrl = `${this.baseUrl}${path}`;
      const url = new URL(fullUrl);
      
      if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url.toString(), options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error en la solicitud ${method} a ${path}: ${response.status} - ${errorData.message || response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error en ApiService:', error);
      throw error;
    }
  }

  async get(path: string, queryParams?: Record<string, string>): Promise<any> {
    return this.fetch(path, 'GET', queryParams);
  }

  async post(path: string, body?: any): Promise<any> {
    return this.fetch(path, 'POST', undefined, body);
  }

  // ... otros métodos (PUT, DELETE, etc.) ...
}
