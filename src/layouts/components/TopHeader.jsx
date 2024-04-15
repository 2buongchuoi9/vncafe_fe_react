import { Avatar, Dropdown, Input } from "antd"
import dayjs from "dayjs"
import "dayjs/locale/vi"
// import propTypes from "prop-types"
import { PiBellRingingLight } from "react-icons/pi"
import { BiExit } from "react-icons/bi"
import { IoIosSearch } from "react-icons/io"
import { FaRegUser } from "react-icons/fa"
import { IoMdArrowDropdown } from "react-icons/io"
import logo from "~/assets/logo.png"
import useDebounce from "~/hooks/useDebounce"
import { useEffect, useState } from "react"
import AuthModal from "~/components/auth/AuthModal"
import { useDispatch, useSelector } from "react-redux"
import { authAction, authSelect } from "~/app/slice/Auth.slice"
import { Link } from "react-router-dom"
import { FiMenu } from "react-icons/fi"
import { cateSelect } from "~/app/slice/Category.slice"

dayjs.locale("vi")

const TopHeader = () => {
    const [isOpenModalAuth, setIsOpenModalAuth] = useState(false)
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search, 500)
    const cates = useSelector(cateSelect.category)

    const dispatch = useDispatch()

    const user = useSelector(authSelect.user)

    useEffect(() => {
        const textSearch = debouncedSearch.trim()
        if (textSearch) {
            console.log(textSearch)
        }
    }, [debouncedSearch])

    const items = [
        { key: 1, label: <Link>Thông tin chung</Link> },
        { key: 2, label: <Link>Ý kiến của bạn</Link> },
        { key: 3, label: <Link>Tin đã lưu</Link> },
        { type: "divider" },
        { key: 4, label: <Link>Tin đã xem</Link> },
        {
            key: 5,
            label: (
                <div onClick={() => dispatch(authAction.logout())} className="flex items-center space-x-1">
                    <Link>Thoát</Link>
                    <BiExit color="gray" />
                </div>
            ),
        },
    ]

    const menu = cates && cates.map((cate) => ({ key: cate.id, label: <Link to={"/"}>{cate.name}</Link> }))

    return (
        <div className="flex items-center justify-between w-[90%] lg:w-[75%] mx-auto space-y-1 text-gray-600">
            <div className="flex justify-center items-center space-x-2">
                <div className="lg:hidden">
                    <Dropdown menu={{ items: menu }} trigger={["click"]}>
                        <FiMenu size={20} />
                    </Dropdown>
                </div>
                <div className="flex items-center space-x-4 divide-x-2 divide-solid divide-gray-300">
                    <Link className="" to={"/"}>
                        <img src={logo} alt="logo" className="w-20 h-10" />
                    </Link>

                    <div className="hidden lg:block pl-4">{dayjs().format("dddd, DD/MM/YYYY")}</div>
                </div>
            </div>
            <div className="flex items-center divide-x-2 divide-solid divide-gray-300 space-x-4">
                <div className="pl-4 hidden lg:block">
                    <p>Mới nhất</p>
                </div>
                <div className="hidden group md:flex pl-4">
                    <Input
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-full"
                        placeholder="Bài viết, tác giả, chủ đề"
                        prefix={<IoIosSearch />}
                    />
                </div>

                <div className="pl-4 flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        {!user.id ? (
                            <div onClick={() => setIsOpenModalAuth(true)} className="flex items-center">
                                <FaRegUser />
                                <div className="hidden lg:block hover:cursor-pointer hover:text-blue-600">Đăng nhập</div>
                            </div>
                        ) : (
                            <div className="">
                                <Dropdown menu={{ items }} trigger={["click"]} className="hover:cursor-pointer">
                                    <div className="flex items-center hover:text-blue-500 space-x-1">
                                        <Avatar src={user.image}></Avatar>
                                        <div className="hidden lg:flex lg:items-center">
                                            <div>{user.name}</div>
                                            <IoMdArrowDropdown size={12} color="gray" />
                                        </div>
                                    </div>
                                </Dropdown>
                            </div>
                        )}
                    </div>
                    <PiBellRingingLight size={20} />
                </div>
            </div>
            <AuthModal isOpen={isOpenModalAuth} onCancel={() => setIsOpenModalAuth(false)}></AuthModal>
        </div>
    )
}
export default TopHeader
