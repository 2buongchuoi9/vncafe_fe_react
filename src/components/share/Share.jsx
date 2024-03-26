import propTypes from "prop-types"
import { FaFacebookF } from "react-icons/fa6"
import { AiOutlineTwitter } from "react-icons/ai"
import { FaLinkedinIn } from "react-icons/fa6"
import { IoHeart } from "react-icons/io5"
import { FaMessage } from "react-icons/fa6"
import { useState } from "react"

const items = [
    {
        icon: <FaFacebookF color="gray" size={19} />,
        iconHover: <FaFacebookF size={19} color="white" />,
        bg: "bg-blue-900",
        label: "Facebook",
        link: "https://www.facebook.com/",
        tooltip: "Share on Facebook",
    },
    {
        icon: <AiOutlineTwitter color="gray" size={19} />,
        iconHover: <AiOutlineTwitter size={19} color="white" />,
        border: true,
        bg: "bg-blue-500",
        label: "Facebook",
        link: "https://www.facebook.com/",
        tooltip: "Share on Twitter",
    },
    {
        icon: <FaLinkedinIn color="gray" size={19} />,
        iconHover: <FaLinkedinIn size={19} color="white" />,
        bg: "bg-blue-700",
        label: "Facebook",
        link: "https://www.facebook.com/",
        tooltip: "Share on Twitter",
    },
    {
        icon: <IoHeart color="gray" size={20} />,
        iconHover: <IoHeart size={20} color="white" />,
        bg: "bg-red-500",
        label: "Facebook",
        link: "https://www.facebook.com/",
        tooltip: "Share on Twitter",
    },
    {
        icon: <FaMessage color="gray" size={15} />,
        iconHover: <FaMessage size={15} color="white" />,
        bg: "bg-red-500",
        label: "Facebook",
        link: "https://www.facebook.com/",
        tooltip: "Share on Twitter",
    },
]

const Share = ({ className }) => {
    const [hoveredItem, setHoveredItem] = useState(null)
    return (
        <div className={className}>
            <div className="flex flex-col space-y-3">
                {items.map((item, index) => {
                    return (
                        <button
                            key={index}
                            onMouseEnter={() => setHoveredItem(index)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className={`rounded-full bg-white border-[1px] w-8 h-8 flex items-center justify-center ${
                                hoveredItem === index ? item.bg : ""
                            }`}
                        >
                            {hoveredItem === index ? item.iconHover : item.icon}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
Share.propTypes = { className: propTypes.string }
export default Share
