import propTypes from "prop-types"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
// import duration from "dayjs/plugin/duration"
// import relativeTime from "dayjs/plugin/relativeTime"

// dayjs.extend(duration)
// dayjs.extend(relativeTime)

dayjs.locale("vi")

function timeAgo(time) {
    console.log("time", time)
    const now = new Date()
    const then = dayjs(time, "DD-MM-YYYY HH:mm:ss").toDate()
    const seconds = Math.floor((now - then) / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) {
        return `${seconds} giây trước`
    } else if (minutes < 60) {
        return `${minutes} phút trước`
    } else if (hours < 24) {
        return `${hours} giờ trước`
    } else if (days < 2) {
        return `hôm qua ${hours % 24} giờ`
    } else {
        return dayjs(time, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss")
    }
}

const TimeComment = ({ createAt }) => {
    const a = dayjs(createAt, "DD-MM-YYYY HH:mm:ss").format("HH:mm DD-MM")
    console.log("kjhfksjd", a)
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
