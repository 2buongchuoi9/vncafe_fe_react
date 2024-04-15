import { Button, Typography } from "antd"
import React, { Suspense, useContext, useEffect, useState } from "react"
import api from "~/api/api"
import { LoadingContext } from "~/app/provider/LoadingProvider"
import CartNews from "~/components/itemsCartNews/CartNews"
import banner from "~/assets/bn1.png"
import { useSelector } from "react-redux"
import { cateSelect } from "~/app/slice/Category.slice"
import { shuffleArray } from "~/utils"
import { Link } from "react-router-dom"
import dayjs from "dayjs"

dayjs.locale("vi")

const BannerCategory = React.lazy(() => import("~/components/itemsCartNews/BannerCategory"))

const Home = () => {
    // const { setIsLoading } = useContext(LoadingContext)
    const category = useSelector(cateSelect.category)

    const [newsList, setNewsList] = useState()
    useEffect(() => {
        const fetch = async () => {
            const a = await api.get("/news", { params: { page: 0, size: 30, sort: "createdAt,desc" } })
            setNewsList(shuffleArray(a.data.data.content))
        }
        fetch()
    }, [])

    return (
        <div>
            {/* <video src="https://cdn.24h.com.vn/upload/2-2024/videoclip/2024-04-01/cd_nivea_nha-1711905847-arsenal_mc_h1.mp4" autoPlay={true}></video> */}
            <div className="w-[90%] lg:w-[75%] mx-auto">
                <div className="block lg:hidden">{dayjs().format("dddd, DD/MM/YYYY")}</div>
                <div className="space-y-4">
                    {/* top home */}
                    <div className="flex flex-row space-x-4">
                        <div className="w-full flex flex-col lg:w-3/4 space-y-4">
                            <div className="border-b-[1px] sm:border-b-0 pb-4">{newsList && <CartNews news={newsList[0]} type="primary" />}</div>
                            <div className="block md:flex md:flex-row md:space-x-4 md:border-b-[1px] md:pb-4 w-full">
                                {newsList &&
                                    newsList.slice(1, 4).map((news, index) => (
                                        <div key={index} className="sm:w-full sm:divide-y-2 sm:gap-y-2 md:w-1/3 w-full">
                                            <CartNews className="hidden md:block" key={index} news={news} type="subPrimary" />
                                            <CartNews className="md:hidden block sm:pb-2" key={index} news={news} type="vertical" />
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="hidden lg:block lg:w-1/4">
                            <img src={banner} className="w-full h-full object-cover" alt="" />
                        </div>
                    </div>

                    {/* content home */}
                    <div className="block md:flex md:flex-row md:space-x-4">
                        {/* content left home */}
                        <div className="sm:w-full sm:flex sm:flex-col sm:gap-y-2 sm:divide-y-2 sm:pt-2 w-full md:w-1/3 md:flex-wrap space-y-3">
                            {newsList &&
                                newsList.slice(4).map((news, index) => (
                                    <div key={index} className="md:border-b-[1px] w-full clear-left">
                                        <CartNews key={index} news={news} type="vertical" />
                                    </div>
                                ))}
                        </div>

                        {/* content right home */}
                        <div className="sm:w-full md:w-2/3 sm:border-none sm:pl-0 md:border-l-[1px] md:pl-4">
                            {category?.map((cate, index) => (
                                <div key={index} className="space-y-4">
                                    <Suspense fallback={<div>loading...</div>}>
                                        <BannerCategory categoryParent={cate} />
                                    </Suspense>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[40px]"></div>
        </div>
    )
}
export default Home
