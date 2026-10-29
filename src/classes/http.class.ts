
export class Http {
  async ajax<T>(
    method: string,
    url: string,
    body: object | FormData | null = null
  ): Promise<T | null> {
    const json = body !== null && !(body instanceof FormData);

    const headers: HeadersInit = json
      ? { 'Content-Type': 'application/json' }
      : {};

    const resp = await fetch(url, {
      method,
      headers,
      body: json ? JSON.stringify(body) : body
    });

    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    if (resp.status !== 204) {
      return await resp.json() as T;
    }

    return null;
  }

  get<T>(url: string): Promise<T | null> {
    return this.ajax<T>('GET', url);
  }

  post<T>(url: string, body: object | FormData): Promise<T | null> {
    return this.ajax<T>('POST', url, body);
  }

  put<T>(url: string, body: object | FormData): Promise<T | null> {
    return this.ajax<T>('PUT', url, body);
  }

  delete(url: string): Promise<null> {
    return this.ajax<never>('DELETE', url);
  }
}