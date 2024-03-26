const token = "token"
const id = "x-client-id"

class Default {
    constructor(key) {
        this.key = key
    }

    get() {
        return localStorage.getItem(this.key)
    }
    set(value) {
        localStorage.setItem(this.key, value)
    }
    remove() {
        localStorage.removeItem(this.key)
    }
}

const getToken = () => localStorage.getItem(token)

const getClientId = () => localStorage.getItem(id)

const setToken = (value) => localStorage.setItem(token, value)

const setClientId = (value) => localStorage.setItem(id, value)

const accessToken = new Default(token)
const refreshTokenStorage = new Default(token)
const clientId = new Default(id)

export { accessToken, refreshTokenStorage, clientId }
