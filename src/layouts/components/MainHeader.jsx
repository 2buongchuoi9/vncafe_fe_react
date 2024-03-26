import { Dropdown } from "antd"
import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { MdHome } from "react-icons/md"
import { FiMenu } from "react-icons/fi"
import { IoIosArrowRoundUp } from "react-icons/io"
import { LoadingContext } from "~/app/provider/LoadingProvider"
import { cateSelect } from "~/app/slice/Category.slice"
import classNames from "classnames"

const cl = classNames.bind()

const MainHeader = () => {
    const [isHovered, setIsHovered] = useState(false)
    const [fex, setFex] = useState(false)

    const cates = useSelector(cateSelect.category)
    const isLoading = useSelector(cateSelect.isLoading)
    // const dispatch = useDispatch()

    const { setIsLoading } = useContext(LoadingContext)
    setIsLoading(isLoading)

    useEffect(() => {
        const scroll = () => {
            setFex(window.scrollY > 20 ? true : false)
        }
        window.addEventListener("scroll", scroll)
        return () => {
            window.removeEventListener("scroll", scroll)
        }
    }, [])

    return (
        <div>
            <div className={cl("transition duration-150 ease-in-out", { "fixed w-[100%] top-0 left-0 z-50 bg-white drop-shadow-md": fex })}>
                <div className="w-[92%] mx-auto">
                    <ul className="flex items-center justify-between text-sm ">
                        <li
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="p-0.5 rounded-3xl bg-gray-300 hover:bg-red-600"
                        >
                            <Link to={"/"}>
                                <MdHome size={22} color={isHovered ? "white" : "gray"} />
                            </Link>
                        </li>
                        <li className="transition duration-150 ease-in-out">
                            <a className={fex ? "block" : "hidden"} href="">
                                akjhsdkasd
                            </a>
                        </li>
                        {cates &&
                            cates.map((cate) => {
                                const items = cate.children.map((v) => ({ ...v, key: v.id, label: <a>{v.name}</a> }))
                                return (
                                    <Dropdown key={cate.id} menu={{ items }}>
                                        <li className="py-2 hover:text-blue-600 hover:cursor-pointer ">
                                            <Link>{cate.name}</Link>
                                        </li>
                                    </Dropdown>
                                )
                            })}
                        <li className="py-2 hover:cursor-pointer">
                            <FiMenu size={20} />
                        </li>
                    </ul>
                </div>
                <div className="w-full h-[1px] bg-gray-300 "></div>
            </div>
            <div
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="fixed bottom-20 right-20 w-[40px] h-[40px] flex justify-center items-center border-2 cursor-pointer"
            >
                <IoIosArrowRoundUp size={28} />
            </div>
        </div>
    )
}
export default MainHeader
