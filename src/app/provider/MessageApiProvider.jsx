import { message } from "antd"
import propTypes from "prop-types"
import { createContext } from "react"

export const MessageApiContext = createContext()

const MessageApiProvider = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage()

    return (
        <MessageApiContext.Provider
            value={{
                success: (content) => messageApi.open({ type: "success", content }),
                error: (content) => messageApi.open({ type: "error", content }),
                warning: (content) => messageApi.open({ type: "warning", content }),
            }}
        >
            {contextHolder}
            {children}
        </MessageApiContext.Provider>
    )
}
MessageApiProvider.propTypes = { children: propTypes.node }
export default MessageApiProvider
