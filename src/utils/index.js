function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

const getCates = (categories) => {
    if (Array.isArray(categories)) {
        const recursiveMap = (category) => {
            const { children } = category
            let result = {
                key: category.id,
                label: category.name,
                value: category.id,
                ...categories,
            }
            if (children) {
                result.children = children.map(recursiveMap)
            }
            return result
        }
        return categories.map(recursiveMap)
    }
    return []
}

const getParentCateId = (cates, id) => {
    if (Array.isArray(cates)) {
        for (const cate of cates) {
            if (cate.id === id) {
                return [cate.parentId, cate.id]
            }
            if (cate.children) {
                const result = getParentCateId(cate.children, id)
                if (result.length > 0) {
                    return result
                }
            }
        }
    }
    return []
}

const buildCommentTree = (comments, parentId = null) => {
    const filteredComments = comments.filter((comment) => comment.parentId === parentId)

    const tree = filteredComments.map((comment) => {
        const replies = buildCommentTree(comments, comment.id)
        return replies.length > 0 ? { ...comment, replies } : { ...comment }
    })
    return tree
}
const buildCategoryTree = (categories, parentId = null) => {
    const filteredCategories = categories.filter((category) => category.parentId === parentId)

    const tree = filteredCategories.map((category) => {
        const children = buildCategoryTree(categories, category.id)
        return children.length > 0 ? { ...category, children } : { ...category }
    })
    return tree
}

export { shuffleArray, getCates, getParentCateId, buildCommentTree, buildCategoryTree }
