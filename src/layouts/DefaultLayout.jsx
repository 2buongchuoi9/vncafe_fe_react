import propTypes from "prop-types"
import TopHeader from "./components/TopHeader"
import MainHeader from "./components/MainHeader"
import { IoIosArrowRoundUp } from "react-icons/io"

// const width = window.screen.width

const DefaultLayout = ({ children }) => {
    return (
        <>
            <header>
                <div className={`sticky z-50 top-0 right-0 left-0 lg:relative bg-white`}>
                    <TopHeader />
                </div>
                <div className="">
                    <MainHeader />
                </div>
            </header>
            <main className="mt-[15px] lg:mt-6 h-[1000px]">{children}</main>
            <footer></footer>

            <div
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="fixed bottom-20  right-20 w-[40px] h-[40px] flex justify-center items-center border-2 cursor-pointer bg-white"
            >
                <IoIosArrowRoundUp size={28} />
            </div>
        </>
    )
}
DefaultLayout.propTypes = { children: propTypes.element }
export default DefaultLayout
