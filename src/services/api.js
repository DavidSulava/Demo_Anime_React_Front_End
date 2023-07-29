import HttpClient, {Method} from './http.clien';


export default class Api {
    static async getArticle(id) {
        const path = `${process.env.REACT_APP_DATA_API}/find/${id}`
        const response = await HttpClient.call(Method.GET, path);
        return await response.json()
    }

    static async getFilterCategories() {
        const path = `${process.env.REACT_APP_DATA_API}/filter`;
        const response = await HttpClient.call(Method.GET, path);
        return await response.json()
    }

    static async getMovie(getParams) {
        const path = (getParams === '') ? `${process.env.REACT_APP_DATA_API}/media` : `${process.env.REACT_APP_DATA_API}/media?${getParams}`;
        const response = await HttpClient.call(Method.GET, path);
        return await response.json()
    }

    static async getTokensSilently(path_, authToken) {
        const path = `${process.env.REACT_APP_LOGIN_SERVER_API}${path_}`;
        return await HttpClient.call(Method.POST, path, {'Authorization': authToken});
    }

    static async getSearch(params) {
        const path = params === '' ? `${process.env.REACT_APP_DATA_API}/findAll?` : `${process.env.REACT_APP_DATA_API}/findAll?${params}`;
        const response = await HttpClient.call(Method.GET, path);
        return await response.json()
    }

    static async getUser(authToken, body, path_ = '/user/login') {
        const path = `${process.env.REACT_APP_LOGIN_SERVER_API}${path_}`;
        return await HttpClient.call(Method.POST, path, {'Authorization': authToken}, body);
    }

    static async logOut(path_, authToken, body) {
        const path = `${process.env.REACT_APP_LOGIN_SERVER_API}${path_}`
        return await HttpClient.call(Method.POST, path, {'Authorization': authToken}, body);
    }

    static async updateUserData(path_, authToken, body) {
        const path = `${process.env.REACT_APP_LOGIN_SERVER_API}${path_}`
        return await HttpClient.call(Method.POST, path, {'Authorization': authToken}, body);
    }
}