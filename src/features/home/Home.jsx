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

const BannerCategory = React.lazy(() => import("~/components/itemsCartNews/BannerCategory"))

const Home = () => {
    const { setIsLoading } = useContext(LoadingContext)
    const category = useSelector(cateSelect.category)

    const [newsList, setNewsList] = useState()
    useEffect(() => {
        const fetch = async () => {
            const a = await api.get("/news", { params: { page: 0, size: 20, sort: "createdAt,desc" } })
            setNewsList(shuffleArray(a.data.data.content))
        }
        fetch()
    }, [])

    return (
        <div>
            <div className=" w-[75%] mx-auto">
                <div className="space-y-4">
                    {/* top home */}
                    <div className="flex flex-row space-x-4">
                        <div className="w-3/4 space-y-4">
                            <div className="border-b-[1px] pb-4">{newsList && <CartNews news={newsList[0]} type="primary" />}</div>
                            <div className="flex flex-row space-x-4 border-b-[1px] pb-4 w-full">
                                {newsList &&
                                    newsList.slice(1, 4).map((news, index) => (
                                        <div key={index} className="h-full w-full ">
                                            <CartNews key={index} news={news} type="subPrimary" />
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="w-1/4">
                            <img src={banner} className="h-full object-cover" alt="" />
                        </div>
                    </div>

                    {/* content home */}
                    <div className="flex flex-row space-x-4">
                        {/* content left home */}
                        <div className="basis-1/3 flex-wrap space-y-3">
                            {newsList && newsList.slice(4).map((news, index) => <CartNews key={index} news={news} type="vertical" />)}
                        </div>

                        {/* content right home */}
                        <div className="basis-2/3 border-l-[1px] pl-4">
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
