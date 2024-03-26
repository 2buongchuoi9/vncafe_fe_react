import { Typography } from "antd"
import propTypes from "prop-types"
import { Link } from "react-router-dom"
import { FaMessage } from "react-icons/fa6"

const enumValues = ["primary", "subPrimary", "horizontal", "vertical"]

const Primary = ({ news }) => {
    return (
        <div className="flex flex-row space-x-4">
            <div className="basis-2/3">
                <Link to={`/news/${news.id}`}>
                    <img src={news?.image} alt={news?.name} />
                </Link>
            </div>
            <div className="basis-1/3 space-y-3">
                <Link to={`/news/${news.id}`}>
                    <Typography.Title className="hover:text-blue-400 text-black" level={3}>
                        {news?.name}
                    </Typography.Title>
                </Link>
                <Link to={`/news/${news.id}`}>{news?.description}</Link>
                <div className="flex space-x-3 items-center">
                    <Link to={`/news/${news.id}`} className="hover:text-blue-400">
                        {news?.category?.parentName}
                    </Link>
                    <Link to={`/news/${news.id}`}>
                        <div className="flex space-x-1 justify-center items-center">
                            <FaMessage color="gray" size={13} /> <span className="text-blue-500 text-sm">{news?.totalComment}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const Horizontal = ({ news, isBanner = true }) => {
    return (
        <div>
            {isBanner ? (
                <div className="flex flex-row space-x-3">
                    <div className="basis-1/2">
                        <Link to={`/news/${news.id}`}>
                            <img src={news?.image} alt={news?.name} />
                        </Link>
                    </div>
                    <div className="basis-1/2 ">
                        <Link to={`/news/${news.id}`}>
                            <Typography.Title className="hover:text-blue-400 text-black" level={5}>
                                {news?.name}
                            </Typography.Title>
                        </Link>
                        <Link to={`/news/${news.id}`} className="leading-tight text-sm relative">
                            {news?.description}
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <Link to={`/news/${news.id}`}>
                        <Typography.Title className="hover:text-blue-400 text-black" level={5}>
                            {news?.name}
                        </Typography.Title>
                    </Link>
                    <Link to={`/news/${news.id}`} className="leading-tight text-sm relative">
                        {news?.description}
                    </Link>
                </>
            )}
        </div>
    )
}

const Vertical = ({ news }) => {
    return (
        <div className="flex flex-col">
            <div className="">
                <Link to={`/news/${news.id}`}>
                    <Typography.Title className="hover:text-blue-400 text-black" level={5}>
                        {news?.name}
                    </Typography.Title>
                </Link>
            </div>
            <div className="flex flex-row space-x-2">
                <div className="basis-1/3">
                    <Link to={`/news/${news.id}`}>
                        <img src={news?.image} alt={news?.name} />
                    </Link>
                </div>
                <div className="basis-2/3 ">
                    <Link className="leading-tight text-sm relative" to={`/news/${news.id}`}>
                        {news?.description}
                        <div className="flex space-x-1 justify-center items-center absolute bottom-0 right-[-50px]">
                            <FaMessage color="gray" size={13} /> <span className="text-blue-500 text-sm">{news?.totalComment}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
const SubPrimary = ({ news }) => {
    return (
        <div className="h-full w-full">
            <div className="">
                <Link to={`/news/${news.id}`}>
                    <Typography.Title className="hover:text-blue-400 text-black" level={5}>
                        {news?.name}
                    </Typography.Title>
                </Link>
            </div>
            <div className="flex-grow h-full">
                <Link className="flex-grow h-full" to={`/news/${news.id}`}>
                    <div className="h-[180px] flex-grow">
                        <img src={news?.image} className="object-cover h-full" alt={news?.name} />
                    </div>
                </Link>
            </div>
        </div>
    )
}

const CartNews = ({ type = "primary", news, isBanner = true }) => {
    return (
        <>
            {type === "primary" ? (
                <Primary news={news} />
            ) : type === "subPrimary" ? (
                <SubPrimary news={news} />
            ) : type === "vertical" ? (
                <Vertical news={news} />
            ) : (
                <Horizontal news={news} isBanner={isBanner} />
            )}
        </>
    )
}
CartNews.propTypes = { type: propTypes.arrayOf(propTypes.oneOf(enumValues)), news: propTypes.object.isRequired, isBanner: propTypes.bool }
Primary.propTypes = { news: propTypes.object.isRequired }
SubPrimary.propTypes = { news: propTypes.object.isRequired }
Vertical.propTypes = { news: propTypes.object.isRequired }
Horizontal.propTypes = { news: propTypes.object.isRequired, isBanner: propTypes.bool }
export default CartNews
