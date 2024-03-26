import { Route, Routes } from "react-router-dom"
import { privateRouters, publicRouters } from "~/router"
import NotFound from "~/components/NotFound"
import DefaultLayout from "~/layouts/DefaultLayout"
import LoadingProvider from "~/app/provider/LoadingProvider"
import Loading from "./components/Loading"
import MessageApiProvider from "./app/provider/MessageApiProvider"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { authAction, authSelect } from "./app/slice/Auth.slice"
import { cateAction } from "./app/slice/Category.slice"
import AdminLayout from "./layouts/AdminLayout"

function App() {
    const dispatch = useDispatch()
    const user = useSelector(authSelect.user)

    useEffect(() => {
        const fetch = async () => {
            await dispatch(authAction.fetchInfo())
            await dispatch(cateAction.fetchCategory())
        }
        fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <LoadingProvider>
                <MessageApiProvider>
                    <Routes>
                        {publicRouters.map((route, index) => {
                            const Page = route.component
                            const Layout = route?.layout ? route.layout : DefaultLayout
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            )
                        })}

                        {privateRouters.map((route, index) => {
                            const Page = route.component
                            const Layout = route?.layout ? route.layout : AdminLayout
                            return (
                                <Route
                                    key={index}
                                    path={`/admin${route.path}`}
                                    element={
                                        user.roles.includes("ADMIN") ? (
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        ) : (
                                            <DefaultLayout>
                                                <div>ban khong co quyen</div>
                                            </DefaultLayout>
                                        )
                                    }
                                />
                            )
                        })}

                        {/* <Route path="/admin/*" element={<Admin />} /> */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </MessageApiProvider>
                <Loading />
            </LoadingProvider>
        </>
    )
}

export default App
