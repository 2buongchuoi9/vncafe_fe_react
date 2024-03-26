import { Avatar, Button, Tooltip, theme } from "antd"
import TextArea from "antd/es/input/TextArea"
import propTypes from "prop-types"
import { useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import api from "~/api/api"
import { MessageApiContext } from "~/app/provider/MessageApiProvider"
import { authSelect } from "~/app/slice/Auth.slice"
import { commentAction } from "~/app/slice/CurrentComment.slice"
const InputComment = ({ newsId, comment = null }) => {
    const [value, setValue] = useState("")
    const { success, error } = useContext(MessageApiContext)
    const user = useSelector(authSelect.user)
    const { token } = theme.useToken()
    const dispatch = useDispatch()

    const handleComment = async () => {
        console.log("newsId", newsId)
        console.log("comment", comment)

        try {
            const res = await api.post("/comment", { newsId, parentId: comment?.id, content: value })
            console.log("res", res)
            success("Add Comment success")
            dispatch(commentAction.fetchInfo({ newsId }))
        } catch (err) {
            console.log(err)
            error("Add Comment fail")
        }
    }

    return (
        <div className="space-y-4 pb-2">
            <TextArea
                className=" border-l-red-500 border-l-2 hover:border-l-red-500 hover:border-l-2 focus:border-l-red-500 focus:border-l-2 "
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Chia sẻ ý kiến của bạn"
                rows={3}
            ></TextArea>
            <div className="flex justify-end items-center space-x-4">
                <div className="flex space-x-2 items-center">
                    <Avatar src={user?.image}></Avatar>
                    <span className="text-base font-normal">{user?.name}</span>
                </div>
                <Tooltip title={!value.trim() ? "comment is require" : null}>
                    <Button onClick={handleComment} type="primary" style={{ backgroundColor: token.colorPrimaryHover }} disabled={!value.trim()}>
                        Send
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}
InputComment.propTypes = {
    user: propTypes.object.isRequired,
    useId: propTypes.string,
    comment: propTypes.object,
    onOk: propTypes.func.isRequired,
    newsId: propTypes.string.isRequired,
}
export default InputComment
