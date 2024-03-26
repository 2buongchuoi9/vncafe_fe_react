import { FcGoogle } from "react-icons/fc"
import { FaFacebookF } from "react-icons/fa"
import { VscGithub } from "react-icons/vsc"
import { Button } from "antd"
import api from "~/api/api"
const SocialAuth = () => {
    const a = `${window.location.origin}/login-redirect`
    console.log("aádhbasjhd", a)
    const ggLink = `${api.getUri()}/v1/oauth2/authorization/google?redirect_url=${a}`
    const fbLink = `${api.getUri()}/v1/oauth2/authorization/facebook?redirect_url=${a}`
    return (
        <>
            <div className="mb-10 flex justify-center text-base">Đăng nhập với </div>
            <div className="space-y-5">
                <Button
                    size="large"
                    className="flex justify-start items-center space-x-9 border-blue-900 text-blue-900"
                    block
                    icon={<FcGoogle size={20} />}
                    onClick={() => (window.location.href = ggLink)}
                >
                    Google
                </Button>
                <Button
                    size="large"
                    className="flex justify-start items-center space-x-9 border-blue-400 text-black-400"
                    block
                    icon={<FaFacebookF color="blue" size={20} />}
                    // onClick={() => (window.location.href = fbLink)}
                    onClick={() => console.log(ggLink)}
                >
                    Facebook
                </Button>
                <Button
                    size="large"
                    className="flex justify-start items-center space-x-9 border-blue-900 text-blue-900"
                    block
                    icon={<VscGithub color="black" size={20} />}
                >
                    Github
                </Button>
            </div>
        </>
    )
}
export default SocialAuth
