export async function handleResError(res: globalThis.Response) {
    if (!res.ok) {
        if (res.headers.get("content-type")?.includes("application/json")) {
            const err = await res.json();
            throw new Error(err.message);
        }

        if (!res.headers.get("content-type")?.includes("text/plain")) {
            const err = await res.text();
            throw new Error(err);
        }

        throw new Error(res.statusText);
    }
}