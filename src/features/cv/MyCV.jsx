import { Avatar } from "antd"
import avt from "~/assets/avt.jpg"

const MyCV = () => {
    return (
        <div className="w-[75%] mx-auto">
            <div className="w-[100%] shadow-lg grid grid-cols-2">
                <div className="flex justify-end">
                    <img className="w-40 h-40 overflow-hidden" src={avt} alt="" />
                </div>
                <div>
                    <p> Nguyễn Quốc Dũng</p>
                    <span>InternShip</span>
                </div>
            </div>
        </div>
    )
}

export default MyCV
