import { FcGoogle } from "react-icons/fc"
import { FaFacebookF } from "react-icons/fa"
import { VscGithub } from "react-icons/vsc"
import { Button, Divider } from "antd"
import api from "~/api/api"
const SocialAuth = () => {
    const a = `${window.location.origin}/login-redirect`
    console.log("aádhbasjhd", a)
    const ggLink = `${api.getUri()}/v1/oauth2/authorization/google?redirect_url=${a}`
    const fbLink = `${api.getUri()}/v1/oauth2/authorization/facebook?redirect_url=${a}`
    return (
        <>
            <div className="hidden md:flex mb-10 justify-center text-base">Đăng nhập với </div>
            <Divider className="block md:hidden">Hoặc</Divider>
            <div className="flex justify-between items-center md:block md:space-y-5">
                <Button
                    size="large"
                    className="hidden md:flex justify-start items-center space-x-9 border-blue-900 text-blue-900"
                    block
                    icon={<FcGoogle size={20} />}
                    onClick={() => (window.location.href = ggLink)}
                >
                    Google
                </Button>
                <Button
                    size="large"
                    className="hidden md:flex justify-start items-center space-x-9 border-blue-400 text-black-400"
                    block
                    icon={<FaFacebookF color="blue" size={20} />}
                    // onClick={() => (window.location.href = fbLink)}
                    onClick={() => console.log(ggLink)}
                >
                    Facebook
                </Button>
                <Button
                    size="large"
                    className="hidden md:flex justify-start items-center space-x-9 border-blue-900 text-blue-900"
                    block
                    icon={<VscGithub color="black" size={20} />}
                >
                    Github
                </Button>

                <Button
                    size="large"
                    style={{ width: "30%" }}
                    className="md:hidden px-5 w-[500px] border-blue-900 text-blue-900"
                    icon={<FcGoogle size={20} />}
                    onClick={() => (window.location.href = ggLink)}
                ></Button>
                <Button
                    size="large"
                    style={{ width: "30%" }}
                    className="md:hidden border-blue-400 text-black-400"
                    icon={<FaFacebookF color="blue" size={20} />}
                    // onClick={() => (window.location.href = fbLink)}
                    onClick={() => console.log(ggLink)}
                ></Button>
                <Button
                    size="large"
                    style={{ width: "30%" }}
                    className="md:hidden border-blue-900 text-blue-900"
                    icon={<VscGithub color="black" size={20} />}
                ></Button>
            </div>
        </>
    )
}
export default SocialAuth
