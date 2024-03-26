import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "~/api/api"
import { accessToken, clientId } from "~/utils/localStorageUtil"

export const fetchInfo = createAsyncThunk("auth/getInfo", async () => {
    const a = await api.post("/user/profile", "")
    return a.data.data
})

const initUser = {
    id: null,
    name: null,
    email: null,
    image: null,
    createAt: null,
    authType: null,
    roles: [],
    oauth2Id: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogging: false,
        isLogged: false,
        user: initUser,
    },
    reducers: {
        loginSuccess: (state, action) => {
            clientId.set(action.payload.user.id)
            accessToken.set(action.payload.token.accessToken)
            state.isLogged = true
            state.isLogging = false
            state.user = action.payload.user
        },

        logout: (state) => {
            accessToken.remove()
            clientId.remove()
            state.isLogged = true
            state.isLogging = false
            state.user = initUser
            // setUserId(action.payload.id)
            // setAccessToken(action.payload.token.accessToken)
            // setRefeshToken(action.payload.token.refreshToken)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInfo.pending, (state) => {
                state.isLogging = true
            })
            .addCase(fetchInfo.rejected, (state) => {
                state.isLogged = false
                state.isLogging = false
            })
            .addCase(fetchInfo.fulfilled, (state, action) => {
                state.isLogging = false
                state.isLogged = true
                state.user = action.payload
            })
    },
})

const authReducer = authSlice.reducer
const authAction = { ...authSlice.actions, fetchInfo }
const authSelect = {
    user: (state) => {
        const { id, name, email, image, createAt, authType, roles, oauth2Id } = state.auth.user
        return { id, name, email, image, createAt, authType, roles, oauth2Id }
    },
    userv2: (state) => state.auth.user,
    isLogging: (state) => state.auth.isLogging,
    isLogged: (state) => state.auth.isLogged,
}

export { authAction, authSelect }
export default authReducer
