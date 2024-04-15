import { Typography } from "antd"
import propTypes from "prop-types"
import { Link } from "react-router-dom"
import { FaMessage } from "react-icons/fa6"

const enumValues = ["primary", "subPrimary", "horizontal", "vertical"]

const Primary = ({ news, className }) => {
    return (
        <div className={`${className} clear-left`}>
            <Link className="float-left mr-4 w-" to={`/news/${news.id}`}>
                <div className="relative sm:w-full md:w-[440px] lg:w-[520px] w-full md:pt-[60%] h-full">
                    <img
                        className="md:absolute top-0 left-0 w-full h-full object-cover"
                        // className="min-w-[375px] min-h-[225px] w-[440px] h-[264px] lg:w-[520px] lg:h-[312px] sm:w-[300px] sm:h-[180px] object-cover"
                        src={news?.image}
                        alt={news?.name}
                    />
                </div>
            </Link>

            <Link to={`/news/${news.id}`}>
                <Typography.Title className="hover:text-blue-400 text-black" level={3}>
                    {news?.name}
                </Typography.Title>
            </Link>
            <Link to={`/news/${news.id}`}>{news?.description}</Link>

            <Link className="flex space-x-2 items-center mt-2" to={`/news/${news.id}`}>
                <Link to={`/news/${news.id}`} className="hover:text-blue-400 text-base">
                    {news?.category?.parentName}
                </Link>
                <FaMessage color="gray" size={13} />
                <span className="text-blue-500 text-sm">{news?.totalComment}</span>
            </Link>
        </div>
    )
}

const Horizontal = ({ news, className, isBanner = true }) => {
    return (
        <div className={`${className} w-full h-full`}>
            {isBanner ? (
                <div className="clear-left">
                    <Link className="float-left mr-2" to={`/news/${news.id}`}>
                        <div className="max-h-[150px] overflow-hidden">
                            <img className="w-[225px] h-[135px] object-cover" src={news?.image} alt={news?.name} />
                        </div>
                    </Link>

                    <Link to={`/news/${news.id}`}>
                        <Typography.Title className="hover:text-blue-400 text-black" level={5}>
                            {news?.name}
                        </Typography.Title>
                    </Link>
                    <Link to={`/news/${news.id}`} className="leading-tight text-sm text-ellipsis overflow-hidden ...">
                        {news?.description}
                    </Link>
                </div>
            ) : (
                <div>
                    <Link to={`/news/${news.id}`}>
                        <Typography.Title className="hover:text-blue-400 text-black" level={5}>
                            {news?.name}
                        </Typography.Title>
                    </Link>
                    <Link to={`/news/${news.id}`} className="leading-tight text-sm relative">
                        <p className="text-ellipsis overflow-hidden &nbsp...">{news?.description}</p>
                    </Link>
                </div>
            )}
        </div>
    )
}

const Vertical = ({ news, className }) => {
    return (
        <div className={`${className} w-full clear-left`}>
            <Link className="text-black " to={`/news/${news.id}`}>
                <Typography.Title className="text-black" level={5}>
                    {news?.name}
                </Typography.Title>
            </Link>

            <div className="">
                <Link className="w-[150px] float-left mr-2" to={`/news/${news.id}`}>
                    <img className="w-[150px] h-[90px] object-cover" src={news?.image} alt={news?.name} />
                </Link>

                <Link className="text-sm" to={`/news/${news.id}`}>
                    {news?.description}
                </Link>

                {news?.totalComment > 0 && (
                    <Link to={`/news/${news.id}`} className="flex items-center space-x-2">
                        <FaMessage color="gray" size={10} />
                        <span className="text-blue-500 text-sm">{news?.totalComment}</span>
                    </Link>
                )}
            </div>
            <span className="clear-left"></span>
        </div>
    )
}
const SubPrimary = ({ news, className }) => {
    return (
        <div className={`${className} h-full`}>
            <div className="flex flex-col justify-between h-full">
                <Link to={`/news/${news.id}`}>
                    <Typography.Title className="hover:text-blue-400 text-black" level={5}>
                        {news?.name}
                    </Typography.Title>
                </Link>
                <Link className="" to={`/news/${news.id}`}>
                    <img src={news?.image} className="w-[250px] h-[150px] object-cover " alt={news?.name} />
                </Link>
            </div>
        </div>
    )
}

const CartNews = ({ type = "primary", news, className = "", isBanner = true }) => {
    return (
        <>
            {type === "primary" ? (
                <Primary className={className} news={news} />
            ) : type === "subPrimary" ? (
                <SubPrimary className={className} news={news} />
            ) : type === "vertical" ? (
                <Vertical className={className} news={news} />
            ) : (
                <Horizontal className={className} news={news} isBanner={isBanner} />
            )}
        </>
    )
}
CartNews.propTypes = {
    type: propTypes.arrayOf(propTypes.oneOf(enumValues)),
    news: propTypes.object.isRequired,
    isBanner: propTypes.bool,
    className: propTypes.string,
}
Primary.propTypes = { news: propTypes.object.isRequired, className: propTypes.string }
SubPrimary.propTypes = { news: propTypes.object.isRequired, className: propTypes.string }
Vertical.propTypes = { news: propTypes.object.isRequired, className: propTypes.string }
Horizontal.propTypes = { news: propTypes.object.isRequired, isBanner: propTypes.bool, className: propTypes.string }
export default CartNews
