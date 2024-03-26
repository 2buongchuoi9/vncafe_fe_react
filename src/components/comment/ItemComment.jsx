import { Avatar, Tooltip } from "antd"
import propTypes from "prop-types"
import { LuReply } from "react-icons/lu"
import { AiOutlineLike } from "react-icons/ai"
import { useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authSelect } from "~/app/slice/Auth.slice"
import InputComment from "./InputComment"
import api from "~/api/api"
import { MessageApiContext } from "~/app/provider/MessageApiProvider"
import { commentAction } from "~/app/slice/CurrentComment.slice"
import TimeComment from "./TimeComment"
const ItemComment = ({ comment }) => {
    const { success, error } = useContext(MessageApiContext)
    const [showReply, setShowReply] = useState(false)
    const [showInputComment, setShowInputComment] = useState(false)
    const user = useSelector(authSelect.user)
    const dispatch = useDispatch()

    const handleLikeComment = async () => {
        if (!user.id) {
            success("Please login to like comment")
            return
        }
        console.log("comment", comment)
        console.log("user", user)
        try {
            const res = await api.post(`/comment/like/${comment.id}`)
            console.log("res", res)
            dispatch(commentAction.fetchInfo({ newsId: comment.newsId }))
        } catch (err) {
            console.log("error", err)
            error("Like comment fail")
        }
    }

    return (
        <div>
            <div className="">
                <div className="flex space-x-3">
                    <div className="">
                        <Avatar src={comment?.user?.image}></Avatar>
                    </div>
                    <div className="flex-1">
                        {/* content comment */}
                        <span>
                            <span className="text-black font-medium mr-3">{comment?.user?.name}</span>
                            <span className="text-[#4f4f4f]">{comment?.content}</span>
                        </span>
                        {/* icon like... */}
                        <div className="flex items-center justify-between py-2 text-[#4f4f4f] text-sm">
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1 group">
                                    {comment && comment?.likes && comment?.likes.length > 0 && comment.likes.includes(user.id) ? (
                                        <Tooltip title="Un like">
                                            <span onClick={handleLikeComment} className="text-red-500 hover:cursor-pointer">
                                                Liked
                                            </span>
                                        </Tooltip>
                                    ) : (
                                        <>
                                            <span>
                                                <AiOutlineLike />
                                            </span>
                                            <span onClick={handleLikeComment} className="group-hover:text-blue-400 group-hover:cursor-pointer">
                                                Like
                                            </span>
                                        </>
                                    )}
                                </div>
                                <div className="flex items-center space-x-1 group">
                                    <span className="rounded-full bg-[#fae4ea] p-1">
                                        <img
                                            src="https://res.cloudinary.com/anhdaden/image/upload/v1711353116/vncafe/tixxb5wndomaobc0gkyr.png"
                                            alt=""
                                        />
                                    </span>
                                    <span className="group-hover:text-red-600 group-hover:cursor-pointer">{comment?.likes.length}</span>
                                </div>
                                {/* show input comment */}
                                <div onClick={() => setShowInputComment(!showInputComment)} className="hover:text-red-600 hover:cursor-pointer">
                                    Reply
                                </div>
                            </div>
                            <div>
                                <TimeComment createAt={comment?.createAt} />
                            </div>
                        </div>
                        {/* show replies if exist */}
                        <div className="border-l-[2px] pl-2">
                            {showInputComment && <InputComment newsId={comment.newsId} comment={comment} />}
                            {comment && comment?.replies && comment?.replies.length > 0 && (
                                <>
                                    {showReply && (
                                        <div className=" space-x-1 ">
                                            {comment?.replies.map((v, index) => (
                                                <ItemComment key={index} comment={v}></ItemComment>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        {comment && comment?.replies && comment?.replies.length > 0 && !showReply ? (
                            <span className="flex space-x-1 items-center hover:cursor-pointer">
                                <div className="transform rotate-180">
                                    <LuReply color="gray"></LuReply>
                                </div>
                                <span onClick={() => setShowReply(true)} className="pb-2 hover:text-red-500">
                                    {comment?.replies.length} reply
                                </span>
                            </span>
                        ) : comment && comment?.replies && comment?.replies.length > 0 && showReply ? (
                            <span className="flex space-x-1 items-center hover:cursor-pointer">
                                <div className="">
                                    <LuReply color="gray"></LuReply>
                                </div>
                                <span onClick={() => setShowReply(false)} className="pb-2 hover:text-red-500">
                                    Hide {comment?.replies.length} reply
                                </span>
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
ItemComment.propTypes = {
    comment: propTypes.object.isRequired,
    selectedReply: propTypes.object,
    setSelectedReply: propTypes.func,
    setReLoad: propTypes.func,
}
export default ItemComment
