/**
 * A reusable API client to handle fetch operations.
 */

// Define a common structure for API errors
export class ApiError extends Error {
    constructor(message: string, public status: number) {
        super(message);
        this.name = 'ApiError';
    }
}

// Base options for fetch requests
interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
}

export class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    /**
     * Performs a generic HTTP request.
     * @param endpoint - The API endpoint (e.g., '/users')
     * @param options - Fetch options (method, headers, body, etc.)
     * @returns A promise that resolves to the JSON response
     */
    private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;

        // Set default headers
        const defaultHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // You could add an auth token here if needed
            // 'Authorization': `Bearer ${yourAuthToken}`
        };

        const config: RequestInit = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                // Handle HTTP errors
                const errorText = await response.text();
                throw new ApiError(
                    `API Error: ${response.statusText} (${response.status}) - ${errorText}`,
                    response.status
                );
            }

            // Handle no content response
            if (response.status === 204) {
                return null as T;
            }

            return (await response.json()) as T;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            if (error instanceof Error) {
                throw new Error(`Network error: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred.');
            }
        }
    }

    /**
     * Performs a GET request.
     * @param endpoint - The API endpoint.
     */
    public get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    /**
     * Performs a POST request.
     * @param endpoint - The API endpoint.
     * @param body - The request payload.
     */
    public post<T, U>(endpoint: string, body: U): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    /**
     * Performs a PUT request.
     * @param endpoint - The API endpoint.
     * @param body - The request payload.
     */
    public put<T, U>(endpoint: string, body: U): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    /**
     * Performs a DELETE request.
     * @param endpoint - The API endpoint.
     */
    public delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}
