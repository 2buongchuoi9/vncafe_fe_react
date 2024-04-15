import Home from "~/features/home/Home"
import Dashboard from "~/features/admin/Dashboard"
import AllNewsAdmin from "~/features/admin/news/AllNewsAdmin"
import NewsDetail from "~/features/admin/news/NewsDetail"
import LoginRedirect from "~/features/redirect/LoginRedirect"
import NewsDetailUser from "~/features/news/NewsDetailUser"
import MyCV from "~/features/cv/MyCV"
const route = (path, component, layout) => ({ path, component, layout })

const publicRouters = [route("/", Home), route("/login-redirect", LoginRedirect), route("/news/:id", NewsDetailUser), route("/cv", MyCV)]
const privateRouters = [
    route("/", Dashboard),
    route("/news", AllNewsAdmin),
    route("/news/:id", () => <NewsDetail />),
    route("/news/add", () => <NewsDetail isAdd={true} />),
]

export { publicRouters, privateRouters }
