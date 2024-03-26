import propTypes from "prop-types"
import TopHeader from "./components/TopHeader"
import MainHeader from "./components/MainHeader"
const DefaultLayout = ({ children }) => {
    return (
        <>
            <header>
                <TopHeader />
                <MainHeader />
            </header>
            <main className="mt-6 h-[1000px]">{children}</main>
            <footer></footer>
        </>
    )
}
DefaultLayout.propTypes = { children: propTypes.element }
export default DefaultLayout
