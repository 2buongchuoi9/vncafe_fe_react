import propTypes from "prop-types"
import InputComment from "./InputComment"
import ItemComment from "./ItemComment"
import { useSelector } from "react-redux"
import { commentSelect } from "~/app/slice/CurrentComment.slice"

const Comment = ({ newsId }) => {
    const comments = useSelector(commentSelect.comments)
    const countComments = useSelector(commentSelect.countComments)

    return (
        <div>
            <div className="text-black font-bold text-lg">Comment({countComments})</div>
            <InputComment newsId={newsId} />
            {comments && comments.map((comment, index) => <ItemComment key={index} comment={comment} />)}
        </div>
    )
}
Comment.propTypes = { newsId: propTypes.string.isRequired }
export default Comment
