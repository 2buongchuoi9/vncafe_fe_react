import { Button, Input } from "antd"
import propTypes from "prop-types"
import SocialAuth from "./SocialAuth"
const RegisterForm = () => {
    return (
        <div className="w-[100%] flex justify-center items-center divide-x divide-solid divide-gray-300 space-x-5 mb-5">
            <div className="w-[60%]">
                <div className="mb-10 flex justify-center text-base">Đăng ký với email</div>
                <div className="space-y-5">
                    <div className="w-full flex">
                        <Input size="large" placeholder="Email"></Input>
                        <Input size="large" placeholder="Name"></Input>
                    </div>
                    <Input.Password size="large" placeholder="Password"></Input.Password>
                    <Button size="large" type="primary" block className="text-white-400  bg-blue-400">
                        Đăng ký
                    </Button>
                </div>
            </div>
            <div className="pl-5 w-[40%]">
                <SocialAuth />
            </div>
        </div>
    )
}
RegisterForm.propTypes = {}
export default RegisterForm
