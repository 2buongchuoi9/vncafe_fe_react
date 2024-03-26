import { createContext, useState } from "react"
import propTypes from "prop-types"

export const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)

    return <LoadingContext.Provider value={{ isLoading, setIsLoading }}>{children}</LoadingContext.Provider>
}
LoadingProvider.propTypes = { children: propTypes.node }
export default LoadingProvider
