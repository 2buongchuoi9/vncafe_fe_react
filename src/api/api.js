import axios from "axios"
import { accessToken, clientId } from "~/utils/localStorageUtil"

const getHeader = () => ({ authorization: accessToken.get(), "x-client-id": clientId.get() })

const api = axios.create({
    // baseURL: "http://192.168.1.12:8083/api",
    // baseURL: "http://localhost:8083/api",
    // baseURL: "http://192.168.1.9:8083/api",
    baseURL: "https://shopaa.click/api",
    headers: { "Content-Type": "application/json; charset=UTF-8", ...getHeader() },
    withCredentials: true,
})
export default api
