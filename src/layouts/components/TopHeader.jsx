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

dayjs.locale("vi")

const TopHeader = () => {
    const [isOpenModalAuth, setIsOpenModalAuth] = useState(false)
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search, 500)

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

    return (
        <div className="space-y-1 text-gray-600">
            <div className="w-full h-[1px] bg-gray-300"></div>

            <div className="flex justify-between w-[80%] mx-auto">
                <div className="flex items-center space-x-4  divide-x-2 divide-solid divide-gray-300">
                    <div className="h-10 w-20">
                        <Link to={"/"}>
                            <img src={logo} alt="logo" className="w-full h-full" />
                        </Link>
                    </div>
                    <div className="pl-4">{dayjs().format("dddd, DD/MM/YYYY")}</div>
                </div>
                <div className="flex items-center divide-x-2 divide-solid divide-gray-300 space-x-4">
                    <div className="pl-4">
                        <p>Mới nhất</p>
                    </div>
                    <div className="pl-4">
                        <div className="group flex">
                            <Input
                                onChange={(e) => setSearch(e.target.value)}
                                className="rounded-full"
                                placeholder="Bài viết, tác giả, chủ đề"
                                prefix={<IoIosSearch />}
                            />
                        </div>
                    </div>
                    <div className="pl-4 flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            {!user.id ? (
                                <>
                                    <FaRegUser />
                                    <div onClick={() => setIsOpenModalAuth(true)} className="hover:cursor-pointer hover:text-blue-600">
                                        Đăng nhập
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center space-x-1">
                                    <Avatar src={user.image}></Avatar>
                                    <div className="flex items-center hover:text-blue-500">
                                        <Dropdown menu={{ items }} trigger={["click"]} className="hover:cursor-pointer">
                                            <div>{user.name}</div>
                                        </Dropdown>
                                        <IoMdArrowDropdown size={12} color="gray" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <PiBellRingingLight size={20} />
                    </div>
                </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300"></div>
            <AuthModal isOpen={isOpenModalAuth} onCancel={() => setIsOpenModalAuth(false)}></AuthModal>
        </div>
    )
}
export default TopHeader
