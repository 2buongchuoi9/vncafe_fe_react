import propTypes from "prop-types"
import { useEffect, useState } from "react"
import "dayjs/locale/vi"
import { IoIosArrowForward } from "react-icons/io"
import { Link, useParams } from "react-router-dom"
import banner from "~/assets/bn1.png"
import api from "~/api/api"
import { Typography } from "antd"
import dayjs from "dayjs"
import Share from "~/components/share/Share"
import Comment from "~/components/comment/Comment"
import { useDispatch } from "react-redux"
import { fetchComment } from "~/app/slice/CurrentComment.slice"
dayjs().locale("vi")

const NewsDetailUser = () => {
    const { id } = useParams()
    const [news, setNews] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetch = async () => {
            const a = await api.get(`/news/${id}`)
            await dispatch(fetchComment({ newsId: id }))
            setNews(a.data.data)
        }
        if (id) fetch()
    }, [id])

    return (
        <div className="bg-[#fcfaf6]">
            <div className="w-[90%] lg:w-[70%] m-auto">
                <div className="flex flex-row space-x-4">
                    {/* content news */}
                    <div className="w-full lg:basis-3/4 space-y-4 relative">
                        {/* category and time */}
                        <div className="block lg:flex justify-between items-center">
                            <div className="flex items-center space-x-1">
                                <Link>{news?.category?.parentName}</Link>
                                <IoIosArrowForward />
                                <Link>{news?.category?.name}</Link>
                            </div>
                            <div className="">
                                {dayjs(news?.createAt, "DD-MM-YYYY HH:mm:ss").format("dddd, DD/MM/YYYY HH:mm") === "Invalid Date"
                                    ? news?.createAt
                                    : dayjs(news?.createAt, "DD-MM-YYYY HH:mm:ss").format("dddd, DD/MM/YYYY HH:mm")}
                            </div>
                        </div>
                        {/* title */}
                        <div>
                            <Typography.Title className="hover:text-blue-400 text-black" level={1}>
                                {news?.name}
                            </Typography.Title>
                        </div>
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: news?.content }}></div>
                        </div>
                        {/* share */}
                        <div className="hidden lg:block">
                            <Share className="absolute top-96 -left-14" />
                        </div>
                    </div>
                    <div className="hidden lg:block basis-1/4 ">
                        <img src={banner} alt="" />
                    </div>
                </div>
            </div>
            {/* comment */}
            <div className="bg-white">
                <div className="w-[90%] lg:w-[70%] m-auto">
                    <div className="flex flex-row space-x-4 pt-4">
                        <div className="w-full lg:w-3/4 space-y-4 border-r-[1px] pr-4">{news && <Comment newsId={news?.id}></Comment>}</div>
                        <div className="hidden lg:block w-1/4"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
NewsDetailUser.propTypes = {}
export default NewsDetailUser
