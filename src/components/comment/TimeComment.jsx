import propTypes from "prop-types"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(duration)
dayjs.extend(relativeTime)

function timeAgo(time) {
    const duration = dayjs.duration(dayjs().diff(dayjs(time, "DD-MM-YYYY HH:mm:ss")))
    const seconds = duration.asSeconds()
    const minutes = duration.asMinutes()
    const hours = duration.asHours()
    const days = duration.asDays()

    if (seconds < 60) {
        return `${Math.floor(seconds)} giây trước`
    } else if (minutes < 60) {
        return `${Math.floor(minutes)} phút trước`
    } else if (hours < 24) {
        return `${Math.floor(hours)} giờ trước`
    } else if (days < 2) {
        return `hôm qua ${Math.floor(hours % 24)} giờ`
    } else {
        return dayjs(time, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss")
    }
}

const TimeComment = ({ createAt }) => {
    const [time, setTime] = useState(() => timeAgo(createAt))

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(timeAgo(createAt))
        }, 15000) // cập nhật thời gian sau mỗi 60 giây

        return () => {
            clearInterval(timer) // dọn dẹp khi component unmount
        }
    }, [createAt])

    return (
        <div>
            {/* các thông tin khác của comment */}
            <div>{time}</div>
        </div>
    )
}
TimeComment.propTypes = { createAt: propTypes.string.isRequired }
export default TimeComment
