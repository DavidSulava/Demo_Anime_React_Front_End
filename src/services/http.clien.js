export const Method = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
}

export default class HttpClient {
    static async call(
        method,
        url,
        dynamicHeaders = {},
        data = null,
        responseType = 'json',
        contentType = 'application/json'
    ) {

        const staticHeaders = {"Content-Type": contentType}
        const params = {
            method,
            headers: Object.assign(staticHeaders, dynamicHeaders),
            responseType: responseType,
            credentials: 'include'
        }
        if (data)
            params.body = JSON.stringify(data)


        return await fetch(url, params)
    }
}
