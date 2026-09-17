// /*
//  * Central place for talking to the DevForge backend.
//  * Set VITE_API_URL in a .env file at the project root, e.g.:
//  *   VITE_API_URL=http://localhost:5000/api
//  */

// export const API_BASE_URL =
//     import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export class ApiError extends Error {
//     status: number;
//     errors?: unknown;

//     constructor(message: string, status: number, errors?: unknown) {
//         super(message);
//         this.name = 'ApiError';
//         this.status = status;
//         this.errors = errors;
//     }
// }

// export async function apiFetch<T>(
//     path: string,
//     options: RequestInit = {}
// ): Promise<T> {

//     const response = await fetch(`${API_BASE_URL}${path}`, {
//         ...options,
//         headers: {
//             'Content-Type': 'application/json',
//             ...(options.headers || {}),
//         },
//     });

//     let body: any = null;

//     try {
//         body = await response.json();
//     } catch {
//         // no JSON body (e.g. network error) — leave body as null
//     }

//     if (!response.ok) {
//         throw new ApiError(
//             body?.message || 'Something went wrong. Please try again.',
//             response.status,
//             body?.errors
//         );
//     }

//     return body as T;
// }

// export async function adminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
//     const token = localStorage.getItem('devforge_admin_token');
//     return apiFetch<T>(path, {
//         ...options,
//         headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) },
//     });
// }
/*
 * Central place for talking to the DevForge backend.
 *
 * Example:
 * VITE_API_URL=http://localhost:5000/api
 */

export const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

export class ApiError extends Error {
    status: number;
    errors?: unknown;

    constructor(
        message: string,
        status: number,
        errors?: unknown
    ) {
        super(message);

        this.name = "ApiError";
        this.status = status;
        this.errors = errors;
    }
}

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const isFormData =
        options.body instanceof FormData;

    const headers = new Headers(
        options.headers || {}
    );

    /*
     * FormData માટે Content-Type manually set ન કરવું.
     * Browser multipart boundary automatically add કરે છે.
     */
    if (
        !isFormData &&
        !headers.has("Content-Type")
    ) {
        headers.set(
            "Content-Type",
            "application/json"
        );
    }

    let response: Response;

    try {
        response = await fetch(
            `${API_BASE_URL}${path}`,
            {
                ...options,
                headers,
            }
        );
    } catch {
        throw new ApiError(
            "Backend server is not reachable.",
            0
        );
    }

    let body: any = null;

    try {
        body = await response.json();
    } catch {
        body = null;
    }

    if (!response.ok) {
        throw new ApiError(
            body?.message ||
                "Something went wrong. Please try again.",
            response.status,
            body?.errors
        );
    }

    return body as T;
}

export async function adminFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token =
        localStorage.getItem(
            "devforge_admin_token"
        );

    const headers = new Headers(
        options.headers || {}
    );

    if (token) {
        headers.set(
            "Authorization",
            `Bearer ${token}`
        );
    }

    return apiFetch<T>(
        path,
        {
            ...options,
            headers,
        }
    );
}

export interface UploadedFile {
    filename: string;
    originalName: string;
    mimetype: string;
    size: number;
    url: string;
}

export async function uploadAdminFile(
    file: File
): Promise<UploadedFile> {
    const formData =
        new FormData();

    formData.append(
        "file",
        file
    );

    const response =
        await adminFetch<{
            success: boolean;
            message: string;
            data: UploadedFile;
        }>(
            "/uploads",
            {
                method: "POST",
                body: formData,
            }
        );

    return response.data;
}