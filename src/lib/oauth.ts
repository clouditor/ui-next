export interface TokenResponse {
    access_token: string
}

export interface ErrorResponse {
    error: string
}

export function isError(response: TokenResponse | ErrorResponse): response is ErrorResponse {
    return (response as ErrorResponse).error !== undefined;
}

export async function exchange(code: string): Promise<TokenResponse | ErrorResponse> {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code_verifier", localStorage.verifier);
    params.append("code", code);
    params.append("client_id", import.meta.env.VITE_CLIENT_ID);

    return fetch(import.meta.env.VITE_TOKEN_URL, {
        method: 'POST',
        body: params,
    })
        .then((res) => res.json())
        .then((response: TokenResponse) => {
            return response;
        });
}

export function generateVerifier(): string {
    const random = crypto.getRandomValues(new Uint8Array(32));
    return btoa(String.fromCharCode(...new Uint8Array(random)));
}

export async function generateChallenge(v: string): Promise<string> {
    const enc = new TextEncoder();
    const digest = await crypto.subtle.digest('SHA-256', enc.encode(v));
    return base64urlencode(String.fromCharCode(...new Uint8Array(digest)));
}

function base64urlencode(b: string): string {
    b = btoa(b).replace("+", "-").replace("/", "_").replace("=", "");

    return b;
}