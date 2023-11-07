/* Reference: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch */

export type ResponseData = {
    status: number;
    message?: string;
    data?: any;
    token?: any;
};

export class HttpError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}

/**
 * The below code provides helper functions for making HTTP requests using the fetch API in TypeScript.
 * @param {string} url - The `url` parameter is a string that represents the URL of the API endpoint
 * you want to make a request to. It should include the protocol (e.g., "http://" or "https://") and
 * the domain name or IP address.
 * @param {any} data - The `data` parameter is an object that you want to send to the above url for
 * additional arguments.
 * @returns The fetchGet, fetchPost, fetchPut, and fetchDelete functions all return a Promise that
 * resolves to the parsed JSON response from the server.
 */

export async function fetchGet(url: string) {
    const response = await fetch(url);
    const res = await response.json(); // parses JSON response into native JavaScript objects

    if (response.status >= 300) {
        throw new HttpError(res.status, res.message);
    } else {
        return res;
    }
}

export async function fetchGetWithAuthorization(url: string, token: any) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "GET",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });

    const res = await response.json(); // parses JSON response into native JavaScript objects

    if (response.status >= 300) {
        throw new HttpError(res.status, res.message);
    } else {
        return res;
    }
}

export async function fetchPost(url: string, data: any) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const res = await response.json(); // parses JSON response into native JavaScript objects

    if (response.status >= 300) {
        throw new HttpError(res.status, res.message);
    } else {
        return res;
    }
}

export async function fetchPostWithAuthorization(
    url: string,
    data: any,
    token: any
) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const res = await response.json(); // parses JSON response into native JavaScript objects

    if (response.status >= 300) {
        throw new HttpError(res.status, res.message);
    } else {
        return res;
    }
}

export async function fetchPut(url: string, data: any) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const res = await response.json(); // parses JSON response into native JavaScript objects
    if (response.status >= 300) {
        throw new HttpError(response.status, res.message);
    } else {
        return res;
    }
}

export async function fetchDelete(url: string, data: any) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const res = await response.json(); // parses JSON response into native JavaScript objects
    if (response.status >= 300) {
        throw new HttpError(res.status, res.message);
    } else {
        return res;
    }
}

export async function fetchDeleteWithAuthorization(
    url: string,
    data: any,
    token: any
) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "DELETE",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const res = await response.json(); // parses JSON response into native JavaScript objects

    if (response.status >= 300) {
        throw new HttpError(res.status, res.message);
    } else {
        return res;
    }
}
