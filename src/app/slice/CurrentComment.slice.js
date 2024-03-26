import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "~/api/api"
import { buildCommentTree } from "~/utils"

export const fetchComment = createAsyncThunk(
    "comment/getComment",
    async ({ page = 0, sort = "createdAt,desc", newsId = null, parentId = null, userId = null }) => {
        const params = { page, sort, newsId, parentId, userId }

        const a = await api.get("/comment", { params })

        return buildCommentTree(a.data.data)
    }
)

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        loading: false,
        success: false,
        countComments: 0,
        comments: [],
    },
    // reducers: {
    //     loginSuccess: (state, action) => {
    //         clientId.set(action.payload.user.id)
    //         accessToken.set(action.payload.token.accessToken)
    //         state.isLogged = true
    //         state.isLogging = false
    //         state.user = action.payload.user
    //     },

    //     logout: (state) => {
    //         accessToken.remove()
    //         clientId.remove()
    //         state.isLogged = true
    //         state.isLogging = false
    //         state.user = initUser
    //         // setUserId(action.payload.id)
    //         // setAccessToken(action.payload.token.accessToken)
    //         // setRefeshToken(action.payload.token.refreshToken)
    //     },
    // },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComment.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchComment.rejected, (state) => {
                state.loading = false
                state.success = false
            })
            .addCase(fetchComment.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.comments = action.payload
            })
    },
})

const commentReducer = commentSlice.reducer
const commentAction = { ...commentSlice.actions, fetchInfo: fetchComment }
const commentSelect = {
    comments: (state) => state.comment.comments,
    loading: (state) => state.comment.loading,
    success: (state) => state.comment.success,
    countComments: (state) => state.comment.countComments,
}

export { commentAction, commentSelect }
export default commentReducer
