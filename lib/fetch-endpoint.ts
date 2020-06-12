import fetch from 'isomorphic-unfetch'

export type FetEndReturnType = { error: string; data: Record<string, unknown>; res: Response };

/**
 * TODO: can specify special "rejects: true" option to enable throw
 * TODO: new Error on non-ok response status
 * TODO: returns: res, data, error (null if no error)
 * @param {*} url 
 * @param {*} options 
 */
export async function fetchEndpoint(url: string, options?: Record<string, unknown>): Promise<FetEndReturnType> {
    options = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        ...options
    };

    const res = await fetch(url, options);
    let data = null;
    let error = '';

    try { data = (await res.json()) || {}; }
    catch(err) { if(res.ok) throw err; }

    if(!res.ok) {
        error = `${res.status} ${ data?.error ?? res.statusText ?? 'an unknown error occurred' }`;

        if(options.rejects)
            throw new Error(error);
    }

    return { error, res, data };
}

/**
 * TODO: document these
 */
fetchEndpoint.get = (url: string, options?: Record<string, unknown>) => fetchEndpoint(url, { method: 'GET', ...options });
fetchEndpoint.put = (url: string, options?: Record<string, unknown>) => fetchEndpoint(url, { method: 'PUT', ...options });
fetchEndpoint.delete = (url: string, options?: Record<string, unknown>) => fetchEndpoint(url, { method: 'DELETE', ...options });
fetchEndpoint.post = fetchEndpoint;