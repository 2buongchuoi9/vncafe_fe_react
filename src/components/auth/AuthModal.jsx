import { Modal, Tabs } from "antd"
import classNames from "classnames"
import propTypes from "prop-types"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { Link } from "react-router-dom"
import api from "~/api/api"
import { useDispatch } from "react-redux"
import { authAction } from "~/app/slice/Auth.slice"
import { useContext, useEffect, useState } from "react"
import { MessageApiContext } from "~/app/provider/MessageApiProvider"

const cl = classNames.bind()

const AuthModal = ({ isOpen = false, onCancel, onRegister, onLogin }) => {
    const dispatch = useDispatch()
    const { success, error: err } = useContext(MessageApiContext)
    const [ww, setWw] = useState(window.screen.width < 1024 ? "100%" : "50%")

    useEffect(() => {
        const handleResize = () => {
            setWw(window.screen.width < 1024 ? "100%" : "50%")
        }

        window.addEventListener("resize", handleResize)

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const handleLogin = async (values) => {
        try {
            // setSubmitting(true)
            const a = await api.post("/auth/login", values, {})

            dispatch(authAction.loginSuccess(a.data.data))

            success("đăng nhập thành công")
            onCancel()
        } catch (error) {
            if (error.response.data.code === 404) err("thông tin đăng nhập không chính xác")
            else err(error.response.data.message)
            console.log(error.response)
        }
        // setSubmitting(false)
    }

    return (
        <>
            <Modal
                zIndex={10}
                width={ww}
                open={isOpen}
                onCancel={onCancel}
                footer={
                    <div className="w-[60%] mx-auto text-center">
                        Bạn tạo tài khoản là đồng ý với <Link className="text-blue-400">quy định</Link>,{" "}
                        <Link className="text-blue-400">điều khoản</Link> sử dụng và <Link className="text-blue-400">chính sách bảo mật</Link> của
                        VnExpress & được bảo vệ bởi reCAPTCHA
                    </div>
                }
            >
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    size="large"
                    // style={{ width: "50%" }}
                    tabPosition="top"
                    items={[
                        {
                            key: 1,
                            label: <div className={cl("text-lg  flex justify-center ")}>Đăng nhập</div>,
                            children: <LoginForm onSubmit={handleLogin} />,
                        },
                        {
                            key: 2,
                            label: <div className="text-lg  flex justify-center">Đăng ký tài khoản</div>,
                            children: <RegisterForm />,
                        },
                    ]}
                />
            </Modal>
        </>
    )
}
AuthModal.propTypes = { isOpen: propTypes.bool, onCancel: propTypes.func, onRegister: propTypes.func, onLogin: propTypes.func }
export default AuthModal
