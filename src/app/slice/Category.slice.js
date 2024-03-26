import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "~/api/api"
import { buildCategoryTree } from "~/utils"

export const fetchCategory = createAsyncThunk("category/getCategory", async () => {
    const a = await api.get("/category")

    const cates = a.data.data

    return buildCategoryTree(cates)
})

const cateSlice = createSlice({
    name: "category",
    initialState: {
        isLoading: false,
        isSuccess: false,
        category: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCategory.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.category = action.payload
            })
    },
})

const cateReducer = cateSlice.reducer
const cateAction = { ...cateSlice.actions, fetchCategory }
const cateSelect = {
    state: (state) => state.category,
    category: (state) => state.category.category,
    isLoading: (state) => state.category.isLoading,
    isSuccess: (state) => state.category.isSuccess,
}

export { cateAction, cateSelect }
export default cateReducer
