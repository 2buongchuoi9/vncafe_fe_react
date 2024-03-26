import propTypes from "prop-types"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "~/api/api"
import CartNews from "./CartNews"
import { shuffleArray } from "~/utils"
const BannerCategory = ({ categoryParent }) => {
    const [newsList, setNewsList] = useState([])
    const [query, setQuery] = useState({
        page: 0,
        size: 5,
        sort: "createdAt,desc",
        isPublish: true,
        categoryId: categoryParent.id,
    })

    console.log("newsList", newsList)
    useEffect(() => {
        const fetch = async () => {
            const a = await api.get("/news", { params: query })
            console.log("response", a)

            setNewsList(shuffleArray(a.data.data.content))
        }
        fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...Object.keys(query).map((key) => query[key])])

    return (
        <div className="space-y-4 border-b-[1px] pb-4">
            {/* list category */}
            <ul className="flex space-x-4 items-center ">
                <li className="border-b-[1px] border-red-500 text-black text-lg font-medium hover:text-blue-400 hover:border-blue-400">
                    <Link>{categoryParent.name}</Link>
                </li>
                {categoryParent?.children.map((category, index) => (
                    <li key={index} className="text-sm hover:text-blue-400">
                        <Link>{category.name}</Link>
                    </li>
                ))}
            </ul>

            {/* content news in category */}
            <div className="">
                {newsList && (
                    <div className="space-y-4">
                        {newsList.length > 1 && (
                            <div className="flex flex-row space-x-4 border-b-[1px] pb-4">
                                <div className="basis-2/3 border-r-[1px] pr-4">
                                    <CartNews news={newsList[0]} type="horizontal" />
                                </div>
                                <div className="basis-1/3">
                                    <CartNews news={newsList[1]} type="horizontal" isBanner={false} />
                                </div>
                            </div>
                        )}
                        <div>
                            {newsList?.length > 2 && (
                                <ul className="flex space-x-4">
                                    {newsList &&
                                        newsList.slice(2).map((v, index) => (
                                            <ol key={index} className="relative">
                                                <div className="font-medium before:bg-slate-600 before:rounded-3xl before:absolute before:w-2 before:h-2 before:top-2 before:left-0 ml-4">
                                                    <Link>{v?.name}</Link>
                                                </div>
                                            </ol>
                                        ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
BannerCategory.propTypes = { categoryParent: propTypes.object.isRequired }
export default BannerCategory
